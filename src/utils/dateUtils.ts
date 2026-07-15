export function getDayName(date: Date, locale = 'es'): string {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
}

export function getShortDayName(date: Date): string {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return days[date.getDay()];
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getDaysRemaining(targetDate: Date): number {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getTimeRemaining(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function getMinutesBetween(date1: Date, date2: Date): number {
  return Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60);
}

export function parseTimeToDate(timeStr: string, baseDate?: Date): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = baseDate ? new Date(baseDate) : new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function isActivityOngoing(startTime: string, endTime: string): boolean {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

  const start = new Date(`${todayStr}T${startTime}`);
  let end = new Date(`${todayStr}T${endTime}`);

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  return now >= start && now <= end;
}

export function isActivityUpcoming(startTime: string): boolean {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  const start = new Date(`${todayStr}T${startTime}`);
  const bufferMinutes = 10;
  const diff = start.getTime() - now.getTime();
  return diff > 0 && diff <= bufferMinutes * 60 * 1000;
}

export function getActivityStatus(startTime: string, endTime: string, dateStr?: string): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date();
  const todayStr = dateStr || `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

  if (!dateStr) {
    return 'upcoming';
  }

  const start = new Date(`${dateStr}T${startTime}`);
  let end = new Date(`${dateStr}T${endTime}`);

  if (end <= start) {
    end.setMinutes(end.getMinutes() + 30);
  }

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'ongoing';
}
