import EmptyState from './EmptyState';
import LocationCard from './LocationCard';
import LocationListSkeleton from './LocationListSkeleton';
import { useLocationStore } from '../../store/useLocationStore';
import { filterBySearch, sortByDistance } from '../../utils/geo';

export default function LocationList() {
  const locations = useLocationStore((s) => s.locations);
  const searchQuery = useLocationStore((s) => s.searchQuery);
  const userLocation = useLocationStore((s) => s.userLocation);
  const isLoading = useLocationStore((s) => s.isLoading);

  const filtered = filterBySearch(locations, searchQuery);
  const sorted = userLocation ? sortByDistance(filtered, userLocation) : filtered;

  if (isLoading) return <LocationListSkeleton />;
  if (sorted.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto flex-1">
      <p className="text-sm font-semibold text-brand-900">
        {sorted.length}{' '}
        {userLocation ? 'results nearby' : `location${sorted.length === 1 ? '' : 's'}`}
      </p>

      {sorted.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
