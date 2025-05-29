
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
    // Исправляем расчет для данных демографии - используем percentage вместо count
    const totalCustomers = data.demographicData.reduce((sum, item) => sum + item.percentage, 0);
    const weightedAgeSum = data.demographicData.reduce((sum, item) => {
      const ageValue = parseInt(item.age.replace(/[^\d]/g, '')) || 0; // Извлекаем числовое значение из строки возраста
      return sum + (item.percentage * ageValue);
    }, 0);
    const averageAge = totalCustomers > 0 ? weightedAgeSum / totalCustomers : 0;
    
    return {
      totalCustomers: Math.round(totalCustomers),
      averageAge: Number(averageAge.toFixed(1))
    };
  }, [data.demographicData]);

  return {
    salesMetrics,
    loyaltyMetrics,
    customerMetrics
  };
};
