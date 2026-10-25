import { BookingConfirmation } from '../types';
import { calculateEndTime } from './dateUtils';
import { BUSINESS_INFO } from '../data/content';

export function generateIcsContent(booking: BookingConfirmation): string {
  const [year, month, day] = booking.date.split('-');
  const [startH, startM] = booking.time.split(':');
  const endTime = calculateEndTime(booking.time, booking.durationMinutes);
  const [endH, endM] = endTime.split(':');

  // Format: YYYYMMDDTHHMMSS
  const dtStart = `${year}${month}${day}T${startH}${startM}00`;
  const dtEnd = `${year}${month}${day}T${endH}${endM}00`;
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const location = booking.modality === 'domicilio'
    ? (booking.address || 'A Domicilio (acordado con Milagros Arce)')
    : BUSINESS_INFO.address;

  const description = `Turno de ${booking.serviceName} con Milagros Arce (Milimakeupart).
Código de reserva: ${booking.bookingCode}
Modalidad: ${booking.modality === 'domicilio' ? 'A Domicilio' : 'En Estudio'}
Duración: ${booking.durationMinutes} minutos.
WhatsApp de contacto: ${BUSINESS_INFO.phoneDisplay}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Milimakeupart//Turnos//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.bookingCode}-${dtStart}@milimakeupart.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Turno ${booking.serviceName} - Milimakeupart`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcsFile(booking: BookingConfirmation): void {
  const content = generateIcsContent(booking);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Turno-Milimakeupart-${booking.bookingCode}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
