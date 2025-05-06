import axios from 'axios';
import { Customer, Reward, Campaign } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const customerService = {
  getCustomers: () => api.get<Customer[]>('/customers'),
  getCustomer: (id: string) => api.get<Customer>(`/customers/${id}`),
  createCustomer: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Customer>('/customers', data),
  updateCustomer: (id: string, data: Partial<Customer>) => 
    api.put<Customer>(`/customers/${id}`, data),
  deleteCustomer: (id: string) => api.delete(`/customers/${id}`),
};

export const rewardService = {
  getRewards: () => api.get<Reward[]>('/rewards'),
  getReward: (id: string) => api.get<Reward>(`/rewards/${id}`),
  createReward: (data: Omit<Reward, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Reward>('/rewards', data),
  updateReward: (id: string, data: Partial<Reward>) => 
    api.put<Reward>(`/rewards/${id}`, data),
  deleteReward: (id: string) => api.delete(`/rewards/${id}`),
};

export const campaignService = {
  getCampaigns: () => api.get<Campaign[]>('/campaigns'),
  getCampaign: (id: string) => api.get<Campaign>(`/campaigns/${id}`),
  createCampaign: (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Campaign>('/campaigns', data),
  updateCampaign: (id: string, data: Partial<Campaign>) => 
    api.put<Campaign>(`/campaigns/${id}`, data),
  deleteCampaign: (id: string) => api.delete(`/campaigns/${id}`),
};

export default api; 