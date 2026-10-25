import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { SERVICES_DATA } from '../data/services';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Consulta general');
  const [modality, setModality] = useState<'estudio' | 'domicilio'>('estudio');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const fullText = `¡Hola Milagros! Te contacto desde la web de Milimakeupart:
👤 *Nombre:* ${name}
📱 *Teléfono:* ${phone || 'No especificado'}
💄 *Servicio de interés:* ${service}
🏠 *Modalidad preferida:* ${modality === 'domicilio' ? 'A Domicilio' : 'En Estudio (Gral. Paz 1060)'}
💬 *Consulta:* ${message || 'Quisiera coordinar disponibilidad y detalles.'}

¡Muchas gracias!`;

    const url = buildWhatsAppUrl(fullText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contacto"
      data-sector="SECTOR 11: Formulario de Contacto"
      className="py-20 lg:py-28 bg-white border-t border-[#E7D5DB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Hablemos Directo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Contactate con Milagros
            </h2>
            <p className="mt-3 text-base text-[#5C5558] leading-relaxed">
              ¿Tenés dudas sobre tu look, querés consultar por una fecha especial o cotizar a domicilio? Escribinos y te responderemos a la brevedad.
            </p>

            {/* Lista de Datos Directos */}
            <div className="mt-8 space-y-4 text-sm text-[#1A1A1A]">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB] hover:border-[#F4A7C1] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#5C5558] uppercase tracking-wider block">
                    WhatsApp Directo
                  </span>
                  <span className="font-bold group-hover:text-[#F4A7C1] transition-colors">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB]">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A1A1A] shadow-sm shrink-0">
                  <MapPin className="w-5 h-5 text-[#F4A7C1]" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#5C5558] uppercase tracking-wider block">
                    Ubicación del Estudio
                  </span>
                  <span className="font-bold">
                    {BUSINESS_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB]">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A1A1A] shadow-sm shrink-0">
                  <Clock className="w-5 h-5 text-[#F4A7C1]" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#5C5558] uppercase tracking-wider block">
                    Horarios de Atención
                  </span>
                  <span className="font-bold">
                    {BUSINESS_INFO.schedule}
                  </span>
                </div>
              </div>

              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB] hover:border-[#F4A7C1] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#F4A7C1] shadow-sm shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#5C5558] uppercase tracking-wider block">
                    Instagram Oficial
                  </span>
                  <span className="font-bold group-hover:text-[#F4A7C1] transition-colors">
                    {BUSINESS_INFO.instagramHandle}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario Rápido WhatsApp */}
          <div className="lg:col-span-7 bg-[#FBF4F6] rounded-3xl p-7 sm:p-9 border border-[#E7D5DB] shadow-sm">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">
              Envianos tu consulta directa
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5558] mb-6">
              Completá tus datos y al presionar enviar se abrirá WhatsApp con el mensaje listo para enviar.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofía Martínez"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7D5DB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Tu Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +54 381 4123456"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7D5DB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Servicio de Interés
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7D5DB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Consulta general">Consulta general</option>
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.durationMinutes} min)
                      </option>
                    ))}
                    <option value="Clase de automaquillaje">Clase de automaquillaje</option>
                    <option value="Peinado junto al maquillaje">Peinado junto al maquillaje</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Modalidad Deseada
                  </label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7D5DB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="estudio">En Estudio (General Paz 1060)</option>
                    <option value="domicilio">A Domicilio (San Miguel de Tucumán)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Mensaje o Consulta
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Contanos la fecha estimada de tu evento, si tenés un look en mente o cualquier detalle importante..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7D5DB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A] text-white font-semibold text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>Enviar mensaje a WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
