import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Badge from '../../../src/components/ui/Badge';

describe('Badge', () => {
  describe('status variant', () => {
    it('renders "Open" with green styling', () => {
      render(<Badge status="open" variant="status" />);
      const badge = screen.getByText('Open');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toContain('text-status-open');
    });

    it('renders "Closing Soon" status', () => {
      render(<Badge status="closing-soon" variant="status" />);
      expect(screen.getByText('Closing Soon')).toBeInTheDocument();
    });

    it('renders "Closed" status', () => {
      render(<Badge status="closed" variant="status" />);
      expect(screen.getByText('Closed')).toBeInTheDocument();
    });

    it('renders "Closed Temporarily" status', () => {
      render(<Badge status="closed-temporarily" variant="status" />);
      expect(screen.getByText('Closed Temporarily')).toBeInTheDocument();
    });

    it('shows green dot for open status', () => {
      const { container } = render(<Badge status="open" variant="status" />);
      const dot = container.querySelector('span span');
      expect(dot).not.toBeNull();
    });
  });

  describe('amenity variant', () => {
    it('renders amenity label', () => {
      render(<Badge amenity="wifi" variant="amenity" />);
      expect(screen.getByText('WiFi')).toBeInTheDocument();
    });

    it('renders outdoor seating label', () => {
      render(<Badge amenity="outdoor-seating" variant="amenity" />);
      expect(screen.getByText('Outdoor Seating')).toBeInTheDocument();
    });
  });
});
