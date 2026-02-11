import { MapPinLargeIcon } from '../icons';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <MapPinLargeIcon className="w-12 h-12 text-th-faintest mb-3" />
      <p className="text-sm font-semibold text-th-secondary">No locations found</p>
      <p className="text-xs text-th-faint mt-1">Try a different search term</p>
    </div>
  );
}
