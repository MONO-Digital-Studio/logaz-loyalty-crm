
import React, { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { CHART_CONFIG, createCustomTooltip } from '../config/chartConfig';
import { formatCurrency } from '@/utils/dashboardFormatters';

const OptimizedSalesChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  const chartData = useMemo(() => 
    data.monthlySales.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
    })), [data.monthlySales]
  );

  const CustomTooltip = createCustomTooltip(formatCurrency);

  return (
    <BaseChart title="Динамика продаж" subtitle="Выручка по периодам">
      <ResponsiveContainer>
        <LineChart data={chartData} margin={CHART_CONFIG.MARGINS}>
          <CartesianGrid {...CHART_CONFIG.GRID_CONFIG} vertical={false} />
          <XAxis dataKey="date" {...CHART_CONFIG.AXIS_CONFIG} />
          <YAxis {...CHART_CONFIG.AXIS_CONFIG} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={CHART_CONFIG.COLORS.primary}
            {...CHART_CONFIG.LINE_CONFIG}
            name="Выручка"
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedSalesChart.displayName = 'OptimizedSalesChart';

export default OptimizedSalesChart;
