
import { ComparisonType, PeriodComparison } from './periodComparison';

export interface DashboardComparisonData {
  type: ComparisonType;
  // Финансовые показатели
  revenue: PeriodComparison;
  averageCheck: PeriodComparison;
  
  // Показатели реализации топлива
  propaneSales: PeriodComparison;
  methaneSales: PeriodComparison;
  ai92Sales: PeriodComparison;
  ai95Sales: PeriodComparison;
  
  // Клиенты
  totalClients: PeriodComparison;
  activeClients: PeriodComparison;
  clientChurn: PeriodComparison;
  
  // Лояльность
  pointsEarned: PeriodComparison;
  pointsSpent: PeriodComparison;
  loyaltyIndex: PeriodComparison;
  loyaltyConversion: PeriodComparison;
  fuellingFrequency: PeriodComparison;
}

export interface DashboardChartComparisonData {
  period: string;
  currentRevenue: number;
  previousRevenue: number;
  currentPointsEarned: number;
  previousPointsEarned: number;
  currentPointsSpent: number;
  previousPointsSpent: number;
  currentPropane: number;
  previousPropane: number;
  currentMethane: number;
  previousMethane: number;
  currentAI92: number;
  previousAI92: number;
  currentAI95: number;
  previousAI95: number;
}

export interface MetricGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: {
    key: keyof DashboardComparisonData;
    title: string;
    icon: React.ReactNode;
    formatter: (value: number) => string;
  }[];
}

export type { ComparisonType };
