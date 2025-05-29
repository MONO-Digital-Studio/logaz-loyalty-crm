
import { COLOR_PALETTE } from '@/components/Dashboard/constants/dashboardConfig';

export const formatters = {
  currency: (value: number, currency = 'RUB') => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(value);
  },

  number: (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value));
  },

  percent: (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  },

  decimal: (value: number, digits = 1) => {
    return value.toFixed(digits);
  },

  shortNumber: (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}М`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}К`;
    }
    return value.toString();
  }
};

export const getTrendColor = (value: number, isInverted = false) => {
  const isPositive = isInverted ? value < 0 : value > 0;
  return isPositive ? COLOR_PALETTE.success : COLOR_PALETTE.danger;
};

export const calculateTrend = (current: number, previous: number) => {
  if (previous === 0) return { value: 0, isPositive: false };
  
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change),
    isPositive: change > 0
  };
};

export const generateMockData = <T>(
  template: T,
  count: number,
  modifier?: (item: T, index: number) => Partial<T>
): T[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...template,
    ...(modifier ? modifier(template, index) : {})
  }));
};
