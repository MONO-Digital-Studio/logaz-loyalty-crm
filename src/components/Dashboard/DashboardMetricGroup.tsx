
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PeriodComparisonCard from '@/components/ContactCenter/PeriodComparisonCard';
import { MetricGroup, DashboardComparisonData } from '@/types/dashboardComparison';

interface DashboardMetricGroupProps {
  group: MetricGroup;
  data: DashboardComparisonData;
}

const DashboardMetricGroup: React.FC<DashboardMetricGroupProps> = ({ group, data }) => {
  return (
    <Card className="stats-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {group.icon()}
          <div>
            <CardTitle className="text-lg font-semibold font-montserrat">
              {group.title}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {group.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {group.metrics.map((metric) => (
            <PeriodComparisonCard
              key={metric.key}
              data={data[metric.key]}
              title={metric.title}
              icon={metric.icon()}
              formatter={metric.formatter}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricGroup;
