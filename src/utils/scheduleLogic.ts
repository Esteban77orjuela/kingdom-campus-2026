export interface ActivityData {
  day: string;
  date: string;
  time: string;
  endTime: string;
  label: string;
}

export function getCurrentActivityIndex(
  activities: ActivityData[],
  start: Date,
  end: Date
): number {
  const now = new Date();

  if (now < start) return 0;
  if (now >= end) return activities.length;

  for (let i = 0; i < activities.length; i++) {
    const act = activities[i];
    const actStart = new Date(`${act.date}T${act.time}`);
    const actEnd = new Date(`${act.date}T${act.endTime}`);

    if (now < actStart) return i;
    if (now >= actStart && now <= actEnd) return i;
  }

  return activities.length;
}

export function isActivityInProgress(act: ActivityData): boolean {
  const now = new Date();
  const start = new Date(`${act.date}T${act.time}`);
  const end = new Date(`${act.date}T${act.endTime}`);
  return now >= start && now <= end;
}
