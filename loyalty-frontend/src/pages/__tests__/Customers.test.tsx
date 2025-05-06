import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { customerService } from '../../services/api';
import Customers from '../Customers';

// Mock the API service
jest.mock('../../services/api', () => ({
  customerService: {
    getCustomers: jest.fn(),
    createCustomer: jest.fn(),
    updateCustomer: jest.fn(),
    deleteCustomer: jest.fn(),
  },
}));

describe('Customers', () => {
  const mockCustomers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      points: 500,
      tier: 'BRONZE',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  beforeEach(() => {
    (customerService.getCustomers as jest.Mock).mockResolvedValue({ data: mockCustomers });
  });

  it('renders customers list', async () => {
    render(<Customers />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Points: 500')).toBeInTheDocument();
      expect(screen.getByText('Tier: BRONZE')).toBeInTheDocument();
    });
  });

  it('opens add customer modal', async () => {
    render(<Customers />);
    
    const addButton = screen.getByText('Add customer');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add Customer')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
  });

  it('creates a new customer', async () => {
    (customerService.createCustomer as jest.Mock).mockResolvedValue({ data: mockCustomers[0] });
    
    render(<Customers />);
    
    // Open modal
    const addButton = screen.getByText('Add customer');
    fireEvent.click(addButton);

    // Fill form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });

    // Submit form
    const submitButton = screen.getByText('Add');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(customerService.createCustomer).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        tier: 'BRONZE',
      });
    });
  });
}); 