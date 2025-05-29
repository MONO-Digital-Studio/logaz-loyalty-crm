
export interface DashboardKPI {
  current: number;
  previous: number;
  change: number;
}

export interface DashboardKPIData {
  totalSales: DashboardKPI;
  avgTicket: DashboardKPI;
  activeCustomers: DashboardKPI;
  totalVolume: DashboardKPI;
  totalCustomers: DashboardKPI;
  churnRate: DashboardKPI;
}

export interface SalesDataPoint {
  day: string;
  methane: number;
  propane: number;
  ai92: number;
  ai95: number;
}

export interface SalesStructureItem {
  name: string;
  value: number;
  percentage: number;
}

export interface AvgTicketDataPoint {
  date: string;
  methane: number;
  propane: number;
  ai92: number;
  ai95: number;
}

export interface CustomerDataPoint {
  date: string;
  total: number;
  active: number;
  new: number;
}

export interface DashboardFilters {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  startDate: string;
  endDate: string;
  stations: string[];
  comparison: 'previous' | 'year_ago' | 'moving_average';
}

export interface VolumeData {
  fuel: string;
  period: number;
  daily: number;
  change: number;
  unit: string;
}

export interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
  revenue: number;
}

export interface LoyaltyMetrics {
  pointsEarned: number;
  pointsSpent: number;
  activePrograms: number;
  conversionRate: number;
}

export interface LoyaltyDataPoint {
  date: string;
  earned: number;
  spent: number;
  balance: number;
}
