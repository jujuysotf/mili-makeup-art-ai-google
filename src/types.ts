export type ServiceCategory = 'eventos' | 'novias' | 'producciones' | 'formacion';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  occasion: string;
  durationMinutes: number; // Duración de ejemplo
  includes: string[];
  modalities: ('estudio' | 'domicilio')[];
  description: string;
  badge?: string;
  recommendedFor?: string;
}

export type PortfolioCategory = 'todos' | 'social' | 'novia' | 'artístico' | 'quince' | 'sesión' | 'proceso';

export interface PortfolioWork {
  id: number;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  text: string;
  principal: string;
  images: string[];
  publicar: boolean;
  relatedServiceId?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  service: string;
  quote: string;
  rating: number;
  date?: string;
}

export interface SchoolCourse {
  id: string;
  title: string;
  target: string;
  durationMinutes: number;
  summary: string;
  topics: string[];
  modalities: ('estudio' | 'domicilio')[];
}

export interface MagazineArticle {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TimeSlot {
  time: string; // HH:mm
  available: boolean;
  reason?: string;
}

export interface BookingData {
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  modality: 'estudio' | 'domicilio';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
  address?: string; // Si es a domicilio
}

export interface BookingConfirmation extends BookingData {
  bookingCode: string;
  createdAt: string;
  status: 'confirmado' | 'pendiente';
}

export interface UserProfile {
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  isGuest: boolean;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  provider: 'google' | 'guest';
}
