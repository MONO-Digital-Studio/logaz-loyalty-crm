
import React from 'react';
import { DashboardComparisonData } from '@/types/dashboardComparison';
import DashboardMetricGroup from './DashboardMetricGroup';
import { metricGroups } from './config/metricGroups';

interface PeriodComparisonMetricsProps {
  data: DashboardComparisonData;
}

const PeriodComparisonMetrics: React.FC<PeriodComparisonMetricsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {metricGroups.map((group) => (
        <DashboardMetricGroup
          key={group.title}
          group={group}
          data={data}
        />
      ))}
    </div>
  );
};

export default PeriodComparisonMetrics;
