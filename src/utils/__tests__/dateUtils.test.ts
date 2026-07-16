import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getDayName,
  getShortDayName,
  formatTime,
  formatDate,
  getDaysRemaining,
  getTimeRemaining,
  getMinutesBetween,
  parseTimeToDate,
  isActivityOngoing,
  isActivityUpcoming,
  getActivityStatus,
} from '../dateUtils';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getDayName', () => {
  it('returns correct Spanish day name', () => {
    expect(getDayName(new Date(2026, 7, 15))).toBe('Sábado');
    expect(getDayName(new Date(2026, 7, 16))).toBe('Domingo');
    expect(getDayName(new Date(2026, 7, 17))).toBe('Lunes');
  });
});

describe('getShortDayName', () => {
  it('returns correct short Spanish day name', () => {
    expect(getShortDayName(new Date(2026, 7, 15))).toBe('Sáb');
    expect(getShortDayName(new Date(2026, 7, 16))).toBe('Dom');
    expect(getShortDayName(new Date(2026, 7, 17))).toBe('Lun');
  });
});

describe('formatTime', () => {
  it('formats time as HH:MM', () => {
    const date = new Date('2026-08-15T07:05:00');
    expect(formatTime(date)).toBe('07:05');
  });
});

describe('formatDate', () => {
  it('formats date as DD/MM/YYYY', () => {
    const date = new Date(2026, 7, 15);
    expect(formatDate(date)).toBe('15/08/2026');
  });
});

describe('getDaysRemaining', () => {
  it('returns correct days for a future date', () => {
    vi.setSystemTime(new Date('2026-08-10T00:00:00'));
    const target = new Date('2026-08-15T00:00:00');
    expect(getDaysRemaining(target)).toBe(5);
  });

  it('returns 0 for a past date', () => {
    vi.setSystemTime(new Date('2026-08-20T00:00:00'));
    const target = new Date('2026-08-15T00:00:00');
    expect(getDaysRemaining(target)).toBe(0);
  });
});

describe('getTimeRemaining', () => {
  it('returns correct breakdown for a future date', () => {
    vi.setSystemTime(new Date('2026-08-15T05:00:00'));
    const target = new Date('2026-08-17T17:00:00');
    const result = getTimeRemaining(target);
    expect(result.days).toBe(2);
    expect(result.hours).toBe(12);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('returns all zeros for a past date', () => {
    vi.setSystemTime(new Date('2026-08-20T00:00:00'));
    const target = new Date('2026-08-15T00:00:00');
    expect(getTimeRemaining(target)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});

describe('getMinutesBetween', () => {
  it('returns the absolute minutes between two dates', () => {
    const d1 = new Date('2026-08-15T05:00:00');
    const d2 = new Date('2026-08-15T07:30:00');
    expect(getMinutesBetween(d1, d2)).toBe(150);
  });
});

describe('parseTimeToDate', () => {
  it('parses HH:MM into a Date with today as base', () => {
    vi.setSystemTime(new Date('2026-08-15T00:00:00'));
    const result = parseTimeToDate('07:30');
    expect(result.getHours()).toBe(7);
    expect(result.getMinutes()).toBe(30);
  });

  it('uses provided base date', () => {
    const base = new Date('2026-08-16T00:00:00');
    const result = parseTimeToDate('14:00', base);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(0);
    expect(result.getDate()).toBe(16);
  });
});

describe('isActivityOngoing', () => {
  it('returns true when now is within the activity', () => {
    vi.setSystemTime(new Date('2026-08-15T06:30:00'));
    expect(isActivityOngoing('06:00', '07:00')).toBe(true);
  });

  it('returns false when now is before the activity', () => {
    vi.setSystemTime(new Date('2026-08-15T05:00:00'));
    expect(isActivityOngoing('06:00', '07:00')).toBe(false);
  });

  it('returns false when now is after the activity', () => {
    vi.setSystemTime(new Date('2026-08-15T08:00:00'));
    expect(isActivityOngoing('06:00', '07:00')).toBe(false);
  });

  it('handles cross-midnight activities (end <= start) when called before midnight', () => {
    vi.setSystemTime(new Date(2026, 7, 15, 23, 30));
    expect(isActivityOngoing('23:00', '01:00')).toBe(true);
  });
});

describe('isActivityUpcoming', () => {
  it('returns true within 10 minutes before start', () => {
    vi.setSystemTime(new Date('2026-08-15T06:52:00'));
    expect(isActivityUpcoming('07:00')).toBe(true);
  });

  it('returns false more than 10 minutes before start', () => {
    vi.setSystemTime(new Date('2026-08-15T06:40:00'));
    expect(isActivityUpcoming('07:00')).toBe(false);
  });

  it('returns false after start', () => {
    vi.setSystemTime(new Date('2026-08-15T07:05:00'));
    expect(isActivityUpcoming('07:00')).toBe(false);
  });
});

describe('getActivityStatus', () => {
  it('returns "upcoming" when before activity', () => {
    vi.setSystemTime(new Date('2026-08-15T04:00:00'));
    expect(getActivityStatus('05:00', '05:30', '2026-08-15')).toBe('upcoming');
  });

  it('returns "ongoing" during activity', () => {
    vi.setSystemTime(new Date('2026-08-15T05:15:00'));
    expect(getActivityStatus('05:00', '05:30', '2026-08-15')).toBe('ongoing');
  });

  it('returns "completed" after activity', () => {
    vi.setSystemTime(new Date('2026-08-15T06:00:00'));
    expect(getActivityStatus('05:00', '05:30', '2026-08-15')).toBe('completed');
  });

  it('returns "upcoming" when no dateStr provided', () => {
    vi.setSystemTime(new Date('2026-08-15T05:15:00'));
    expect(getActivityStatus('05:00', '05:30')).toBe('upcoming');
  });

  it('handles cross-midnight by adding 30 minutes to end', () => {
    vi.setSystemTime(new Date(2026, 7, 15, 23, 15));
    expect(getActivityStatus('23:00', '23:00', '2026-08-15')).toBe('ongoing');
  });
});
