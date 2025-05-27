
import { useMemo, useState } from 'react';
import { ComparisonType, ComparisonData, ChartComparisonData } from '@/types/periodComparison';
import { AnalyticsData } from '@/types/contactCenter';
import { calculatePeriodComparison, generateMockComparisonData, formatPeriodLabel } from '@/utils/periodCalculations';

export const usePeriodComparison = (currentData: AnalyticsData[]) => {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('M/M');

  const comparisonData = useMemo((): ComparisonData | null => {
    if (!currentData || currentData.length === 0) return null;

    const latestData = currentData[currentData.length - 1];
    const previousData = generateMockComparisonData([latestData], comparisonType)[0];
    const currentDate = new Date();

    return {
      type: comparisonType,
      totalChats: calculatePeriodComparison(
        latestData.totalChats,
        previousData.totalChats,
        'totalChats',
        currentDate,
        comparisonType
      ),
      responseTime: calculatePeriodComparison(
        latestData.responseTime,
        previousData.responseTime,
        'responseTime',
        currentDate,
        comparisonType
      ),
      satisfactionScore: calculatePeriodComparison(
        latestData.satisfactionScore,
        previousData.satisfactionScore,
        'satisfactionScore',
        currentDate,
        comparisonType
      ),
      avgChatDuration: calculatePeriodComparison(
        latestData.avgChatDuration,
        previousData.avgChatDuration,
        'avgChatDuration',
        currentDate,
        comparisonType
      )
    };
  }, [currentData, comparisonType]);

  const chartData = useMemo((): ChartComparisonData[] => {
    if (!currentData || currentData.length === 0) return [];

    const previousData = generateMockComparisonData(currentData, comparisonType);

    return currentData.map((current, index) => ({
      period: formatPeriodLabel(current.periodStart, comparisonType),
      currentChats: current.totalChats,
      previousChats: previousData[index]?.totalChats || 0,
      currentResponseTime: current.responseTime,
      previousResponseTime: previousData[index]?.responseTime || 0,
      currentSatisfaction: current.satisfactionScore,
      previousSatisfaction: previousData[index]?.satisfactionScore || 0
    }));
  }, [currentData, comparisonType]);

  return {
    comparisonType,
    setComparisonType,
    comparisonData,
    chartData,
    isLoading: !currentData
  };
};
