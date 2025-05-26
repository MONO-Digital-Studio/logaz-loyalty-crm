
import { useState, useEffect, useCallback, useMemo } from 'react';
import { monthlySales, loyaltyStats, demographicData, genderData } from '@/data/mockData';

interface DashboardDataState {
  monthlySales: typeof monthlySales;
  loyaltyStats: typeof loyaltyStats;
  demographicData: typeof demographicData;
  genderData: typeof genderData;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardDataState>({
    monthlySales: [],
    loyaltyStats: [],
    demographicData: [],
    genderData: [],
  });

  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    
    // Симуляция загрузки данных
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setData({
      monthlySales,
      loyaltyStats,
      demographicData,
      genderData,
    });
    
    setLoading(false);
  }, []);

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
