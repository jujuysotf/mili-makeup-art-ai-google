import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { VideoReelsSection } from './components/VideoReelsSection';
import { SchoolSection } from './components/SchoolSection';
import { MagazineSection } from './components/MagazineSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ServiceItem, SchoolCourse } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  const handleSelectService = (service: ServiceItem) => {
    handleOpenBooking(service.id);
  };

  const handleBookCourse = (course: SchoolCourse) => {
    handleOpenBooking('clase-automaquillaje');
  };

  const handleExploreServices = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased selection:bg-[#F4A7C1] selection:text-[#1A1A1A] pb-16 md:pb-0">
      
      {/* ============================================================== */}
      {/* SECTOR 1: ENCABEZADO & MENÚ DE NAVEGACIÓN                      */}
      {/* Barra superior con datos de contacto, logo y anclas de menú    */}
      {/* ============================================================== */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* ============================================================== */}
        {/* SECTOR 2: PORTADA / HERO PRINCIPAL                             */}
        {/* Titular de valor, foto de look real y botones de acción rápida */}
        {/* ============================================================== */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* ============================================================== */}
        {/* SECTOR 3: CATÁLOGO DE SERVICIOS                                */}
        {/* Tarjetas compactas, "Ver qué incluye", vista carrusel y grilla */}
        {/* ============================================================== */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* ============================================================== */}
        {/* SECTOR 4: PORTFOLIO DE LOOKS REALIZADOS                        */}
        {/* Galería con filtros por categoría, carrusel y visor lightbox   */}
        {/* ============================================================== */}
        <PortfolioSection onBookRelatedService={handleOpenBooking} />

        {/* ============================================================== */}
        {/* SECTOR 5: VIDEOS & REELS DE INSTAGRAM                          */}
        {/* Reproductores de backstage y enlace a grilla de reels oficial  */}
        {/* ============================================================== */}
        <VideoReelsSection />

        {/* ============================================================== */}
        {/* SECTOR 6: ESCUELA DE MAQUILLAJE & FORMACIÓN                    */}
        {/* Cursos individuales de automaquillaje y novias con temarios    */}
        {/* ============================================================== */}
        <SchoolSection onBookCourse={handleBookCourse} />

        {/* ============================================================== */}
        {/* SECTOR 7: MAGAZINE & CONSEJOS DE BELLEZA                       */}
        {/* Artículos breves con modal de lectura sobre cuidado de piel    */}
        {/* ============================================================== */}
        <MagazineSection />

        {/* ============================================================== */}
        {/* SECTOR 8: ACERCA DE MILAGROS ARCE                              */}
        {/* Perfil profesional, fotos de proceso en estudio y filosofía    */}
        {/* ============================================================== */}
        <AboutSection />

        {/* ============================================================== */}
        {/* SECTOR 9: OPINIONES & TESTIMONIOS                              */}
        {/* Reseñas de clientas reales con calificación de 5 estrellas     */}
        {/* ============================================================== */}
        <ReviewsSection />

        {/* ============================================================== */}
        {/* SECTOR 10: UBICACIÓN GOOGLE MAPS & PREGUNTAS FRECUENTES (FAQs) */}
        {/* Mapa interactivo en General Paz 1060 y acordeón de respuestas  */}
        {/* ============================================================== */}
        <LocationSection />

        {/* ============================================================== */}
        {/* SECTOR 11: FORMULARIO DE CONTACTO & WHATSAPP                   */}
        {/* Generador de mensajes directos para consultas personalizadas   */}
        {/* ============================================================== */}
        <ContactSection />
      </main>

      {/* ============================================================== */}
      {/* SECTOR 12: PIE DE PÁGINA (FOOTER)                              */}
      {/* Redes sociales, datos de atención, copyright y créditos        */}
      {/* ============================================================== */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* ============================================================== */}
      {/* SECTOR 13: CUADRO MODAL DE GESTIÓN DE TURNOS (4 PASOS)         */}
      {/* Flujo: Servicio -> Fecha/Hora libre -> Datos -> Confirmación   */}
      {/* ============================================================== */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
      />

      {/* ============================================================== */}
      {/* SECTOR 14: ACCIONES FLOTANTES (WHATSAPP & BARRA MÓVIL)         */}
      {/* Botón flotante oficial con diálogo y barra de pulgar en móvil  */}
      {/* ============================================================== */}
      <WhatsAppFloating />
      <MobileBottomBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
