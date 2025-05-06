import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rewardService } from '../../services/api';
import Rewards from '../Rewards';
import { RewardType, RewardStatus } from '../../types';

// Mock the API service
jest.mock('../../services/api', () => ({
  rewardService: {
    getRewards: jest.fn(),
    createReward: jest.fn(),
    updateReward: jest.fn(),
    deleteReward: jest.fn(),
  },
}));

describe('Rewards', () => {
  const mockRewards = [
    {
      id: '1',
      name: '10% Discount',
      description: 'Get 10% off your next purchase',
      pointsCost: 1000,
      type: RewardType.DISCOUNT,
      status: RewardStatus.ACTIVE,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  beforeEach(() => {
    (rewardService.getRewards as jest.Mock).mockResolvedValue({ data: mockRewards });
  });

  it('renders rewards list', async () => {
    render(<Rewards />);
    
    await waitFor(() => {
      expect(screen.getByText('10% Discount')).toBeInTheDocument();
      expect(screen.getByText('Get 10% off your next purchase')).toBeInTheDocument();
      expect(screen.getByText('Points Cost: 1000')).toBeInTheDocument();
      expect(screen.getByText('Type: DISCOUNT')).toBeInTheDocument();
      expect(screen.getByText('Status: ACTIVE')).toBeInTheDocument();
    });
  });

  it('opens add reward modal', async () => {
    render(<Rewards />);
    
    const addButton = screen.getByText('Add reward');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add Reward')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Points Cost')).toBeInTheDocument();
    });
  });

  it('creates a new reward', async () => {
    (rewardService.createReward as jest.Mock).mockResolvedValue({ data: mockRewards[0] });
    
    render(<Rewards />);
    
    // Open modal
    const addButton = screen.getByText('Add reward');
    fireEvent.click(addButton);

    // Fill form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '10% Discount' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Get 10% off your next purchase' } });
    fireEvent.change(screen.getByLabelText('Points Cost'), { target: { value: '1000' } });

    // Submit form
    const submitButton = screen.getByText('Add');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(rewardService.createReward).toHaveBeenCalledWith({
        name: '10% Discount',
        description: 'Get 10% off your next purchase',
        pointsCost: 1000,
        type: RewardType.DISCOUNT,
        status: RewardStatus.ACTIVE,
      });
    });
  });
}); 