import type { Coordinates, Location } from '../types/location';

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getDistance(from: Coordinates, to: Coordinates): number {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) return '< 0.1 mi';
  return `${miles.toFixed(1)} mi`;
}

export function estimateWalkingTime(miles: number): string {
  const minutes = Math.round((miles / 3.1) * 60);
  if (minutes < 1) return '< 1 min walk';
  if (minutes >= 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs} hr ${mins} min walk` : `${hrs} hr walk`;
  }
  return `${minutes} min walk`;
}

export function sortByDistance(locations: Location[], from: Coordinates): Location[] {
  return [...locations].sort(
    (a, b) => getDistance(from, a.coordinates) - getDistance(from, b.coordinates),
  );
}

const SEARCH_NORMALIZATIONS: [RegExp, string][] = [
  [/\bst\.?\b/gi, 'street'],
  [/\bave\.?\b/gi, 'avenue'],
  [/\bblvd\.?\b/gi, 'boulevard'],
];

function normalize(text: string): string {
  let result = text.toLowerCase().trim();
  for (const [pattern, replacement] of SEARCH_NORMALIZATIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function filterBySearch(locations: Location[], query: string): Location[] {
  const q = normalize(query);
  if (!q) return locations;

  return locations.filter((loc) => {
    const name = normalize(loc.name);
    const address = normalize(loc.address);
    return name.includes(q) || address.includes(q) || loc.zipCode.includes(q);
  });
}

export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  });
}
