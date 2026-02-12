import { useEffect, useCallback } from 'react';

import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

import { getOffsetCenter } from './utils';
import { MAP_PIN, MOBILE_BREAKPOINT } from '../../constants';
import { useLocationStore } from '../../store/useLocationStore';

export default function LocationMarkers() {
  const map = useMap();
  const locations = useLocationStore((s) => s.locations);
  const selectedLocationId = useLocationStore((s) => s.selectedLocationId);
  const selectLocation = useLocationStore((s) => s.selectLocation);
  const userLocation = useLocationStore((s) => s.userLocation);
  const isLoading = useLocationStore((s) => s.isLoading);

  // Auto-fit bounds when locations load
  useEffect(() => {
    if (!map || isLoading || locations.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gmaps = (window as any).google?.maps;
    if (!gmaps) return;

    const bounds = new gmaps.LatLngBounds();
    for (const loc of locations) {
      bounds.extend({ lat: loc.coordinates.lat, lng: loc.coordinates.lng });
    }
    map.fitBounds(bounds, { top: 50, right: 50, bottom: 80, left: 50 });
  }, [map, isLoading, locations]);

  // Pan to selected location (offset upward on mobile so pin is visible above drawer)
  useEffect(() => {
    if (!map || !selectedLocationId) return;
    const location = locations.find((l) => l.id === selectedLocationId);
    if (!location) return;

    const target = { lat: location.coordinates.lat, lng: location.coordinates.lng };
    map.setZoom(15);

    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      map.panTo(target);
      return;
    }

    // On mobile, wait a tick so the projection is available after setZoom
    requestAnimationFrame(() => {
      const offsetLatLng = getOffsetCenter(map, target);
      map.panTo(offsetLatLng ?? target);
    });
  }, [map, selectedLocationId, locations]);

  // Pan to user location
  useEffect(() => {
    if (!map || !userLocation) return;
    map.panTo({ lat: userLocation.lat, lng: userLocation.lng });
    map.setZoom(13);
  }, [map, userLocation]);

  const handleMarkerClick = useCallback((id: string) => selectLocation(id), [selectLocation]);

  return (
    <>
      {locations.map((location) => {
        const isSelected = location.id === selectedLocationId;
        return (
          <AdvancedMarker
            key={location.id}
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            title={location.name}
            onClick={() => handleMarkerClick(location.id)}
          >
            <Pin
              background={isSelected ? MAP_PIN.selected : MAP_PIN.default}
              borderColor={MAP_PIN.border}
              glyphColor={MAP_PIN.glyph}
              scale={isSelected ? 1.3 : 1}
            />
          </AdvancedMarker>
        );
      })}

      {userLocation && (
        <AdvancedMarker position={{ lat: userLocation.lat, lng: userLocation.lng }}>
          <div className="user-marker" />
        </AdvancedMarker>
      )}
    </>
  );
}
