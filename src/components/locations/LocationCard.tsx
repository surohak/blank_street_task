import React from 'react';

import { STATUS_CONFIG, FALLBACK_IMAGES } from '../../constants';
import { useLocationStore } from '../../store/useLocationStore';
import { getDistance, formatDistance } from '../../utils/geo';
import Button from '../ui/Button';

import type { Location } from '../../types/location';

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const selectLocation = useLocationStore((s) => s.selectLocation);
  const userLocation = useLocationStore((s) => s.userLocation);

  const distance = userLocation
    ? formatDistance(getDistance(userLocation, location.coordinates))
    : null;

  const status = STATUS_CONFIG[location.status] ?? STATUS_CONFIG.open;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = FALLBACK_IMAGES[0];
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border-card">
      <img
        alt={location.name}
        className="w-20 h-20 rounded-lg object-cover shrink-0 bg-surface-input"
        src={location.image}
        onError={handleImageError}
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-brand-900 leading-snug">{location.name}</h3>
        {distance && <p className="text-xs text-brand-400 mt-0.5">{distance}</p>}
        <p className="text-xs text-brand-400 mt-0.5 leading-snug">{location.address}</p>
        <p className={`text-xs font-medium mt-1 ${status.className}`}>{status.label}</p>
      </div>

      <Button className="shrink-0" variant="pill" onClick={() => selectLocation(location.id)}>
        Select
      </Button>
    </div>
  );
}
