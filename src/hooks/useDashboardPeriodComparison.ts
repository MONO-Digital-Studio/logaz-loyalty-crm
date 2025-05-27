
import { useMemo, useState } from 'react';
import { ComparisonType } from '@/types/periodComparison';
import { DashboardComparisonData, DashboardChartComparisonData } from '@/types/dashboardComparison';
import { calculatePeriodComparison, formatPeriodLabel } from '@/utils/periodCalculations';
import { monthlySales, loyaltyStats, summaryStats } from '@/data/mockData';

export const useDashboardPeriodComparison = () => {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('M/M');

  const comparisonData = useMemo((): DashboardComparisonData | null => {
    if (!monthlySales || monthlySales.length === 0) return null;

    const currentDate = new Date();
    
    // Текущие данные
    const currentRevenue = monthlySales[monthlySales.length - 1]?.revenue || 0;
    const currentPointsEarned = loyaltyStats[loyaltyStats.length - 1]?.pointsEarned || 0;
    const currentPointsSpent = loyaltyStats[loyaltyStats.length - 1]?.pointsSpent || 0;
    const currentTotalClients = summaryStats.totalClients;
    const currentActiveClients = summaryStats.activeClients;
    const currentAverageCheck = summaryStats.averageCheck;
    
    // Генерация текущих данных для новых метрик
    const currentPropaneSales = currentRevenue * 0.35;
    const currentMethaneSales = currentRevenue * 0.15;
    const currentAI92Sales = currentRevenue * 0.30;
    const currentAI95Sales = currentRevenue * 0.20;
    const currentClientChurn = currentTotalClients * 0.05;
    const currentLoyaltyIndex = 7.2;
    const currentLoyaltyConversion = 0.68;
    const currentFuellingFrequency = 4.2;
    
    // Предыдущие данные (мок-данные для сравнения)
    const previousRevenue = currentRevenue * (0.85 + Math.random() * 0.3);
    const previousPointsEarned = currentPointsEarned * (0.9 + Math.random() * 0.2);
    const previousPointsSpent = currentPointsSpent * (0.8 + Math.random() * 0.4);
    const previousTotalClients = currentTotalClients * (0.92 + Math.random() * 0.16);
    const previousActiveClients = currentActiveClients * (0.88 + Math.random() * 0.24);
    const previousAverageCheck = currentAverageCheck * (0.90 + Math.random() * 0.20);
    const previousPropaneSales = currentPropaneSales * (0.88 + Math.random() * 0.24);
    const previousMethaneSales = currentMethaneSales * (0.85 + Math.random() * 0.30);
    const previousAI92Sales = currentAI92Sales * (0.90 + Math.random() * 0.20);
    const previousAI95Sales = currentAI95Sales * (0.87 + Math.random() * 0.26);
    const previousClientChurn = currentClientChurn * (1.1 + Math.random() * 0.2);
    const previousLoyaltyIndex = currentLoyaltyIndex * (0.92 + Math.random() * 0.16);
    const previousLoyaltyConversion = currentLoyaltyConversion * (0.89 + Math.random() * 0.22);
    const previousFuellingFrequency = currentFuellingFrequency * (0.91 + Math.random() * 0.18);

    return {
      type: comparisonType,
      // Финансовые показатели
      revenue: calculatePeriodComparison(
        currentRevenue,
        previousRevenue,
        'revenue',
        currentDate,
        comparisonType
      ),
      averageCheck: calculatePeriodComparison(
        currentAverageCheck,
        previousAverageCheck,
        'averageCheck',
        currentDate,
        comparisonType
      ),
      
      // Показатели реализации топлива
      propaneSales: calculatePeriodComparison(
        currentPropaneSales,
        previousPropaneSales,
        'propaneSales',
        currentDate,
        comparisonType
      ),
      methaneSales: calculatePeriodComparison(
        currentMethaneSales,
        previousMethaneSales,
        'methaneSales',
        currentDate,
        comparisonType
      ),
      ai92Sales: calculatePeriodComparison(
        currentAI92Sales,
        previousAI92Sales,
        'ai92Sales',
        currentDate,
        comparisonType
      ),
      ai95Sales: calculatePeriodComparison(
        currentAI95Sales,
        previousAI95Sales,
        'ai95Sales',
        currentDate,
        comparisonType
      ),
      
      // Клиенты
      totalClients: calculatePeriodComparison(
        currentTotalClients,
        previousTotalClients,
        'totalClients',
        currentDate,
        comparisonType
      ),
      activeClients: calculatePeriodComparison(
        currentActiveClients,
        previousActiveClients,
        'activeClients',
        currentDate,
        comparisonType
      ),
      clientChurn: calculatePeriodComparison(
        currentClientChurn,
        previousClientChurn,
        'clientChurn',
        currentDate,
        comparisonType
      ),
      
      // Лояльность
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
      loyaltyIndex: calculatePeriodComparison(
        currentLoyaltyIndex,
        previousLoyaltyIndex,
        'loyaltyIndex',
        currentDate,
        comparisonType
      ),
      loyaltyConversion: calculatePeriodComparison(
        currentLoyaltyConversion,
        previousLoyaltyConversion,
        'loyaltyConversion',
        currentDate,
        comparisonType
      ),
      fuellingFrequency: calculatePeriodComparison(
        currentFuellingFrequency,
        previousFuellingFrequency,
        'fuellingFrequency',
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
        previousPointsSpent: currentLoyalty.pointsSpent * (0.8 + Math.random() * 0.4),
        currentPropane: current.revenue * 0.35,
        previousPropane: current.revenue * 0.35 * (0.88 + Math.random() * 0.24),
        currentMethane: current.revenue * 0.15,
        previousMethane: current.revenue * 0.15 * (0.85 + Math.random() * 0.30),
        currentAI92: current.revenue * 0.30,
        previousAI92: current.revenue * 0.30 * (0.90 + Math.random() * 0.20),
        currentAI95: current.revenue * 0.20,
        previousAI95: current.revenue * 0.20 * (0.87 + Math.random() * 0.26)
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
