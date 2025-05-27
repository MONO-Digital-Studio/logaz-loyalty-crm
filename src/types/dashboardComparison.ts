
import { ComparisonType, PeriodComparison } from './periodComparison';

export interface DashboardComparisonData {
  type: ComparisonType;
  revenue: PeriodComparison;
  pointsEarned: PeriodComparison;
  pointsSpent: PeriodComparison;
  activeClients: PeriodComparison;
}

export interface DashboardChartComparisonData {
  period: string;
  currentRevenue: number;
  previousRevenue: number;
  currentPointsEarned: number;
  previousPointsEarned: number;
  currentPointsSpent: number;
  previousPointsSpent: number;
}

export type { ComparisonType };
