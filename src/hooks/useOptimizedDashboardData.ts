
import { useMemo, useCallback } from 'react';
import { useDashboardData } from './useDashboardData';
import { useStableMemo, useExpensiveComputation } from './useOptimizedMemo';

export const useOptimizedDashboardData = () => {
  const { data, loading, refreshData } = useDashboardData();

  // Мемоизация базовых данных
  const chartData = useStableMemo(() => ({
    monthlySales: data.monthlySales,
    loyaltyStats: data.loyaltyStats,
    demographicData: data.demographicData,
    genderData: data.genderData,
  }), [data]);

  // Дорогие вычисления с оптимизацией
  const aggregatedMetrics = useExpensiveComputation(() => {
    const totalRevenue = data.monthlySales.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = data.monthlySales.length > 0 ? totalRevenue / data.monthlySales.length : 0;
    const growthRate = data.monthlySales.length > 1 
      ? ((data.monthlySales[data.monthlySales.length - 1].revenue - data.monthlySales[0].revenue) / data.monthlySales[0].revenue) * 100
      : 0;

    const totalPointsEarned = data.loyaltyStats.reduce((sum, item) => sum + item.pointsEarned, 0);
    const totalPointsSpent = data.loyaltyStats.reduce((sum, item) => sum + item.pointsSpent, 0);

    return {
      totalRevenue,
      averageRevenue,
      growthRate: Number(growthRate.toFixed(2)),
      totalPointsEarned,
      totalPointsSpent,
      pointsBalance: totalPointsEarned - totalPointsSpent,
      conversionRate: totalPointsEarned > 0 ? Number(((totalPointsSpent / totalPointsEarned) * 100).toFixed(2)) : 0
    };
  }, [data.monthlySales, data.loyaltyStats], !loading);

  // Оптимизированная функция обновления
  const optimizedRefresh = useCallback(async () => {
    console.log('Optimized dashboard refresh starting...');
    const start = performance.now();
    await refreshData();
    const end = performance.now();
    console.log(`Dashboard refresh completed in ${end - start} milliseconds`);
  }, [refreshData]);

  // Статус готовности данных
  const isDataReady = useMemo(() => 
    !loading && data.monthlySales.length > 0 && aggregatedMetrics !== null,
    [loading, data.monthlySales.length, aggregatedMetrics]
  );

  return {
    data: chartData,
    metrics: aggregatedMetrics || {},
    loading,
    refreshData: optimizedRefresh,
    isDataReady,
    performanceData: {
      dataSize: data.monthlySales.length,
      hasComputedMetrics: aggregatedMetrics !== null
    }
  };
};
