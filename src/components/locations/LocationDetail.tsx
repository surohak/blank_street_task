import React from 'react';

import AmenitiesList from './AmenitiesList';
import ClosingCountdown from './ClosingCountdown';
import DetailHeader from './DetailHeader';
import HoursTable from './HoursTable';
import { FALLBACK_IMAGES } from '../../constants';
import { useLocationStore } from '../../store/useLocationStore';
import { getDistance, formatDistance, estimateWalkingTime } from '../../utils/geo';
import { DirectionsIcon, LocationPinIcon } from '../icons';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function LocationDetail() {
  const selectedLocationId = useLocationStore((s) => s.selectedLocationId);
  const locations = useLocationStore((s) => s.locations);
  const selectLocation = useLocationStore((s) => s.selectLocation);
  const userLocation = useLocationStore((s) => s.userLocation);

  const location = locations.find((l) => l.id === selectedLocationId);
  if (!location) return null;

  const miles = userLocation ? getDistance(userLocation, location.coordinates) : null;
  const distance = miles === null ? null : formatDistance(miles);
  const walkTime = miles === null ? null : estimateWalkingTime(miles);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = FALLBACK_IMAGES[0];
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}&travelmode=walking`;

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
            {distance && (
              <span className="text-sm text-th-faint">
                {distance}
                {walkTime && <span className="text-th-muted"> · {walkTime}</span>}
              </span>
            )}
          </div>
          <ClosingCountdown hours={location.hours} status={location.status} />
          <div className="flex items-start gap-2 text-sm text-th-secondary">
            <LocationPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-th-faint" />
            <span>{location.address}</span>
          </div>
        </div>

        <a className="block mt-2" href={directionsUrl} rel="noopener noreferrer" target="_blank">
          <Button className="gap-2" icon={<DirectionsIcon className="w-4 h-4" />}>
            Get Directions
          </Button>
        </a>

        <HoursTable hours={location.hours} />
        <AmenitiesList amenities={location.amenities} />
      </div>
    </div>
  );
}
