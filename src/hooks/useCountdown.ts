import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getTimeRemaining } from '../utils/dateUtils';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isComplete: boolean;
}

export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() => {
    const remaining = getTimeRemaining(targetDate);
    const totalSeconds = remaining.days * 86400 + remaining.hours * 3600 + remaining.minutes * 60 + remaining.seconds;
    return {
      ...remaining,
      totalSeconds,
      isComplete: totalSeconds <= 0,
    };
  });

  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
        const remaining = getTimeRemaining(targetDate);
        const totalSeconds = remaining.days * 86400 + remaining.hours * 3600 + remaining.minutes * 60 + remaining.seconds;
        setCountdown({
          ...remaining,
          totalSeconds,
          isComplete: totalSeconds <= 0,
        });
      }
      appStateRef.current = nextState;
    });

    return () => subscription.remove();
  }, [targetDate]);

  useEffect(() => {
    const remaining = getTimeRemaining(targetDate);
    const totalSeconds = remaining.days * 86400 + remaining.hours * 3600 + remaining.minutes * 60 + remaining.seconds;

    if (totalSeconds <= 0) {
      setCountdown((prev) => ({ ...prev, isComplete: true }));
      return;
    }

    const timer = setInterval(() => {
      const r = getTimeRemaining(targetDate);
      const ts = r.days * 86400 + r.hours * 3600 + r.minutes * 60 + r.seconds;
      setCountdown({
        ...r,
        totalSeconds: ts,
        isComplete: ts <= 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}
