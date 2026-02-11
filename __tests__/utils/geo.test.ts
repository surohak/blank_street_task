import { describe, it, expect } from 'vitest';

import {
  getDistance,
  formatDistance,
  estimateWalkingTime,
  sortByDistance,
  filterBySearch,
} from '../../src/utils/geo';

import type { Location } from '../../src/types/location';

const NYC: { lat: number; lng: number } = { lat: 40.7128, lng: -74.006 };
const BROOKLYN: { lat: number; lng: number } = { lat: 40.6782, lng: -73.9442 };
const TIMES_SQ: { lat: number; lng: number } = { lat: 40.758, lng: -73.9855 };

// --- getDistance ---
describe('getDistance', () => {
  it('returns 0 for same coordinates', () => {
    expect(getDistance(NYC, NYC)).toBe(0);
  });

  it('calculates distance between NYC and Brooklyn (~3-5 mi)', () => {
    const d = getDistance(NYC, BROOKLYN);
    expect(d).toBeGreaterThan(3);
    expect(d).toBeLessThan(5);
  });

  it('is symmetric (a→b equals b→a)', () => {
    expect(getDistance(NYC, BROOKLYN)).toBeCloseTo(getDistance(BROOKLYN, NYC), 10);
  });
});

// --- formatDistance ---
describe('formatDistance', () => {
  it('shows "< 0.1 mi" for very short distances', () => {
    expect(formatDistance(0.05)).toBe('< 0.1 mi');
  });

  it('formats to one decimal place', () => {
    expect(formatDistance(1.234)).toBe('1.2 mi');
  });

  it('handles exact values', () => {
    expect(formatDistance(2.0)).toBe('2.0 mi');
  });
});

// --- estimateWalkingTime ---
describe('estimateWalkingTime', () => {
  it('shows "< 1 min walk" for very short distances', () => {
    expect(estimateWalkingTime(0.01)).toBe('< 1 min walk');
  });

  it('shows minutes for short distances', () => {
    const result = estimateWalkingTime(0.5);
    expect(result).toMatch(/^\d+ min walk$/);
  });

  it('shows hours for long distances', () => {
    const result = estimateWalkingTime(5);
    expect(result).toMatch(/hr/);
  });
});

// --- sortByDistance ---
describe('sortByDistance', () => {
  const makeLocation = (id: string, lat: number, lng: number): Location => ({
    id,
    name: id,
    address: '',
    zipCode: '10001',
    coordinates: { lat, lng },
    hours: {} as Location['hours'],
    amenities: [],
    status: 'open',
    image: '',
  });

  it('sorts locations nearest first', () => {
    const locations = [
      makeLocation('far', BROOKLYN.lat, BROOKLYN.lng),
      makeLocation('near', TIMES_SQ.lat, TIMES_SQ.lng),
    ];
    const sorted = sortByDistance(locations, NYC);
    expect(sorted[0].id).toBe('near');
    expect(sorted[1].id).toBe('far');
  });

  it('does not mutate the original array', () => {
    const locations = [
      makeLocation('a', BROOKLYN.lat, BROOKLYN.lng),
      makeLocation('b', TIMES_SQ.lat, TIMES_SQ.lng),
    ];
    const sorted = sortByDistance(locations, NYC);
    expect(sorted).not.toBe(locations);
  });
});

// --- filterBySearch ---
describe('filterBySearch', () => {
  const makeLocation = (name: string, address: string, zip: string): Location => ({
    id: name,
    name,
    address,
    zipCode: zip,
    coordinates: { lat: 0, lng: 0 },
    hours: {} as Location['hours'],
    amenities: [],
    status: 'open',
    image: '',
  });

  const locations = [
    makeLocation('Tribeca', '123 Broadway', '10007'),
    makeLocation('Union Square', '456 Park Ave', '10003'),
    makeLocation('Williamsburg', '789 Bedford St', '11249'),
  ];

  it('returns all locations for empty query', () => {
    expect(filterBySearch(locations, '')).toHaveLength(3);
  });

  it('filters by name', () => {
    const result = filterBySearch(locations, 'tribeca');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tribeca');
  });

  it('filters by address', () => {
    const result = filterBySearch(locations, 'broadway');
    expect(result).toHaveLength(1);
  });

  it('filters by zip code', () => {
    const result = filterBySearch(locations, '11249');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Williamsburg');
  });

  it('normalizes abbreviations (st → street)', () => {
    const result = filterBySearch(locations, 'Bedford Street');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Williamsburg');
  });

  it('normalizes abbreviations (ave → avenue)', () => {
    const result = filterBySearch(locations, 'Park Avenue');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Union Square');
  });

  it('is case insensitive', () => {
    expect(filterBySearch(locations, 'TRIBECA')).toHaveLength(1);
  });

  it('returns empty for no matches', () => {
    expect(filterBySearch(locations, 'starbucks')).toHaveLength(0);
  });
});
