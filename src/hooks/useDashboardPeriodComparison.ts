
import { useMemo, useState } from 'react';
import { ComparisonType } from '@/types/periodComparison';
import { DashboardComparisonData, DashboardChartComparisonData } from '@/types/dashboardComparison';
import { calculatePeriodComparison, formatPeriodLabel } from '@/utils/periodCalculations';
import { monthlySales, loyaltyStats } from '@/data/mockData';

export const useDashboardPeriodComparison = () => {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('M/M');

  const comparisonData = useMemo((): DashboardComparisonData | null => {
    if (!monthlySales || monthlySales.length === 0) return null;

    const currentDate = new Date();
    
    // Текущие данные (последние в массиве)
    const currentRevenue = monthlySales[monthlySales.length - 1]?.revenue || 0;
    const currentPointsEarned = loyaltyStats[loyaltyStats.length - 1]?.pointsEarned || 0;
    const currentPointsSpent = loyaltyStats[loyaltyStats.length - 1]?.pointsSpent || 0;
    
    // Предыдущие данные (мок-данные для сравнения)
    const previousRevenue = currentRevenue * (0.85 + Math.random() * 0.3);
    const previousPointsEarned = currentPointsEarned * (0.9 + Math.random() * 0.2);
    const previousPointsSpent = currentPointsSpent * (0.8 + Math.random() * 0.4);
    const currentActiveClients = 1256;
    const previousActiveClients = currentActiveClients * (0.92 + Math.random() * 0.16);

    return {
      type: comparisonType,
      revenue: calculatePeriodComparison(
        currentRevenue,
        previousRevenue,
        'revenue',
        currentDate,
        comparisonType
      ),
      pointsEarned: calculatePeriodComparison(
        currentPointsEarned,
        previousPointsEarned,
        'pointsEarned',
        currentDate,
        comparisonType
      ),
      pointsSpent: calculatePeriodComparison(
        currentPointsSpent,
        previousPointsSpent,
        'pointsSpent',
        currentDate,
        comparisonType
      ),
      activeClients: calculatePeriodComparison(
        currentActiveClients,
        previousActiveClients,
        'activeClients',
        currentDate,
        comparisonType
      )
    };
  }, [comparisonType]);

  const chartData = useMemo((): DashboardChartComparisonData[] => {
    if (!monthlySales || monthlySales.length === 0) return [];

    return monthlySales.slice(-6).map((current, index) => {
      const currentLoyalty = loyaltyStats[index] || { pointsEarned: 0, pointsSpent: 0 };
      
      return {
        period: formatPeriodLabel(new Date(current.date), comparisonType),
        currentRevenue: current.revenue,
        previousRevenue: current.revenue * (0.85 + Math.random() * 0.3),
        currentPointsEarned: currentLoyalty.pointsEarned,
        previousPointsEarned: currentLoyalty.pointsEarned * (0.9 + Math.random() * 0.2),
        currentPointsSpent: currentLoyalty.pointsSpent,
        previousPointsSpent: currentLoyalty.pointsSpent * (0.8 + Math.random() * 0.4)
      };
    });
  }, [comparisonType]);

  return {
    comparisonType,
    setComparisonType,
    comparisonData,
    chartData,
    isLoading: false
  };
};
