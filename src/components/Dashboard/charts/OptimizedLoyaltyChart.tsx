
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';

const OptimizedLoyaltyChart: React.FC = memo(() => {
  const { data } = useDashboardData();

  return (
    <BaseChart title="Баллы лояльности">
      <ResponsiveContainer>
        <BarChart data={data.loyaltyStats}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pointsEarned" fill="#3B55A2" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pointsSpent" fill="#FB8607" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pointsExpired" fill="#F44336" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedLoyaltyChart.displayName = 'OptimizedLoyaltyChart';

export default OptimizedLoyaltyChart;
