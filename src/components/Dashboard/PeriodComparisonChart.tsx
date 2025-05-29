
import React from 'react';
import { CardContent } from '@/components/ui/card';
import DashboardComparisonChart from './charts/DashboardComparisonChart';
import { ComparisonType, DashboardChartComparisonData } from '@/types/dashboardComparison';

interface PeriodComparisonChartProps {
  chartData: DashboardChartComparisonData[];
  comparisonType: ComparisonType;
}

const PeriodComparisonChart: React.FC<PeriodComparisonChartProps> = ({
  chartData,
  comparisonType
}) => {
  return (
    <CardContent className="pt-0">
      <DashboardComparisonChart 
        data={chartData} 
        comparisonType={comparisonType} 
      />
    </CardContent>
  );
};

export default PeriodComparisonChart;
