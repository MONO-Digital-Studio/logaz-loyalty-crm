
import { useState, useEffect, useCallback, useMemo } from 'react';
import { monthlySales, loyaltyStats, demographicData, genderData } from '@/data/mockData';
import { useDashboardStore } from '@/stores/dashboardStore';
import { DashboardKPIData, VolumeData, CustomerSegment, LoyaltyMetrics } from '@/types/dashboard';

interface DashboardDataState {
  monthlySales: typeof monthlySales;
  loyaltyStats: typeof loyaltyStats;
  demographicData: typeof demographicData;
  genderData: typeof genderData;
  kpiData: DashboardKPIData;
  volumeData: VolumeData[];
  customerSegments: CustomerSegment[];
  loyaltyMetrics: LoyaltyMetrics;
  performanceMetrics: {
    nps: { current: number; change: number };
    loyaltyConversion: { current: number; change: number };
    refuelingFrequency: { current: number; change: number };
  };
}

// Функции генерации данных на основе фильтров
const generateKPIData = (filters: any): DashboardKPIData => {
  const periodMultiplier = getPeriodMultiplier(filters.period);
  const stationMultiplier = getStationMultiplier(filters.stations);
  
  return {
    totalSales: {
      current: Math.round(2850000 * periodMultiplier * stationMultiplier),
      previous: Math.round(2650000 * periodMultiplier * stationMultiplier),
      change: 7.5
    },
    avgTicket: {
      current: Math.round(1850 * periodMultiplier),
      previous: Math.round(1750 * periodMultiplier),
      change: 5.7
    },
    activeCustomers: {
      current: Math.round(1256 * stationMultiplier),
      previous: Math.round(1180 * stationMultiplier),
      change: 6.4
    },
    totalVolume: {
      current: Math.round(45200 * periodMultiplier * stationMultiplier),
      previous: Math.round(42800 * periodMultiplier * stationMultiplier),
      change: 5.6
    },
    totalCustomers: {
      current: Math.round(2845 * stationMultiplier),
      previous: Math.round(2720 * stationMultiplier),
      change: 4.6
    },
    churnRate: {
      current: 3.2,
      previous: 3.8,
      change: -15.8
    }
  };
};

const generateVolumeData = (filters: any): VolumeData[] => {
  const periodMultiplier = getPeriodMultiplier(filters.period);
  const stationMultiplier = getStationMultiplier(filters.stations);
  
  return [
    {
      fuel: 'Метан',
      period: Math.round(12500 * periodMultiplier * stationMultiplier),
      daily: Math.round(416 * periodMultiplier * stationMultiplier),
      change: 8.5,
      unit: 'м³'
    },
    {
      fuel: 'АИ-92',
      period: Math.round(8200 * periodMultiplier * stationMultiplier),
      daily: Math.round(273 * periodMultiplier * stationMultiplier),
      change: 5.2,
      unit: 'л'
    },
    {
      fuel: 'АИ-95',
      period: Math.round(6800 * periodMultiplier * stationMultiplier),
      daily: Math.round(227 * periodMultiplier * stationMultiplier),
      change: -2.1,
      unit: 'л'
    },
    {
      fuel: 'Пропан',
      period: Math.round(4500 * periodMultiplier * stationMultiplier),
      daily: Math.round(150 * periodMultiplier * stationMultiplier),
      change: 12.3,
      unit: 'л'
    }
  ];
};

const generateCustomerSegments = (filters: any): CustomerSegment[] => {
  const stationMultiplier = getStationMultiplier(filters.stations);
  
  return [
    {
      segment: 'VIP клиенты',
      count: Math.round(420 * stationMultiplier),
      percentage: 15,
      revenue: Math.round(850000 * stationMultiplier)
    },
    {
      segment: 'Активные',
      count: Math.round(1180 * stationMultiplier),
      percentage: 42,
      revenue: Math.round(1200000 * stationMultiplier)
    },
    {
      segment: 'Случайные',
      count: Math.round(785 * stationMultiplier),
      percentage: 28,
      revenue: Math.round(650000 * stationMultiplier)
    },
    {
      segment: 'Спящие',
      count: Math.round(420 * stationMultiplier),
      percentage: 15,
      revenue: Math.round(150000 * stationMultiplier)
    }
  ];
};

