import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentActivityIndex, isActivityInProgress, ActivityData } from '../scheduleLogic';

const activities: ActivityData[] = [
  { day: 'Sábado', date: '2026-08-15', time: '05:00', endTime: '05:30', label: 'Apertura' },
  { day: 'Sábado', date: '2026-08-15', time: '06:00', endTime: '07:00', label: 'Desayuno' },
  { day: 'Sábado', date: '2026-08-15', time: '07:00', endTime: '08:30', label: 'Alabanza' },
  { day: 'Domingo', date: '2026-08-16', time: '09:00', endTime: '10:30', label: 'Conferencia 1' },
  { day: 'Lunes', date: '2026-08-17', time: '14:00', endTime: '17:00', label: 'Clausura' },
];

const start = new Date('2026-08-15T05:00:00');
const end = new Date('2026-08-17T17:00:00');

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getCurrentActivityIndex', () => {
  it('returns 0 when before retreat start', () => {
    vi.setSystemTime(new Date('2026-08-14T23:00:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(0);
  });

  it('returns activities.length when after retreat end', () => {
    vi.setSystemTime(new Date('2026-08-17T18:00:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(activities.length);
  });

  it('returns index 0 during first activity', () => {
    vi.setSystemTime(new Date('2026-08-15T05:10:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(0);
  });

  it('returns index 1 when between act 0 and act 1', () => {
    vi.setSystemTime(new Date('2026-08-15T05:40:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(1);
  });

  it('returns index 1 during act 1', () => {
    vi.setSystemTime(new Date('2026-08-15T06:30:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(1);
  });

  it('returns last index during last activity', () => {
    vi.setSystemTime(new Date('2026-08-17T15:00:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(4);
  });

  it('returns activities.length on exact end date + time', () => {
    vi.setSystemTime(new Date('2026-08-17T17:00:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(activities.length);
  });

  it('returns the correct index when on a different day activity', () => {
    vi.setSystemTime(new Date('2026-08-16T09:30:00'));
    expect(getCurrentActivityIndex(activities, start, end)).toBe(3);
  });
});

describe('isActivityInProgress', () => {
  it('returns true when now is within activity', () => {
    vi.setSystemTime(new Date('2026-08-15T06:30:00'));
    expect(isActivityInProgress(activities[1])).toBe(true);
  });

  it('returns false when now is before activity', () => {
    vi.setSystemTime(new Date('2026-08-15T05:00:00'));
    expect(isActivityInProgress(activities[1])).toBe(false);
  });

  it('returns false when now is after activity', () => {
    vi.setSystemTime(new Date('2026-08-15T08:00:00'));
    expect(isActivityInProgress(activities[1])).toBe(false);
  });
});
