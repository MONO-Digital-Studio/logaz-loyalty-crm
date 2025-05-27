
export interface PeriodComparison {
  currentPeriod: {
    value: number;
    period: string;
  };
  previousPeriod: {
    value: number;
    period: string;
  };
  changePercent: number;
  changeAbsolute: number;
  metric: string;
  isPositiveChange: boolean;
}

export type ComparisonType = 'Y/Y' | 'Q/Q' | 'M/M' | 'W/W' | 'D/D';

export interface ComparisonData {
  type: ComparisonType;
  totalChats: PeriodComparison;
  responseTime: PeriodComparison;
  satisfactionScore: PeriodComparison;
  avgChatDuration: PeriodComparison;
}

export interface ChartComparisonData {
  period: string;
  currentChats: number;
  previousChats: number;
  currentResponseTime: number;
  previousResponseTime: number;
  currentSatisfaction: number;
  previousSatisfaction: number;
}
