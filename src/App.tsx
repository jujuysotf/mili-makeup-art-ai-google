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
    // Las clases de automaquillaje y cursos se agendan bajo clase de automaquillaje
    handleOpenBooking('clase-automaquillaje');
  };

  const handleExploreServices = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased selection:bg-[#F4A7C1] selection:text-[#1A1A1A]">
      {/* Barra de Navegación Fija */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Principal */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* Catálogo de Servicios Agrupados */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Portfolio de Trabajos Reales */}
        <PortfolioSection onBookRelatedService={handleOpenBooking} />

        {/* Videos y Reels */}
        <VideoReelsSection />

        {/* Escuela y Cursos */}
        <SchoolSection onBookCourse={handleBookCourse} />

        {/* Magazine y Tips */}
        <MagazineSection />

        {/* Acerca de Milagros Arce */}
        <AboutSection />

        {/* Opiniones y Testimonios */}
        <ReviewsSection />

        {/* Ubicación Google Maps & Preguntas Frecuentes */}
        <LocationSection />

        {/* Formulario y Contacto */}
        <ContactSection />
      </main>

      {/* Pie de Página */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Modal / Cuadro de Reserva de Turnos en 4 Pasos */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
      />

      {/* Botón Flotante de WhatsApp */}
      <WhatsAppFloating />
    </div>
  );
}
