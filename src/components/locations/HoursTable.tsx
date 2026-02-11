import { DAYS_OF_WEEK } from '../../constants';

import type { DayOfWeek, HoursEntry } from '../../types/location';

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface HoursTableProps {
  hours: Record<DayOfWeek, HoursEntry>;
}

export default function HoursTable({ hours }: HoursTableProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Hours</h3>
      <div className="space-y-1">
        {DAYS_OF_WEEK.map((day: DayOfWeek) => {
          const entry = hours[day];
          return (
            <div key={day} className="flex justify-between text-xs">
              <span className="text-brand-500">{capitalize(day)}</span>
              <span className="text-brand-900 font-medium">
                {entry ? `${entry.open} – ${entry.close}` : 'Hours unavailable'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
