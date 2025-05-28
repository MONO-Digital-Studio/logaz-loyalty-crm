import { format, subDays, subWeeks, subMonths, subQuarters, subYears, startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ComparisonType, PeriodComparison } from '@/types/periodComparison';
import { AnalyticsData } from '@/types/contactCenter';

export const getPreviousPeriodDate = (date: Date, type: ComparisonType): Date => {
  const currentDate = new Date(date);
  
  switch (type) {
    case 'D/D':
      return subDays(currentDate, 1);
    case 'W/W':
      return subWeeks(currentDate, 1);
    case 'M/M':
      return subMonths(currentDate, 1);
    case 'Q/Q':
      return subQuarters(currentDate, 1);
    case 'Y/Y':
      return subYears(currentDate, 1);
    default:
      return subMonths(currentDate, 1);
  }
};

export const formatPeriodLabel = (date: Date, type: ComparisonType): string => {
  const previousDate = getPreviousPeriodDate(date, type);
  
  switch (type) {
    case 'D/D':
      return format(date, 'dd.MM.yyyy', { locale: ru });
    case 'W/W':
      const weekNumber = Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      return `Неделя ${weekNumber}, ${date.getFullYear()}`;
    case 'M/M':
      const currentMonth = format(date, 'LLL', { locale: ru }).toLowerCase();
      const currentYear = format(date, 'yy');
      const previousMonth = format(previousDate, 'LLL', { locale: ru }).toLowerCase();
      const previousYear = format(previousDate, 'yy');
      return `${currentMonth}${currentYear} к ${previousMonth}${previousYear}`;
    case 'Q/Q':
      const currentQuarter = Math.ceil((date.getMonth() + 1) / 3);
      const currentQYear = format(date, 'yy');
      const previousQuarter = Math.ceil((previousDate.getMonth() + 1) / 3);
      const previousQYear = format(previousDate, 'yy');
      return `${currentQuarter}кв.${currentQYear} к ${previousQuarter}кв.${previousQYear}`;
    case 'Y/Y':
      const currentFullYear = format(date, 'yy');
      const previousFullYear = format(previousDate, 'yy');
      return `${currentFullYear} к ${previousFullYear}`;
    default:
      return format(date, 'LLL yyyy', { locale: ru });
  }
};

export const calculatePeriodComparison = (
  currentValue: number,
  previousValue: number,
  metricName: string,
  currentDate: Date,
  type: ComparisonType
): PeriodComparison => {
  const previousDate = getPreviousPeriodDate(currentDate, type);
  const changeAbsolute = currentValue - previousValue;
  const changePercent = previousValue !== 0 ? (changeAbsolute / previousValue) * 100 : 0;
  
  // Для времени ответа, меньше = лучше
  const isPositiveChange = metricName === 'responseTime' ? changeAbsolute < 0 : changeAbsolute > 0;
  
  return {
    currentPeriod: {
      value: currentValue,
      period: formatPeriodLabel(currentDate, type)
    },
    previousPeriod: {
      value: previousValue,
      period: formatPeriodLabel(previousDate, type)
    },
    changePercent: Math.abs(changePercent),
    changeAbsolute: Math.abs(changeAbsolute),
    metric: metricName,
    isPositiveChange
  };
};

export const generateMockComparisonData = (currentData: AnalyticsData[], type: ComparisonType) => {
  // Генерируем моковые данные для предыдущего периода
  return currentData.map(item => ({
    ...item,
    totalChats: Math.floor(item.totalChats * (0.85 + Math.random() * 0.3)),
    responseTime: Math.floor(item.responseTime * (0.9 + Math.random() * 0.2)),
    satisfactionScore: Number((item.satisfactionScore * (0.95 + Math.random() * 0.1)).toFixed(1)),
    avgChatDuration: Number((item.avgChatDuration * (0.9 + Math.random() * 0.2)).toFixed(1))
  }));
};
