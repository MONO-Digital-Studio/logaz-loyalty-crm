
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatChange = (change: number) => {
  const isPositive = change > 0;
  const color = isPositive ? 'text-green-600' : 'text-red-600';
  const icon = isPositive ? '↗' : '↘';
  const text = `${isPositive ? '+' : ''}${change.toFixed(1)}%`;
  
  return { color, icon, text };
};

export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatGrowth = (growth: number): string => {
  const sign = growth > 0 ? '+' : '';
  return `${sign}${growth.toFixed(1)}%`;
};
