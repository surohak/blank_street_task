import { DEFAULT_HOURS, DAY_INDEX_MAP, FALLBACK_IMAGES } from '../constants';

import type { Location, DayOfWeek, HoursEntry, LocationStatus } from '../types/location';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  currentOpeningHours?: {
    openNow?: boolean;
    periods?: {
      open?: { day: number; hour: number; minute: number };
      close?: { day: number; hour: number; minute: number };
    }[];
  };
  photos?: { name: string }[];
  businessStatus?: string;
}

interface Period {
  open?: { day: number; hour: number; minute: number };
  close?: { day: number; hour: number; minute: number };
}

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const m = minute > 0 ? `:${String(minute).padStart(2, '0')}` : ':00';
  return `${h}${m} ${period}`;
}

function parseHours(periods?: Period[]): Record<DayOfWeek, HoursEntry> {
  if (!periods || periods.length === 0) return DEFAULT_HOURS;

  const hours = { ...DEFAULT_HOURS };
  for (const period of periods) {
    if (period.open && period.close) {
      const day = DAY_INDEX_MAP[period.open.day];
      if (day) {
        hours[day] = {
          open: formatTime(period.open.hour, period.open.minute),
          close: formatTime(period.close.hour, period.close.minute),
        };
      }
    }
  }
  return hours;
}

function getStatus(place: PlaceResult): LocationStatus {
  if (place.businessStatus === 'CLOSED_TEMPORARILY') return 'closed-temporarily';
  if (place.currentOpeningHours?.openNow === true) return 'open';
  return 'closing-soon';
}

function getPhotoUrl(place: PlaceResult, index: number): string {
  if (place.photos && place.photos.length > 0) {
    const photoName = place.photos[0].name;
    return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=400&maxHeightPx=300&key=${API_KEY}`;
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function extractZipCode(address: string): string {
  const match = /\b(\d{5})\b/.exec(address);
  return match ? match[1] : '10001';
}

export async function fetchBlankStreetLocations(): Promise<Location[]> {
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.location,places.currentOpeningHours,places.photos,places.businessStatus',
    },
    body: JSON.stringify({
      textQuery: 'Blank Street Coffee New York',
      maxResultCount: 20,
    }),
  });

  if (!response.ok) {
    throw new Error(`Places API error: ${response.status}`);
  }

  const data = await response.json();
  const places: PlaceResult[] = data.places || [];

  return places.map(
    (place, i): Location => ({
      id: place.id || `bs-${i}`,
      name: place.displayName?.text || `Blank Street #${i + 1}`,
      address: place.formattedAddress || 'New York, NY',
      zipCode: extractZipCode(place.formattedAddress || ''),
      coordinates: {
        lat: place.location?.latitude || 40.7128,
        lng: place.location?.longitude || -74.006,
      },
      hours: parseHours(place.currentOpeningHours?.periods),
      amenities: ['wifi', 'mobile-ordering'],
      status: getStatus(place),
      image: getPhotoUrl(place, i),
    }),
  );
}
