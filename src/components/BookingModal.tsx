import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/services';
import { BookingConfirmation, BookingData, ClientUser, ServiceItem } from '../types';
import {
  createGoogleClientUser,
  createGuestClientUser,
  getStoredClientUser,
  removeClientUser,
  saveClientUser,
} from '../utils/auth';
import { signInWithGoogleAccount } from '../utils/googleAuth';
import { BUSINESS_INFO } from '../data/content';
import {
  generateDailyTimeSlots,
  formatDateToSpanish,
  getAvailableDatesList,
  calculateEndTime,
} from '../utils/dateUtils';
import { getBookingConfirmationWhatsAppUrl } from '../utils/whatsapp';
import { downloadIcsFile } from '../utils/calendar';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Phone,
  User,
  MessageCircle,
  Download,
  AlertCircle,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const LOCAL_STORAGE_BOOKINGS_KEY = 'milimakeupart_bookings_list';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  // Steps: 1: Service & Modality, 2: Date & Time, 3: Client Details, 4: Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    SERVICES_DATA.find((s) => s.id === initialServiceId) || SERVICES_DATA[0]
  );
  const [modality, setModality] = useState<'estudio' | 'domicilio'>('estudio');
  const [address, setAddress] = useState('');

  // Date and Time
  const datesList = getAvailableDatesList(30);
  const [selectedDate, setSelectedDate] = useState<string>(datesList[0].dateStr);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  const [authChoice, setAuthChoice] = useState<'google' | 'guest'>('guest');
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sincronizar servicio inicial si cambia la prop
  useEffect(() => {
    if (initialServiceId) {
      const match = SERVICES_DATA.find((s) => s.id === initialServiceId);
      if (match) setSelectedService(match);
    }
  }, [initialServiceId]);

  // Cargar usuario guardado previamente en el navegador
  useEffect(() => {
    const user = getStoredClientUser();
    if (!user) return;
    setClientUser(user);
    setAuthChoice(user.provider);
    if (user.name) setClientName(user.name);
    if (user.phone) setClientPhone(user.phone);
    if (user.email) setClientEmail(user.email);
  }, []);

  // Calcular slots disponibles para la fecha y duración elegida
  useEffect(() => {
    if (!isOpen) return;

    const fetchAvailability = async () => {
      setIsLoadingSlots(true);
      const allSlots = generateDailyTimeSlots(selectedService.durationMinutes);

      try {
        const res = await fetch(
          `/api/calendar/availability?date=${selectedDate}&duration=${selectedService.durationMinutes}`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.availableSlots)) {
            setAvailableSlots(data.availableSlots);
            // Si el slot actual ya no está disponible, seleccionar el primero
            if (!data.availableSlots.includes(selectedTime)) {
              setSelectedTime(data.availableSlots[0] || '');
            }
            setIsLoadingSlots(false);
            return;
          }
        }
      } catch (err) {
        // Fallback a simulación local
      }

      // Simulación local inteligente: excluir horarios ya agendados en este navegador
      try {
        const localBookingsRaw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
        const localBookings: BookingConfirmation[] = localBookingsRaw ? JSON.parse(localBookingsRaw) : [];
        const bookedForDate = localBookings
          .filter((b) => b.date === selectedDate)
          .map((b) => b.time);

        const freeSlots = allSlots.filter((slot) => !bookedForDate.includes(slot));
        setAvailableSlots(freeSlots);
        if (!freeSlots.includes(selectedTime)) {
          setSelectedTime(freeSlots[0] || '');
        }
      } catch {
        setAvailableSlots(allSlots);
        setSelectedTime(allSlots[0] || '');
      }

      setIsLoadingSlots(false);
    };

    fetchAvailability();
  }, [selectedDate, selectedService.durationMinutes, isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSigningIn(true);
      setErrorMessage('');
      const profile = await signInWithGoogleAccount();
      const user = createGoogleClientUser(profile);
      if (clientPhone) user.phone = clientPhone;
      saveClientUser(user);
      setClientUser(user);
      setAuthChoice('google');
      setClientName(user.name);
      setClientEmail(user.email);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo iniciar sesión con Google.';
      console.error('Google sign-in error:', err);
      setErrorMessage(message);
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleChooseGuest = () => {
    setAuthChoice('guest');
    setErrorMessage('');
    const guest = createGuestClientUser(clientName || 'Invitada', clientEmail, clientPhone);
    setClientUser(guest);
  };

  const handleLogout = () => {
    removeClientUser();
    setClientUser(null);
    setAuthChoice('guest');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setErrorMessage('Por favor completa tu nombre y número de teléfono.');
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Por favor selecciona un horario disponible.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const savedUser: ClientUser = {
      id: clientUser?.id || `${authChoice}-${Date.now()}`,
      name: clientName.trim(),
      email: clientEmail.trim(),
      avatar: authChoice === 'google' ? clientUser?.avatar : undefined,
      phone: clientPhone.trim(),
      provider: authChoice,
    };
    saveClientUser(savedUser);
    setClientUser(savedUser);

    // Código de reserva amigable
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `MILI-${randomCode}`;

    const newBooking: BookingConfirmation = {
      bookingCode,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      durationMinutes: selectedService.durationMinutes,
      modality,
      address: modality === 'domicilio' ? address : undefined,
      date: selectedDate,
      time: selectedTime,
      clientName,
      clientPhone,
      clientEmail,
      notes: clientNotes,
      createdAt: new Date().toISOString(),
      status: 'confirmado',
    };

    try {
      // Intentar enviar al backend Google Calendar
      await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });
    } catch {
      // Si la API remota aún no tiene credenciales, continúa sin bloquear
    }

    // Persistir localmente en la lista de reservas
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const list: BookingConfirmation[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.push(newBooking);
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(list));
    } catch {
      // Ignore
    }

    setConfirmedBooking(newBooking);
    setIsSubmitting(false);
    setStep(4);

    // Lanzar confeti festivo
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4A7C1', '#1A1A1A', '#FBF4F6', '#E7D5DB'],
      });
    } catch {
      // Ignorar si no está disponible
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E7D5DB] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FBF4F6] via-white to-[#FBF4F6] border-b border-[#E7D5DB] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#1A1A1A] text-white">
                <Sparkles className="w-4 h-4 text-[#F4A7C1]" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                Reserva de Turno Online
              </h2>
            </div>
            <p className="text-xs text-[#5C5558] mt-0.5">
              Milimakeupart · Milagros Arce · San Miguel de Tucumán
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#5C5558] hover:text-[#1A1A1A] hover:bg-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Pasos 1 a 3) */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 bg-white border-b border-[#E7D5DB]/60 flex items-center justify-between text-xs font-semibold text-[#5C5558]">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#1A1A1A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-[#1A1A1A] text-white' : 'bg-[#FBF4F6]'}`}>1</span>
              <span>Servicio</span>
            </div>
            <span className="text-[#E7D5DB]">──</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#1A1A1A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-[#1A1A1A] text-white' : 'bg-[#FBF4F6]'}`}>2</span>
              <span>Fecha y Hora</span>
            </div>
            <span className="text-[#E7D5DB]">──</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#1A1A1A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-[#1A1A1A] text-white' : 'bg-[#FBF4F6]'}`}>3</span>
              <span>Tus Datos</span>
            </div>
          </div>
        )}

        {/* Body Container con Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* PASO 1: Selección de Servicio y Modalidad */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  1. Elegí el Servicio que querés contratar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                  {SERVICES_DATA.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1A1A1A] bg-[#FBF4F6] shadow-sm'
                            : 'border-[#E7D5DB] bg-white hover:border-[#F4A7C1]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1A]">
                            {srv.name}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#5C5558]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F4A7C1]" />
                            {srv.durationMinutes} min
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-[#1A1A1A]/70">
                            {srv.categoryLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modalidad: Estudio o Domicilio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  2. Modalidad de atención:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setModality('estudio')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      modality === 'estudio'
                        ? 'border-[#1A1A1A] bg-[#FBF4F6]'
                        : 'border-[#E7D5DB] bg-white hover:border-[#F4A7C1]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white border border-[#E7D5DB] text-[#1A1A1A]">
                      <MapPin className="w-4 h-4 text-[#F4A7C1]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#1A1A1A]">En el Estudio</p>
                      <p className="text-[11px] text-[#5C5558]">General Paz 1060, Tucumán</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setModality('domicilio')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      modality === 'domicilio'
                        ? 'border-[#1A1A1A] bg-[#FBF4F6]'
                        : 'border-[#E7D5DB] bg-white hover:border-[#F4A7C1]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white border border-[#E7D5DB] text-[#1A1A1A]">
                      <Home className="w-4 h-4 text-[#F4A7C1]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#1A1A1A]">A Domicilio</p>
                      <p className="text-[11px] text-[#5C5558]">En tu casa u hotel</p>
                    </div>
                  </div>
                </div>

                {modality === 'domicilio' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Dirección o barrio en San Miguel de Tucumán..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7D5DB] text-xs sm:text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                )}
              </div>

              {/* Botón Siguiente */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-7 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continuar a Fecha y Hora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: Fecha y Horario */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Resumen del Servicio */}
              <div className="p-3.5 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5C5558] block">Servicio Seleccionado</span>
                  <span className="font-bold text-[#1A1A1A] text-sm">{selectedService.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#5C5558] block">Duración</span>
                  <span className="font-bold text-[#1A1A1A] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F4A7C1]" />
                    {selectedService.durationMinutes} minutos
                  </span>
                </div>
              </div>

              {/* Selector de Días (Próximos 30 días) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2.5">
                  Elegí el día:
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2.5">
                  {datesList.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`min-w-[70px] p-2.5 rounded-2xl border text-center transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md scale-105'
                            : 'bg-white text-[#1A1A1A] border-[#E7D5DB] hover:border-[#F4A7C1]'
                        }`}
                      >
                        <span className="text-[10px] block opacity-70 font-semibold">{d.weekday}</span>
                        <span className="text-sm font-bold block">{d.label.split(' ')[0]}</span>
                        <span className="text-[10px] block opacity-70 capitalize">{d.label.split(' ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#5C5558] mt-1 capitalize">
                  📅 {formatDateToSpanish(selectedDate)}
                </p>
              </div>

              {/* Selector de Horarios Libres */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Horarios Libres (09:00 a 22:00 hs):
                  </label>
                  <span className="text-[11px] text-[#5C5558]">
                    Último inicio posible: {selectedService.durationMinutes === 120 ? '20:00' : selectedService.durationMinutes === 90 ? '20:30' : '21:00'} hs
                  </span>
                </div>

                {isLoadingSlots ? (
                  <div className="py-8 text-center text-xs text-[#5C5558]">
                    <Clock className="w-5 h-5 mx-auto text-[#F4A7C1] animate-spin mb-2" />
                    Consultando disponibilidad en Google Calendar...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center">
                    No quedan franjas libres con duración de {selectedService.durationMinutes} minutos para esta fecha. Probá con otro día o consultanos por WhatsApp.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      const endSlotTime = calculateEndTime(slot, selectedService.durationMinutes);
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                              : 'bg-white text-[#1A1A1A] border-[#E7D5DB] hover:border-[#1A1A1A]'
                          }`}
                        >
                          <span>{slot} hs</span>
                          <span className="block text-[9px] font-normal opacity-70">
                            hasta {endSlotTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Botones Navegación */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>

                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(3)}
                  className="px-7 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] disabled:opacity-40 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continuar a Datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Datos de la Clienta (Google o Invitada) */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Resumen del Turno */}
              <div className="p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB] space-y-1.5 text-xs text-[#1A1A1A]">
                <div className="flex justify-between font-bold text-sm">
                  <span>{selectedService.name}</span>
                  <span className="text-[#5C5558]">{selectedService.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-2 text-[#5C5558]">
                  <Calendar className="w-3.5 h-3.5 text-[#F4A7C1]" />
                  <span className="capitalize">{formatDateToSpanish(selectedDate)} a las {selectedTime} hs</span>
                </div>
                <div className="flex items-center gap-2 text-[#5C5558]">
                  <MapPin className="w-3.5 h-3.5 text-[#F4A7C1]" />
                  <span>{modality === 'domicilio' ? `A Domicilio (${address || 'Tucumán'})` : 'En Estudio: General Paz 1060'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#F4A7C1]" />
                    Identificación de la clienta
                  </span>
                  {clientUser && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-[11px] text-[#5C5558] hover:text-[#1A1A1A] flex items-center gap-1 font-semibold"
                    >
                      <LogOut className="w-3 h-3" />
                      Cambiar / Salir
                    </button>
                  )}
                </div>

                {clientUser?.provider === 'google' ? (
                  <div className="bg-white p-3 rounded-xl border border-[#E7D5DB] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {clientUser.avatar ? (
                        <img
                          src={clientUser.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          G
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1A1A1A] truncate">{clientUser.name}</div>
                        <div className="text-[11px] text-[#5C5558] truncate">
                          {clientUser.email} · Cuenta Google conectada
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#E6F4EA] text-[#137333] font-bold px-2 py-0.5 rounded-full shrink-0">
                      Verificada
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isGoogleSigningIn}
                      className="p-3 rounded-xl bg-white border border-[#E7D5DB] hover:border-[#4285F4] flex items-center justify-center gap-2 text-xs font-bold text-[#1A1A1A] transition-all disabled:opacity-60 disabled:cursor-wait"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>{isGoogleSigningIn ? 'Conectando...' : 'Iniciar sesión con Google'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleChooseGuest}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        authChoice === 'guest'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#5C5558] border-[#E7D5DB] hover:bg-[#FBF4F6]'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Entrar como invitada</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Formulario de Datos */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Sofía Fernández"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7D5DB] text-xs sm:text-sm focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ej. 381 4123456"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7D5DB] text-xs sm:text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Ej. sofia@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7D5DB] text-xs sm:text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Nota o preferencia especial (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Contanos si tenés alergias, tipo de piel o el tono de tu vestido..."
                    className="w-full px-4 py-2 rounded-xl border border-[#E7D5DB] text-xs sm:text-sm focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Botones Navegación */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E7D5DB]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Horarios</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Registrando turno...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#F4A7C1]" />
                      <span>Confirmar Reserva</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* PASO 4: Confirmación Exitosa */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FBF4F6] border-2 border-[#F4A7C1] flex items-center justify-center mx-auto text-[#1A1A1A]">
                <CheckCircle2 className="w-8 h-8 text-[#1A1A1A]" />
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#5C5558]">
                  ¡Turno Registrado con Éxito!
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mt-1">
                  Te esperamos, {confirmedBooking.clientName} ✨
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5558] mt-1 max-w-md mx-auto">
                  Tu turno ha quedado agendado en el calendario. Guardá tu código de reserva:
                </p>
              </div>

              {/* Ficha Resumen */}
              <div className="bg-[#FBF4F6] rounded-2xl p-5 border border-[#E7D5DB] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#E7D5DB]">
                  <span className="text-[#5C5558] font-medium">Código de reserva:</span>
                  <span className="font-mono font-bold text-sm text-[#1A1A1A] bg-white px-2 py-0.5 rounded border border-[#E7D5DB]">
                    {confirmedBooking.bookingCode}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5C5558]">Servicio:</span>
                  <span className="font-semibold text-[#1A1A1A]">{confirmedBooking.serviceName} ({confirmedBooking.durationMinutes} min)</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5C5558]">Fecha y hora:</span>
                  <span className="font-semibold text-[#1A1A1A] capitalize">{formatDateToSpanish(confirmedBooking.date)} · {confirmedBooking.time} hs</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5C5558]">Modalidad:</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {confirmedBooking.modality === 'domicilio' ? `A Domicilio (${confirmedBooking.address || 'Tucumán'})` : 'En Estudio: Gral. Paz 1060'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5C5558]">Clienta:</span>
                  <span className="font-semibold text-[#1A1A1A]">{confirmedBooking.clientName} ({confirmedBooking.clientPhone})</span>
                </div>
              </div>

              {/* Acciones Finales: WhatsApp y Calendario */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getBookingConfirmationWhatsAppUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enviar resumen por WhatsApp a Mili</span>
                </a>

                <button
                  onClick={() => downloadIcsFile(confirmedBooking)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-[#E7D5DB] text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors"
                >
                  <Download className="w-4 h-4 text-[#F4A7C1]" />
                  <span>Añadir a mi Calendario (.ics)</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="text-xs text-[#5C5558] hover:text-[#1A1A1A] underline"
                >
                  Cerrar y volver a la web
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
