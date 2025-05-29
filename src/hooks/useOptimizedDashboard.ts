
import { useMemo, useCallback } from 'react';
import { useDashboardData } from './useDashboardData';
import { useDashboardMetrics } from './useDashboardMetrics';

export const useOptimizedDashboard = () => {
  const { data, loading, refreshData } = useDashboardData();
  const { salesMetrics, loyaltyMetrics, customerMetrics } = useDashboardMetrics();

  // Мемоизация для предотвращения лишних рендеров
  const chartData = useMemo(() => ({
    monthlySales: data.monthlySales,
    loyaltyStats: data.loyaltyStats,
    demographicData: data.demographicData,
    genderData: data.genderData,
  }), [data]);

  // Мемоизация агрегированных метрик
  const aggregatedMetrics = useMemo(() => ({
    ...salesMetrics,
    ...loyaltyMetrics,
    ...customerMetrics,
  }), [salesMetrics, loyaltyMetrics, customerMetrics]);

  // Оптимизированная функция обновления данных
  const optimizedRefresh = useCallback(async () => {
    console.log('Refreshing dashboard data...');
    await refreshData();
  }, [refreshData]);

  return {
    data: chartData,
    metrics: aggregatedMetrics,
    loading,
    refreshData: optimizedRefresh,
    isDataReady: !loading && data.monthlySales.length > 0,
  };
};
