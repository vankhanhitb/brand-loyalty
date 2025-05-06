import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders statistics cards', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('Active Rewards')).toBeInTheDocument();
    expect(screen.getByText('Points Issued')).toBeInTheDocument();
    expect(screen.getByText('Points Redeemed')).toBeInTheDocument();
  });

  it('renders recent customers section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Recent Customers')).toBeInTheDocument();
  });
}); 