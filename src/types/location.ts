export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type LocationStatus = 'open' | 'closing-soon' | 'closed' | 'closed-temporarily';

export type Amenity =
  | 'wifi'
  | 'outdoor-seating'
  | 'mobile-ordering'
  | 'power-outlets'
  | 'restroom'
  | 'bike-parking';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HoursEntry {
  open: string;
  close: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  coordinates: Coordinates;
  hours: Record<DayOfWeek, HoursEntry>;
  amenities: Amenity[];
  status: LocationStatus;
  image: string;
}
