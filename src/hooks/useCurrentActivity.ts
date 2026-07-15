import { useState, useEffect, useCallback } from 'react';
import { getActivityStatus } from '../utils/dateUtils';
import scheduleData from '../data/schedule.json';

interface Activity {
  time: string;
  endTime: string;
  activity: string;
  responsible: string;
  location: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export function useCurrentActivity(): {
  currentActivity: Activity | null;
  nextActivity: Activity | null;
  todayActivities: Activity[];
  loading: boolean;
} {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);
  const [todayActivities, setTodayActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const findActivities = useCallback(() => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    const daySchedule = scheduleData.find((d) => d.day === todayStr);
    if (!daySchedule) {
      setCurrentActivity(null);
      setNextActivity(null);
      setTodayActivities([]);
      setLoading(false);
      return;
    }

    const activitiesWithStatus = daySchedule.activities.map((act) => ({
      ...act,
      status: getActivityStatus(act.time, act.endTime, daySchedule.day),
    }));

    setTodayActivities(activitiesWithStatus);

    const ongoing = activitiesWithStatus.find((a) => a.status === 'ongoing');
    const upcoming = activitiesWithStatus.find((a) => a.status === 'upcoming');

    setCurrentActivity(ongoing || null);
    setNextActivity(upcoming || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    findActivities();
    const interval = setInterval(findActivities, 30000);
    return () => clearInterval(interval);
  }, [findActivities]);

  return { currentActivity, nextActivity, todayActivities, loading };
}
