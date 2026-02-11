import { create } from 'zustand';

import { locations as mockLocations } from '../data/locations';
import { fetchBlankStreetLocations } from '../utils/placesApi';

import type { Coordinates, Location } from '../types/location';

interface LocationState {
  locations: Location[];
  selectedLocationId: string | null;
  searchQuery: string;
  userLocation: Coordinates | null;
  isLoading: boolean;

  selectLocation: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setUserLocation: (coords: Coordinates) => void;
  loadLocations: () => Promise<void>;
}

let loadInProgress = false;

export const useLocationStore = create<LocationState>((set) => ({
  locations: mockLocations,
  selectedLocationId: null,
  searchQuery: '',
  userLocation: null,
  isLoading: true,

  selectLocation: (id) => set({ selectedLocationId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setUserLocation: (coords) => set({ userLocation: coords }),

  loadLocations: async () => {
    if (loadInProgress) return;
    loadInProgress = true;

    set({ isLoading: true });
    try {
      const real = await fetchBlankStreetLocations();
      if (real.length > 0) {
        set({ locations: real, isLoading: false });
      } else {
        set({ locations: mockLocations, isLoading: false });
      }
    } catch {
      set({ locations: mockLocations, isLoading: false });
    } finally {
      loadInProgress = false;
    }
  },
}));
