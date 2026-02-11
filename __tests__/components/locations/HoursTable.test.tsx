import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HoursTable from '../../../src/components/locations/HoursTable';

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

describe('HoursTable', () => {
  it('renders all 7 days', () => {
    render(<HoursTable hours={mockHours} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
  });

  it('renders the "Hours" heading', () => {
    render(<HoursTable hours={mockHours} />);
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });

  it('displays open and close times', () => {
    render(<HoursTable hours={mockHours} />);
    // Monday times
    const mondayRow = screen.getByText('Monday').closest('div');
    expect(mondayRow?.textContent).toContain('7:00 AM');
    expect(mondayRow?.textContent).toContain('7:00 PM');
  });

  it('shows different times for weekend', () => {
    render(<HoursTable hours={mockHours} />);
    const sundayRow = screen.getByText('Sunday').closest('div');
    expect(sundayRow?.textContent).toContain('8:00 AM');
    expect(sundayRow?.textContent).toContain('6:00 PM');
  });
});
