import { BUSINESS_INFO } from '../data/content';
import { TimeSlot } from '../types';

export function generateDailyTimeSlots(durationMinutes: number): string[] {
  const slots: string[] = [];
  const startHour = BUSINESS_INFO.openingHour; // 9
  const endHour = BUSINESS_INFO.closingHour;    // 22
  const maxEndMinutes = endHour * 60;          // 22 * 60 = 1320

  // Intervalo de inicio: cada 30 minutos
  for (let m = startHour * 60; m < maxEndMinutes; m += 30) {
    if (m + durationMinutes <= maxEndMinutes) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const hh = h.toString().padStart(2, '0');
      const mm = min.toString().padStart(2, '0');
      slots.push(`${hh}:${mm}`);
    }
  }

  return slots;
}

export function formatDateToSpanish(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function getAvailableDatesList(daysAhead: number = 30): { dateStr: string; label: string; weekday: string; isToday: boolean }[] {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const weekday = new Intl.DateTimeFormat('es-AR', { weekday: 'short' }).format(d);
    const dayNum = d.getDate();
    const monthName = new Intl.DateTimeFormat('es-AR', { month: 'short' }).format(d);

    dates.push({
      dateStr,
      label: `${dayNum} ${monthName}`,
      weekday: weekday.toUpperCase().slice(0, 3),
      isToday: i === 0,
    });
  }

  return dates;
}

export function parseTimeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const startM = parseTimeToMinutes(startTime);
  const endM = startM + durationMinutes;
  const h = Math.floor(endM / 60);
  const m = endM % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
