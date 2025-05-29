
import { useMemo } from 'react';
import { useDashboardData } from './useDashboardData';

export const useDashboardMetrics = () => {
  const { data } = useDashboardData();

  const salesMetrics = useMemo(() => {
    const totalRevenue = data.monthlySales.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = data.monthlySales.length > 0 ? totalRevenue / data.monthlySales.length : 0;
    const growthRate = data.monthlySales.length > 1 
      ? ((data.monthlySales[data.monthlySales.length - 1].revenue - data.monthlySales[0].revenue) / data.monthlySales[0].revenue) * 100
      : 0;

    return {
      totalRevenue,
      averageRevenue,
      growthRate: Number(growthRate.toFixed(2))
    };
  }, [data.monthlySales]);

  const loyaltyMetrics = useMemo(() => {
    const totalPointsEarned = data.loyaltyStats.reduce((sum, item) => sum + item.pointsEarned, 0);
    const totalPointsSpent = data.loyaltyStats.reduce((sum, item) => sum + item.pointsSpent, 0);
    const pointsBalance = totalPointsEarned - totalPointsSpent;
    const conversionRate = totalPointsEarned > 0 ? (totalPointsSpent / totalPointsEarned) * 100 : 0;

    return {
      totalPointsEarned,
      totalPointsSpent,
      pointsBalance,
      conversionRate: Number(conversionRate.toFixed(2))
    };
  }, [data.loyaltyStats]);

  const customerMetrics = useMemo(() => {
    const totalCustomers = data.demographicData.reduce((sum, item) => sum + item.count, 0);
    const averageAge = data.demographicData.reduce((sum, item) => sum + (item.count * parseInt(item.age)), 0) / totalCustomers;
    
    return {
      totalCustomers,
      averageAge: Number(averageAge.toFixed(1))
    };
  }, [data.demographicData]);

  return {
    salesMetrics,
    loyaltyMetrics,
    customerMetrics
  };
};
