import { 
  DashboardKPIData, 
  SalesDataPoint, 
  SalesStructureItem, 
  AvgTicketDataPoint, 
  CustomerDataPoint,
  VolumeData,
  CustomerSegment,
  LoyaltyMetrics,
  LoyaltyDataPoint
} from '@/types/dashboard';

export const mockKPIData: DashboardKPIData = {
  totalSales: {
    current: 2847650,
    previous: 2534780,
    change: 12.3
  },
  avgTicket: {
    current: 1250,
    previous: 1180,
    change: 5.9
  },
  activeCustomers: {
    current: 1847,
    previous: 1723,
    change: 7.2
  },
  totalVolume: {
    current: 45678,
    previous: 42450,
    change: 7.6
  },
  totalCustomers: {
    current: 3245,
    previous: 3120,
    change: 4.0
  },
  churnRate: {
    current: 3.2,
    previous: 4.1,
    change: -21.9
  }
};

export const mockSalesData: SalesDataPoint[] = [
  { day: 'Пн', methane: 120000, propane: 80000, ai92: 200000, ai95: 90000 },
  { day: 'Вт', methane: 135000, propane: 85000, ai92: 210000, ai95: 95000 },
  { day: 'Ср', methane: 128000, propane: 82000, ai92: 205000, ai95: 92000 },
  { day: 'Чт', methane: 142000, propane: 88000, ai92: 215000, ai95: 98000 },
  { day: 'Пт', methane: 155000, propane: 92000, ai92: 225000, ai95: 102000 },
  { day: 'Сб', methane: 175000, propane: 98000, ai92: 240000, ai95: 108000 },
  { day: 'Вс', methane: 165000, propane: 95000, ai92: 235000, ai95: 105000 }
];

export const mockSalesStructure: SalesStructureItem[] = [
  { name: 'АИ-92', value: 1470000, percentage: 39.7 },
  { name: 'Метан', value: 945000, percentage: 25.5 },
  { name: 'АИ-95', value: 675000, percentage: 18.2 },
  { name: 'Пропан', value: 610000, percentage: 16.5 }
];

export const mockAvgTicketData: AvgTicketDataPoint[] = Array.from({ length: 15 }, (_, i) => ({
  date: `${i + 1}`,
  methane: 850 + Math.random() * 200,
  propane: 1200 + Math.random() * 400,
  ai92: 980 + Math.random() * 350,
  ai95: 1450 + Math.random() * 350
}));

export const mockCustomerData: CustomerDataPoint[] = Array.from({ length: 15 }, (_, i) => ({
  date: `${i + 1}`,
  total: 15180 + i * 15 + Math.random() * 30,
  active: 8850 + i * 10 + Math.random() * 40,
  new: 30 + Math.random() * 60
}));

export const mockVolumeData: VolumeData[] = [
  { fuel: 'Метан', period: 2847, daily: 142.4, change: 8.5, unit: 'м³' },
  { fuel: 'Пропан', period: 45.6, daily: 2.28, change: 12.1, unit: 'т' },
  { fuel: 'АИ-92', period: 78.2, daily: 3.91, change: 3.7, unit: 'т' },
  { fuel: 'АИ-95', period: 23.1, daily: 1.16, change: -1.2, unit: 'т' }
];

export const mockCustomerSegments: CustomerSegment[] = [
  { segment: 'VIP клиенты', count: 156, percentage: 12.6, revenue: 892000 },
  { segment: 'Постоянные', count: 487, percentage: 39.5, revenue: 1245000 },
  { segment: 'Обычные', count: 591, percentage: 47.9, revenue: 319000 }
];

export const mockLoyaltyMetrics: LoyaltyMetrics = {
  pointsEarned: 125670,
  pointsSpent: 89340,
  activePrograms: 234,
  conversionRate: 71.2
};

export const mockLoyaltyData: LoyaltyDataPoint[] = Array.from({ length: 15 }, (_, i) => ({
  date: `${i + 1}`,
  earned: 8000 + Math.random() * 4000,
  spent: 6000 + Math.random() * 3000,
  balance: 36000 + i * 500 + Math.random() * 1000
}));

export const stationOptions = [
  { value: 'all', label: 'Все станции' },
  { value: 'station1', label: 'АГЗС №1' },
  { value: 'station2', label: 'АГЗС №2' },
  { value: 'station3', label: 'АГЗС №3' },
  { value: 'station4', label: 'АГЗС №4' },
  { value: 'station5', label: 'АГЗС №5' }
];

export const periodOptions = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'year', label: 'Год' },
  { value: 'custom', label: 'Произвольный' }
];

export const comparisonOptions = [
  { value: 'previous', label: 'Предыдущий период' },
  { value: 'year_ago', label: 'Прошлый год' },
  { value: 'moving_average', label: 'Скользящее среднее' }
];

// Цвета для графиков топлива
export const fuelColors = {
  methane: '#3b82f6',
  propane: '#f97316',
  ai92: '#059669',
  ai95: '#dc2626'
};
