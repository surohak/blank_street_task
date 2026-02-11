import { AMENITY_LABELS } from '../../constants';

import type { Amenity } from '../../types/location';

interface AmenitiesListProps {
  amenities: Amenity[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 text-th-text">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {amenities.map((a) => (
          <span
            key={a}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-input text-th-muted"
          >
            {AMENITY_LABELS[a]}
          </span>
        ))}
      </div>
    </div>
  );
}