const generateLoyaltyMetrics = (filters: any): LoyaltyMetrics => {
  const periodMultiplier = getPeriodMultiplier(filters.period);
  const stationMultiplier = getStationMultiplier(filters.stations);
  
  return {
    pointsEarned: Math.round(125000 * periodMultiplier * stationMultiplier),
    pointsSpent: Math.round(98000 * periodMultiplier * stationMultiplier),
    activePrograms: Math.round(15 * stationMultiplier),
    conversionRate: 42.5
  };
};

const generatePerformanceMetrics = (filters: any) => {
  const periodVariation = getPeriodVariation(filters.period);
  
  return {
    nps: {
      current: 68 + periodVariation,
      change: 5.2
    },
    loyaltyConversion: {
      current: 37.5 + periodVariation * 0.5,
      change: 2.3
    },
    refuelingFrequency: {
      current: 3.2 + periodVariation * 0.1,
      change: 0.5
    }
  };
};

// Вспомогательные функции
const getPeriodMultiplier = (period: string): number => {
  switch (period) {
    case 'day': return 0.03;
    case 'week': return 0.23;
    case 'month': return 1;
    case 'quarter': return 3;
    case 'year': return 12;
    default: return 1;
  }
};

const getStationMultiplier = (stations: string[]): number => {
  if (stations.includes('all') || stations.length === 0) return 1;
  return stations.length * 0.2;
};

const getPeriodVariation = (period: string): number => {
  switch (period) {
    case 'day': return Math.random() * 4 - 2;
    case 'week': return Math.random() * 3 - 1.5;
    case 'month': return Math.random() * 2 - 1;
    case 'quarter': return Math.random() * 1.5 - 0.75;
    case 'year': return Math.random() * 1 - 0.5;
    default: return 0;
  }
};

export const useDashboardData = () => {
  const { filters } = useDashboardStore();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<DashboardDataState>({
    monthlySales: [],
    loyaltyStats: [],
    demographicData: [],
    genderData: [],
    kpiData: generateKPIData(filters),
    volumeData: generateVolumeData(filters),
    customerSegments: generateCustomerSegments(filters),
    loyaltyMetrics: generateLoyaltyMetrics(filters),
    performanceMetrics: generatePerformanceMetrics(filters)
  });

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    
    // Симуляция загрузки данных
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setData({
      monthlySales,
      loyaltyStats,
      demographicData,
      genderData,
      kpiData: generateKPIData(filters),
      volumeData: generateVolumeData(filters),
      customerSegments: generateCustomerSegments(filters),
      loyaltyMetrics: generateLoyaltyMetrics(filters),
      performanceMetrics: generatePerformanceMetrics(filters)
    });
    
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Мемоизация вычисленных значений
  const computedMetrics = useMemo(() => {
    const totalRevenue = data.monthlySales.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = data.monthlySales.length > 0 ? totalRevenue / data.monthlySales.length : 0;
    
    const totalPointsEarned = data.loyaltyStats.reduce((sum, item) => sum + item.pointsEarned, 0);
    const totalPointsSpent = data.loyaltyStats.reduce((sum, item) => sum + item.pointsSpent, 0);
    
    return {
      totalRevenue,
      averageRevenue,
      totalPointsEarned,
      totalPointsSpent,
      pointsBalance: totalPointsEarned - totalPointsSpent,
    };
  }, [data]);

  return {
    data,
    loading,
    computedMetrics,
    refreshData: loadDashboardData,
  };
};
