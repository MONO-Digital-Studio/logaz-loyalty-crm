
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  registrationDate: string;
  lastPurchaseDate: string;
  totalPurchases: number;
  loyaltyPoints: number;
  segment: string;
  status: 'active' | 'inactive' | 'new';
}

export interface SalesData {
  date: string;
  revenue: number;
  transactions: number;
}

export interface LoyaltyStats {
  pointsEarned: number;
  pointsSpent: number;
  pointsExpired: number;
  period: string;
}

export interface LocationPerformance {
  id: string;
  name: string;
  sales: number;
  transactions: number;
  averageCheck: number;
  loyaltyUsage: number;
}

export interface DemographicData {
  age: string;
  percentage: number;
}

export interface GenderData {
  gender: 'Мужчины' | 'Женщины';
  percentage: number;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  color?: string;
}

export interface ChartProps {
  data: any[];
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  xKey: string;
  yKey: string;
  height?: number;
}
