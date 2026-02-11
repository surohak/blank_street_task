import { STATUS_CONFIG, AMENITY_LABELS } from '../../constants';

import type { Amenity, LocationStatus } from '../../types/location';

interface BadgeProps {
  variant?: 'status' | 'amenity';
  status?: LocationStatus;
  amenity?: Amenity;
}

export default function Badge({ variant = 'amenity', status, amenity }: BadgeProps) {
  if (variant === 'status' && status) {
    const config = STATUS_CONFIG[status];
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className} bg-surface-input`}
      >
        {status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-status-open mr-1.5" />}
        {config.label}
      </span>
    );
  }

  if (variant === 'amenity' && amenity) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-input text-th-muted">
        {AMENITY_LABELS[amenity]}
      </span>
    );
  }

  return null;
}
