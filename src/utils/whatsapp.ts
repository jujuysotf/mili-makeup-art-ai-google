import { BUSINESS_INFO } from '../data/content';
import { BookingConfirmation } from '../types';

export function getWhatsAppBaseUrl(): string {
  return `https://wa.me/${BUSINESS_INFO.phoneRaw}`;
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encoded}`;
}

export function getGeneralWhatsAppUrl(): string {
  const message = `¡Hola Milagros! Te escribo desde la web de Milimakeupart para hacerte una consulta sobre tus servicios de maquillaje.`;
  return buildWhatsAppUrl(message);
}

export function getServiceInquiryUrl(serviceName: string, durationMinutes: number): string {
  const message = `¡Hola Mili! Me interesa el servicio de *${serviceName}* (${durationMinutes} min) que vi en tu web. ¿Podrías darme más información sobre disponibilidad y valor? ¡Gracias!`;
  return buildWhatsAppUrl(message);
}

export function getPortfolioInquiryUrl(workTitle: string, categoryLabel: string): string {
  const message = `¡Hola Mili! Vi el trabajo *"${workTitle}"* (${categoryLabel}) en tu web de Milimakeupart y me encantó. Me gustaría consultar para hacerme un look similar.`;
  return buildWhatsAppUrl(message);
}

export function getCourseInquiryUrl(courseTitle: string): string {
  const message = `¡Hola Mili! Quisiera consultar por el curso *${courseTitle}* de tu Escuela de Maquillaje. ¿Cómo coordinamos fechas y temario?`;
  return buildWhatsAppUrl(message);
}

export function getBookingConfirmationWhatsAppUrl(booking: BookingConfirmation): string {
  const modalityText = booking.modality === 'domicilio' ? 'A Domicilio' : 'En Estudio (Gral. Paz 1060)';
  const addressText = booking.address ? `\n📍 *Dirección:* ${booking.address}` : '';
  const notesText = booking.notes ? `\n📝 *Nota:* ${booking.notes}` : '';

  const message = `✨ *SOLICITUD DE TURNO - MILIMAKEUPART* ✨
━━━━━━━━━━━━━━━━━━━━
🔖 *Código de reserva:* ${booking.bookingCode}
💄 *Servicio:* ${booking.serviceName} (${booking.durationMinutes} min)
🏠 *Modalidad:* ${modalityText}${addressText}
📅 *Fecha:* ${booking.date}
⏰ *Horario:* ${booking.time} hs
👤 *Clienta:* ${booking.clientName}
📱 *Teléfono:* ${booking.clientPhone}${notesText}
━━━━━━━━━━━━━━━━━━━━
¡Hola Mili! Acabo de registrar este turno en tu web y te paso el resumen para coordinar los detalles. ¡Muchas gracias!`;

  return buildWhatsAppUrl(message);
}
