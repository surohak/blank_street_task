import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

import { useLocationStore } from '../../src/store/useLocationStore';

// Reset store state before each test
beforeEach(() => {
  act(() => {
    useLocationStore.setState({
      selectedLocationId: null,
      searchQuery: '',
      userLocation: null,
    });
  });
});

describe('useLocationStore', () => {
  it('has initial state with locations loaded', () => {
    const state = useLocationStore.getState();
    expect(state.locations.length).toBeGreaterThan(0);
    expect(state.selectedLocationId).toBeNull();
    expect(state.searchQuery).toBe('');
    expect(state.userLocation).toBeNull();
  });

  it('selectLocation sets and clears selection', () => {
    act(() => {
      useLocationStore.getState().selectLocation('bs-1');
    });
    expect(useLocationStore.getState().selectedLocationId).toBe('bs-1');

    act(() => {
      useLocationStore.getState().selectLocation(null);
    });
    expect(useLocationStore.getState().selectedLocationId).toBeNull();
  });

  it('setSearchQuery updates the query', () => {
    act(() => {
      useLocationStore.getState().setSearchQuery('tribeca');
    });
    expect(useLocationStore.getState().searchQuery).toBe('tribeca');
  });

  it('setUserLocation updates coordinates', () => {
    const coords = { lat: 40.7128, lng: -74.006 };
    act(() => {
      useLocationStore.getState().setUserLocation(coords);
    });
    expect(useLocationStore.getState().userLocation).toEqual(coords);
  });

  it('loadLocations falls back to mock data on API error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    await act(async () => {
      await useLocationStore.getState().loadLocations();
    });

    const state = useLocationStore.getState();
    expect(state.locations.length).toBeGreaterThan(0);
    expect(state.isLoading).toBe(false);

    vi.restoreAllMocks();
  });
});
