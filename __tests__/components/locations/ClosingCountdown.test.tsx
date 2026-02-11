import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import ClosingCountdown from '../../../src/components/locations/ClosingCountdown';

import type { DayOfWeek, HoursEntry } from '../../../src/types/location';

const mockHours: Record<DayOfWeek, HoursEntry> = {
  monday: { open: '7:00 AM', close: '7:00 PM' },
  tuesday: { open: '7:00 AM', close: '7:00 PM' },
  wednesday: { open: '7:00 AM', close: '7:00 PM' },
  thursday: { open: '7:00 AM', close: '7:00 PM' },
  friday: { open: '7:00 AM', close: '8:00 PM' },
  saturday: { open: '8:00 AM', close: '8:00 PM' },
  sunday: { open: '8:00 AM', close: '6:00 PM' },
};

afterEach(() => {
  vi.useRealTimers();
});

describe('ClosingCountdown', () => {
  it('returns null for closed status', () => {
    const { container } = render(<ClosingCountdown hours={mockHours} status="closed" />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null for closed-temporarily status', () => {
    const { container } = render(
      <ClosingCountdown hours={mockHours} status="closed-temporarily" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows countdown when store is open and close time is in the future', () => {
    // Set time to 6:00 PM on a Monday (1 hour before close)
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 18, 0)); // Monday Jan 5, 6:00 PM

    render(<ClosingCountdown hours={mockHours} status="open" />);
    expect(screen.getByText('Closes in 1h')).toBeInTheDocument();
  });

  it('shows minutes when less than 1 hour to close', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 18, 30)); // Monday Jan 5, 6:30 PM

    render(<ClosingCountdown hours={mockHours} status="open" />);
    expect(screen.getByText('Closes in 30m')).toBeInTheDocument();
  });

  it('shows hours and minutes combined format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 15, 30)); // Monday Jan 5, 3:30 PM

    render(<ClosingCountdown hours={mockHours} status="open" />);
    expect(screen.getByText('Closes in 3h 30m')).toBeInTheDocument();
  });

  it('applies urgent styling when 30 min or less', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 18, 40)); // 20 min before close

    render(<ClosingCountdown hours={mockHours} status="open" />);
    const el = screen.getByText('Closes in 20m');
    expect(el.className).toContain('text-status-closing');
  });

  it('applies normal styling when more than 30 min', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 18, 0)); // 60 min before close

    render(<ClosingCountdown hours={mockHours} status="open" />);
    const el = screen.getByText('Closes in 1h');
    expect(el.className).toContain('text-th-faint');
  });

  it('also shows for closing-soon status', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 5, 18, 45)); // 15 min before close

    render(<ClosingCountdown hours={mockHours} status="closing-soon" />);
    expect(screen.getByText('Closes in 15m')).toBeInTheDocument();
  });
});
