
import React from 'react';
import { Card } from '@/components/ui/card';
import { useDashboardPeriodComparison } from '@/hooks/useDashboardPeriodComparison';
import PeriodComparisonHeader from './PeriodComparisonHeader';
import PeriodComparisonChart from './PeriodComparisonChart';
import PeriodComparisonMetrics from './PeriodComparisonMetrics';

const DashboardPeriodComparison: React.FC = () => {
  const { 
    comparisonType, 
    setComparisonType, 
    comparisonData, 
    chartData, 
    isLoading 
  } = useDashboardPeriodComparison();

  if (isLoading || !comparisonData) {
    return (
      <Card className="stats-card">
        <div className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Загрузка данных сравнения...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <PeriodComparisonHeader 
          comparisonType={comparisonType}
          onComparisonTypeChange={setComparisonType}
        />
        <PeriodComparisonChart 
          chartData={chartData}
          comparisonType={comparisonType}
        />
      </div>
      
      <PeriodComparisonMetrics data={comparisonData} />
    </div>
  );
};

export default DashboardPeriodComparison;
