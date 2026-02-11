import { MapPinLargeIcon } from '../icons';

interface MapErrorFallbackProps {
  hasApiKey: boolean;
}

export default function MapErrorFallback({ hasApiKey }: MapErrorFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-surface-input">
      <div className="text-center p-6">
        <MapPinLargeIcon className="w-12 h-12 text-brand-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-brand-800">Map unavailable</p>
        <p className="text-xs text-brand-400 mt-1">
          {hasApiKey ? 'Unable to load Google Maps' : 'Google Maps API key not configured'}
        </p>
      </div>
    </div>
  );
}
