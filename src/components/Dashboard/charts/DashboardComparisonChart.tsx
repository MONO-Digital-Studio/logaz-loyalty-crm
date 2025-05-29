
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardChartComparisonData, ComparisonType } from '@/types/dashboardComparison';
import { 
  getPeriodLabels, 
  sortDataByPeriod, 
  calculateAllTrends 
} from '@/utils/chartDataUtils';
import ComparisonChartTooltip from './ComparisonChartTooltip';
import { 
  chartMargins, 
  chartHeight, 
  axisSettings, 
  chartColors, 
  barOpacity, 
  trendLineSettings 
} from './chartConfig';

interface DashboardComparisonChartProps {
  data: DashboardChartComparisonData[];
  comparisonType: ComparisonType;
}

const DashboardComparisonChart: React.FC<DashboardComparisonChartProps> = ({
  data,
  comparisonType
}) => {
  const periodLabels = getPeriodLabels(comparisonType);
  const sortedData = sortDataByPeriod(data);
  const dataWithTrends = calculateAllTrends(sortedData);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart data={dataWithTrends} margin={chartMargins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" tick={axisSettings.tick} interval={axisSettings.interval} />
          <YAxis />
          
          <Tooltip content={<ComparisonChartTooltip />} />
          <Legend />
          
          {/* Столбчатые диаграммы для выручки */}
          <Bar 
            dataKey="currentRevenue" 
            name={`Выручка (${periodLabels.current})`} 
            fill={chartColors.revenue.current} 
            opacity={barOpacity.current} 
          />
          <Bar 
            dataKey="previousRevenue" 
            name={`Выручка (${periodLabels.previous})`} 
            fill={chartColors.revenue.previous} 
            opacity={barOpacity.previous} 
          />
          
          {/* Столбчатые диаграммы для топлива */}
          <Bar 
            dataKey="currentPropane" 
            name={`Пропан (${periodLabels.current})`} 
            fill={chartColors.propane.current} 
            opacity={barOpacity.current} 
          />
          <Bar 
            dataKey="currentMethane" 
            name={`Метан (${periodLabels.current})`} 
            fill={chartColors.methane.current} 
            opacity={barOpacity.current} 
          />
          <Bar 
            dataKey="currentAI92" 
            name={`АИ-92 (${periodLabels.current})`} 
            fill={chartColors.ai92.current} 
            opacity={barOpacity.current} 
          />
          <Bar 
            dataKey="currentAI95" 
            name={`АИ-95 (${periodLabels.current})`} 
            fill={chartColors.ai95.current} 
            opacity={barOpacity.current} 
          />
          
          {/* Линии тренда для каждого показателя */}
          <Line 
            type="monotone" 
            dataKey="revenueTrend" 
            name="Тренд выручки" 
            stroke={chartColors.revenue.trend} 
            strokeWidth={trendLineSettings.strokeWidth} 
            strokeDasharray={trendLineSettings.strokeDasharray} 
            dot={trendLineSettings.dot} 
          />
          <Line 
            type="monotone" 
            dataKey="propaneTrend" 
            name="Тренд пропана" 
            stroke={chartColors.propane.trend} 
            strokeWidth={trendLineSettings.strokeWidth} 
            strokeDasharray={trendLineSettings.strokeDasharray} 
            dot={trendLineSettings.dot} 
          />
          <Line 
            type="monotone" 
            dataKey="methaneTrend" 
            name="Тренд метана" 
            stroke={chartColors.methane.trend} 
            strokeWidth={trendLineSettings.strokeWidth} 
            strokeDasharray={trendLineSettings.strokeDasharray} 
            dot={trendLineSettings.dot} 
          />
          <Line 
            type="monotone" 
            dataKey="ai92Trend" 
            name="Тренд АИ-92" 
            stroke={chartColors.ai92.trend} 
            strokeWidth={trendLineSettings.strokeWidth} 
            strokeDasharray={trendLineSettings.strokeDasharray} 
            dot={trendLineSettings.dot} 
          />
          <Line 
            type="monotone" 
            dataKey="ai95Trend" 
            name="Тренд АИ-95" 
            stroke={chartColors.ai95.trend} 
            strokeWidth={trendLineSettings.strokeWidth} 
            strokeDasharray={trendLineSettings.strokeDasharray} 
            dot={trendLineSettings.dot} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardComparisonChart;
