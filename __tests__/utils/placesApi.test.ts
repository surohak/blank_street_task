import { describe, it, expect, vi, beforeEach } from 'vitest';

import { fetchBlankStreetLocations } from '../../src/utils/placesApi';

const mockPlace = {
  id: 'place-1',
  displayName: { text: 'Blank Street Tribeca' },
  formattedAddress: '123 Broadway, New York, NY 10007',
  location: { latitude: 40.7128, longitude: -74.006 },
  currentOpeningHours: {
    openNow: true,
    periods: [
      {
        open: { day: 1, hour: 7, minute: 0 },
        close: { day: 1, hour: 19, minute: 0 },
      },
    ],
  },
  photos: [{ name: 'places/photo-1/photos/abc123' }],
  businessStatus: 'OPERATIONAL',
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('fetchBlankStreetLocations', () => {
  it('maps API response to Location objects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ places: [mockPlace] }),
      }),
    );

    const locations = await fetchBlankStreetLocations();

    expect(locations).toHaveLength(1);
    expect(locations[0]).toMatchObject({
      id: 'place-1',
      name: 'Blank Street Tribeca',
      address: '123 Broadway, New York, NY 10007',
      zipCode: '10007',
      coordinates: { lat: 40.7128, lng: -74.006 },
      status: 'open',
    });
  });

  it('uses fallback image when no photos available', async () => {
    const placeNoPhoto = { ...mockPlace, photos: undefined };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ places: [placeNoPhoto] }),
      }),
    );

    const locations = await fetchBlankStreetLocations();
    expect(locations[0].image).toContain('unsplash.com');
  });

  it('throws on API error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
      }),
    );

    await expect(fetchBlankStreetLocations()).rejects.toThrow('Places API error: 403');
  });

  it('returns empty array when no places found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ places: [] }),
      }),
    );

    const locations = await fetchBlankStreetLocations();
    expect(locations).toHaveLength(0);
  });

  it('detects closed-temporarily status', async () => {
    const closedPlace = { ...mockPlace, businessStatus: 'CLOSED_TEMPORARILY' };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ places: [closedPlace] }),
      }),
    );

    const locations = await fetchBlankStreetLocations();
    expect(locations[0].status).toBe('closed-temporarily');
  });
});
