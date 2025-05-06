export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  points: number;
  tier: CustomerTier;
  createdAt: string;
  updatedAt: string;
}

export enum CustomerTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: RewardType;
  status: RewardStatus;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export enum RewardType {
  DISCOUNT = 'DISCOUNT',
  FREE_PRODUCT = 'FREE_PRODUCT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  CASHBACK = 'CASHBACK',
}

export enum RewardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  rules: CampaignRule[];
  createdAt: string;
  updatedAt: string;
}

export enum CampaignType {
  POINTS_MULTIPLIER = 'POINTS_MULTIPLIER',
  BIRTHDAY_REWARD = 'BIRTHDAY_REWARD',
  REFERRAL = 'REFERRAL',
  CUSTOM = 'CUSTOM',
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
}

export interface CampaignRule {
  type: string;
  value: number | string;
  conditions?: Record<string, any>;
} 