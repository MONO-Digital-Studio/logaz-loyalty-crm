
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardChartComparisonData, ComparisonType } from '@/types/dashboardComparison';
import { 
  getPeriodLabels, 
  sortDataByPeriod, 
  calculateAllTrends 
} from '@/utils/chartDataUtils';
import ComparisonChartTooltip from './ComparisonChartTooltip';

// Конфигурация графиков
const chartMargins = { top: 20, right: 30, left: 20, bottom: 5 };
const chartHeight = 350;
const axisSettings = { tick: { fontSize: 12 }, interval: 0 };
const chartColors = {
  revenue: { current: '#3B55A2', previous: '#94a3b8', trend: '#1e40af' },
  propane: { current: '#FB8607', previous: '#fed7aa', trend: '#ea580c' },
  methane: { current: '#2563EB', previous: '#93c5fd', trend: '#1d4ed8' },
  ai92: { current: '#EAB308', previous: '#fde047', trend: '#ca8a04' },
  ai95: { current: '#DC2626', previous: '#fca5a5', trend: '#b91c1c' }
};
const barOpacity = { current: 0.8, previous: 0.6 };
const trendLineSettings = { strokeWidth: 2, strokeDasharray: '5 5', dot: false };

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
