import { useState, useEffect } from 'react';

import type { HoursEntry, DayOfWeek } from '../../types/location';

const DAY_NAMES: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(timeStr.trim());
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return { hours, minutes };
}

function getMinutesUntilClose(hours: Record<DayOfWeek, HoursEntry>): number | null {
  const now = new Date();
  const dayName = DAY_NAMES[now.getDay()];
  const entry = hours[dayName];
  if (!entry) return null;

  const close = parseTime(entry.close);
  if (!close) return null;

  const closeMinutes = close.hours * 60 + close.minutes;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const diff = closeMinutes - nowMinutes;
  return diff > 0 ? diff : null;
}

function formatCountdown(minutes: number): string {
  if (minutes >= 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `Closes in ${hrs}h ${mins}m` : `Closes in ${hrs}h`;
  }
  return `Closes in ${minutes}m`;
}

interface ClosingCountdownProps {
  hours: Record<DayOfWeek, HoursEntry>;
  status: string;
}

export default function ClosingCountdown({ hours, status }: ClosingCountdownProps) {
  const [minutesLeft, setMinutesLeft] = useState(() => getMinutesUntilClose(hours));

  useEffect(() => {
    if (status !== 'open' && status !== 'closing-soon') return;

    const interval = setInterval(() => {
      setMinutesLeft(getMinutesUntilClose(hours));
    }, 60_000);

    return () => clearInterval(interval);
  }, [hours, status]);

  if (!minutesLeft || (status !== 'open' && status !== 'closing-soon')) return null;

  const isUrgent = minutesLeft <= 30;

  return (
    <span className={`text-xs font-medium ${isUrgent ? 'text-status-closing' : 'text-th-faint'}`}>
      {formatCountdown(minutesLeft)}
    </span>
  );
}
