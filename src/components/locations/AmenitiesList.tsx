import Badge from '../ui/Badge';

import type { Amenity } from '../../types/location';

interface AmenitiesListProps {
  amenities: Amenity[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Amenities</h3>
      <div className="flex flex-wrap gap-1.5">
        {amenities.map((amenity) => (
          <Badge key={amenity} amenity={amenity} variant="amenity" />
        ))}
      </div>
    </div>
  );
}
