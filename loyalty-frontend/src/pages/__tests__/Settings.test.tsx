import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../Settings';

describe('Settings', () => {
  it('renders settings title', () => {
    render(<Settings />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders points settings', () => {
    render(<Settings />);
    expect(screen.getByLabelText('Points per dollar spent')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum points for redemption')).toBeInTheDocument();
    expect(screen.getByLabelText('Points expiry (months)')).toBeInTheDocument();
  });

  it('renders language settings', () => {
    render(<Settings />);
    expect(screen.getByLabelText('Default language')).toBeInTheDocument();
  });

  it('renders feature flags', () => {
    render(<Settings />);
    expect(screen.getByText('Feature Flags')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable birthday rewards')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable referral program')).toBeInTheDocument();
  });

  it('shows success message when saving settings', async () => {
    render(<Settings />);
    
    const saveButton = screen.getByText('Save settings');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Settings saved')).toBeInTheDocument();
    });
  });

  it('updates points per dollar value', () => {
    render(<Settings />);
    
    const pointsInput = screen.getByLabelText('Points per dollar spent');
    fireEvent.change(pointsInput, { target: { value: '2' } });

    expect(pointsInput).toHaveValue('2');
  });

  it('updates minimum points for redemption', () => {
    render(<Settings />);
    
    const minPointsInput = screen.getByLabelText('Minimum points for redemption');
    fireEvent.change(minPointsInput, { target: { value: '200' } });

    expect(minPointsInput).toHaveValue('200');
  });

  it('updates points expiry months', () => {
    render(<Settings />);
    
    const expiryInput = screen.getByLabelText('Points expiry (months)');
    fireEvent.change(expiryInput, { target: { value: '24' } });

    expect(expiryInput).toHaveValue('24');
  });
}); 