
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { CHART_CONFIG, createCustomTooltip } from '../config/chartConfig';

const OptimizedLoyaltyChart: React.FC = memo(() => {
  const { data } = useDashboardData();

  const CustomTooltip = createCustomTooltip();

  return (
    <BaseChart title="Баллы лояльности" subtitle="Заработано, потрачено и сгорело баллов">
      <ResponsiveContainer>
        <BarChart data={data.loyaltyStats} margin={CHART_CONFIG.MARGINS}>
          <CartesianGrid {...CHART_CONFIG.GRID_CONFIG} vertical={false} />
          <XAxis dataKey="period" {...CHART_CONFIG.AXIS_CONFIG} />
          <YAxis {...CHART_CONFIG.AXIS_CONFIG} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="pointsEarned" 
            fill={CHART_CONFIG.COLORS.primary} 
            radius={[4, 4, 0, 0]} 
            name="Заработано"
          />
          <Bar 
            dataKey="pointsSpent" 
            fill={CHART_CONFIG.COLORS.secondary} 
            radius={[4, 4, 0, 0]} 
            name="Потрачено"
          />
          <Bar 
            dataKey="pointsExpired" 
            fill={CHART_CONFIG.COLORS.danger} 
            radius={[4, 4, 0, 0]} 
            name="Сгорело"
          />
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedLoyaltyChart.displayName = 'OptimizedLoyaltyChart';

export default OptimizedLoyaltyChart;
