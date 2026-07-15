import { useState, useEffect, useCallback } from 'react';
import retreatData from '../data/retreat.json';
import { getTimeRemaining, formatTime } from '../utils/dateUtils';
import { RETIRO_START_DATE, RETIRO_END_DATE } from '../utils/constants';

export interface RetreatStatus {
  hasStarted: boolean;
  hasEnded: boolean;
  currentDay: number | null;
  currentDayLabel: string | null;
  currentTime: string;
  timeUntilStart: { days: number; hours: number; minutes: number; seconds: number } | null;
}

export function useRetreatStatus(): RetreatStatus {
  const [status, setStatus] = useState<RetreatStatus>({
    hasStarted: false,
    hasEnded: false,
    currentDay: null,
    currentDayLabel: null,
    currentTime: formatTime(new Date()),
    timeUntilStart: null,
  });

  const updateStatus = useCallback(() => {
    const now = new Date();
    const start = RETIRO_START_DATE;
    const end = RETIRO_END_DATE;

    const hasStarted = now >= start;
    const hasEnded = now >= end;
    const currentTime = formatTime(now);
    const timeUntilStart = hasStarted ? null : getTimeRemaining(start);

    let currentDay: number | null = null;
    let currentDayLabel: string | null = null;

    if (hasStarted && !hasEnded) {
      const days = retreatData.days;
      const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

      for (let i = 0; i < days.length; i++) {
        if (days[i].date === todayStr) {
          currentDay = i + 1;
          currentDayLabel = days[i].label;
          break;
        }
      }

      if (currentDay === null) {
        const startMs = start.getTime();
        const nowMs = now.getTime();
        const diffDays = Math.floor((nowMs - startMs) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < days.length) {
          currentDay = diffDays + 1;
          currentDayLabel = days[diffDays].label;
        }
      }
    }

    setStatus({ hasStarted, hasEnded, currentDay, currentDayLabel, currentTime, timeUntilStart });
  }, []);

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, [updateStatus]);

  return status;
}
