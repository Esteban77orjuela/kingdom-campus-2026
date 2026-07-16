export const RETIRO_NAME = 'Kingdom Campus 2026';
export const RETIRO_SUBTITLE = 'Contra Corriente';
export const RETIRO_VERSE = 'Romanos 12:2';
export const RETIRO_VERSE_TEXT = 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento';

export const RETIRO_START_DATE = new Date('2026-08-15T05:00:00');
export const RETIRO_END_DATE = new Date('2026-08-17T17:00:00');

export const DAY_LABELS = ['Sábado 15', 'Domingo 16', 'Lunes 17'];

export const NOTIFICATION_BUFFER_MINUTES = 10;

export const FACULTIES = [
  { id: 'jerusalen', name: 'Jerusalén', color: '#D32F2F', icon: 'city' },
  { id: 'antioquia', name: 'Antioquía', color: '#1976D2', icon: 'church' },
  { id: 'berea', name: 'Berea', color: '#388E3C', icon: 'book-open-variant' },
  { id: 'efeso', name: 'Éfeso', color: '#F57C00', icon: 'bank' },
  { id: 'galilea', name: 'Galilea', color: '#7B1FA2', icon: 'water' },
];

export const STORAGE_KEYS = {
  SCHEDULE: '@kingdom_campus/schedule',
  CONFERENCES: '@kingdom_campus/conferences',
  CATEDRAS: '@kingdom_campus/catedras',
  FACULTIES: '@kingdom_campus/faculties',
  RECOMMENDATIONS: '@kingdom_campus/recommendations',
  TEAM: '@kingdom_campus/team',
  RETREAT_INFO: '@kingdom_campus/retreat_info',
  NOTIFICATIONS_SCHEDULED: '@kingdom_campus/notifications_scheduled',
};
