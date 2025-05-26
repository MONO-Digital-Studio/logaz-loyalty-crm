
import React, { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';

const OptimizedSalesChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  const chartData = useMemo(() => 
    data.monthlySales.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
    })), [data.monthlySales]
  );

  return (
    <BaseChart title="Динамика продаж">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3B55A2"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedSalesChart.displayName = 'OptimizedSalesChart';

export default OptimizedSalesChart;
