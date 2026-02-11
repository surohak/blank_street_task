import { useCallback, useEffect, useRef } from 'react';

import { useLocationStore } from '../../store/useLocationStore';
import { getUserLocation } from '../../utils/geo';
import { CloseIcon, CrosshairIcon, SearchIcon } from '../icons';
import Button from '../ui/Button';

interface SearchBarProps {
  onError?: (title: string, message: string) => void;
}

export default function SearchBar({ onError }: SearchBarProps) {
  const searchQuery = useLocationStore((s) => s.searchQuery);
  const setSearchQuery = useLocationStore((s) => s.setSearchQuery);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLocateMe = useCallback(async () => {
    try {
      const coords = await getUserLocation();
      setUserLocation(coords);
      setSearchQuery('');
      inputRef.current?.blur();
    } catch {
      onError?.(
        'Location Unavailable',
        'Unable to get your location. Please allow location access or search manually.',
      );
    }
  }, [setUserLocation, setSearchQuery, onError]);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    inputRef.current?.focus();
  }, [setSearchQuery]);

  return (
    <div className="flex flex-col gap-2 p-4 border-b border-border">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 w-4 h-4 text-th-faint" />

        <input
          ref={inputRef}
          className="w-full pl-10 pr-10 py-2.5 bg-surface-input rounded-lg text-sm text-th-text placeholder:text-th-faintest outline-none focus:ring-2 focus:ring-primary-bg/20 transition-shadow"
          placeholder="Enter city, street or ZIP code"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') inputRef.current?.blur();
          }}
        />

        {searchQuery && (
          <Button
            className="absolute right-3 !w-5 !h-5 bg-th-faintest text-white hover:bg-th-faint"
            icon={<CloseIcon />}
            size="sm"
            variant="icon"
            onClick={handleClear}
          />
        )}
      </div>

      <Button icon={<CrosshairIcon />} variant="ghost" onClick={handleLocateMe}>
        Use my current location
      </Button>
    </div>
  );
}
