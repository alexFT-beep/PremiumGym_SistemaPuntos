export type UserTier = 'Bronce' | 'Plata' | 'Oro' | 'Élite';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  points: number;
  totalEarned: number;
  totalSpent: number;
  tier: UserTier;
  visitsCount: number;
  joinDate: string;
  rank: number;
  lastVisitDate: string | null;
  isDemoAccount?: boolean;
}

export type TransactionType = 'visit' | 'renewal' | 'reward' | 'bonus';

export interface PointTransaction {
  id: string;
  date: string;
  time: string;
  description: string;
  points: number; // positive for earned, negative for spent
  type: TransactionType;
  category: string;
  balanceAfter: number;
}

export type RewardCategory = 'descuento' | 'producto';

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: RewardCategory;
  badge: string;
  image: string;
  stock: number;
  isPopular?: boolean;
}

export interface Visit {
  id: string;
  date: string;
  time: string;
  location: string;
  pointsEarned: number;
  status: 'valid' | 'invalid';
}

export interface TierConfig {
  name: UserTier;
  minPoints: number;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  perks: string[];
  description: string;
  iconName: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'mis-puntos'
  | 'historial'
  | 'recompensas'
  | 'ranking'
  | 'niveles'
  | 'visitas'
  | 'perfil';
