import type { Amenity, DayOfWeek, HoursEntry, LocationStatus } from '../types/location';

export const MAP_PIN = {
  default: '#3d3529',
  selected: '#2d8a4e',
  glyph: '#fff',
  border: '#fff',
} as const;

export const NYC_CENTER = { lat: 40.735, lng: -73.985 } as const;

export const DEFAULT_HOURS: Record<DayOfWeek, HoursEntry> = {
  monday: { open: '7:00 AM', close: '7:00 PM' },
  tuesday: { open: '7:00 AM', close: '7:00 PM' },
  wednesday: { open: '7:00 AM', close: '7:00 PM' },
  thursday: { open: '7:00 AM', close: '7:00 PM' },
  friday: { open: '7:00 AM', close: '8:00 PM' },
  saturday: { open: '8:00 AM', close: '8:00 PM' },
  sunday: { open: '8:00 AM', close: '6:00 PM' },
};

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// Sunday = 0
export const DAY_INDEX_MAP: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const STATUS_CONFIG: Record<LocationStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'text-status-open' },
  'closing-soon': { label: 'Closing Soon', className: 'text-status-closing' },
  closed: { label: 'Closed', className: 'text-status-closed' },
  'closed-temporarily': { label: 'Closed Temporarily', className: 'text-status-closed' },
};

export const AMENITY_LABELS: Record<Amenity, string> = {
  wifi: 'WiFi',
  'outdoor-seating': 'Outdoor Seating',
  'mobile-ordering': 'Mobile Ordering',
  'power-outlets': 'Power Outlets',
  restroom: 'Restroom',
  'bike-parking': 'Bike Parking',
};

/** Unsplash fallback images */
export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop',
] as const;
