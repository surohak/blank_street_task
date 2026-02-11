import { MapPinLargeIcon } from '../icons';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <MapPinLargeIcon className="w-12 h-12 text-brand-300 mb-3" />
      <p className="text-sm font-semibold text-brand-800">No locations found</p>
      <p className="text-xs text-brand-400 mt-1">Try a different search term</p>
    </div>
  );
}
