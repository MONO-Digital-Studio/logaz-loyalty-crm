
// Форматирование валюты в российских рублях
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value);
};

// Форматирование чисел с разделителями тысяч
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

// Форматирование процентов
export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

// Форматирование дат
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU').format(date);
};

// Форматирование времени
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Форматирование изменений с индикаторами
export const formatChange = (value: number): { text: string; color: string; icon: string } => {
  const isPositive = value > 0;
  const isNeutral = Math.abs(value) < 0.1;
  
  return {
    text: `${isPositive ? '+' : ''}${formatPercent(Math.abs(value))}`,
    color: isNeutral ? 'text-yellow-600' : isPositive ? 'text-green-600' : 'text-red-600',
    icon: isNeutral ? '→' : isPositive ? '↗' : '↘'
  };
};

// Форматирование объема с единицами измерения
export const formatVolume = (value: number, unit: string): string => {
  return `${formatNumber(value)} ${unit}`;
};
