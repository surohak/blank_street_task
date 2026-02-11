import React from 'react';

import AmenitiesList from './AmenitiesList';
import DetailHeader from './DetailHeader';
import HoursTable from './HoursTable';
import { FALLBACK_IMAGES } from '../../constants';
import { useLocationStore } from '../../store/useLocationStore';
import { getDistance, formatDistance } from '../../utils/geo';
import { LocationPinIcon } from '../icons';
import Badge from '../ui/Badge';

export default function LocationDetail() {
  const selectedLocationId = useLocationStore((s) => s.selectedLocationId);
  const locations = useLocationStore((s) => s.locations);
  const selectLocation = useLocationStore((s) => s.selectLocation);
  const userLocation = useLocationStore((s) => s.userLocation);

  const location = locations.find((l) => l.id === selectedLocationId);
  if (!location) return null;

  const distance = userLocation
    ? formatDistance(getDistance(userLocation, location.coordinates))
    : null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = FALLBACK_IMAGES[0];
  };

  return (
    <div className="flex flex-col h-full">
      <DetailHeader title={location.name} onBack={() => selectLocation(null)} />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
        <img
          alt={location.name}
          className="w-full h-44 object-cover rounded-xl bg-surface-input"
          src={location.image}
          onError={handleImageError}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge status={location.status} variant="status" />
            {distance && <span className="text-sm text-brand-400">{distance} away</span>}
          </div>
          <div className="flex items-start gap-2 text-sm text-brand-800">
            <LocationPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" />
            <span>{location.address}</span>
          </div>
        </div>

        <HoursTable hours={location.hours} />
        <AmenitiesList amenities={location.amenities} />
      </div>
    </div>
  );
}
