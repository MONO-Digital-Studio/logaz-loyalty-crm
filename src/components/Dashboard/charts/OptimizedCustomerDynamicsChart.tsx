
import React, { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber } from '@/utils/dashboardFormatters';

const OptimizedCustomerDynamicsChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  const mockCustomerData = [
    { date: '1', total: 25000, active: 18500, new: 450 },
    { date: '2', total: 25200, active: 18800, new: 380 },
    { date: '3', total: 25400, active: 19100, new: 520 },
    { date: '4', total: 25650, active: 19300, new: 410 },
    { date: '5', total: 25900, active: 19600, new: 480 },
    { date: '6', total: 26150, active: 19850, new: 390 },
    { date: '7', total: 26400, active: 20100, new: 510 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">День {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(Math.round(entry.value))}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <BaseChart title="Динамика клиентской базы" subtitle="Общая и активная база клиентов">
      <ResponsiveContainer>
        <AreaChart data={mockCustomerData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#666"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#666"
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}к`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="total"
            stackId="1"
            stroke="#9CA3AF"
            fill="#9CA3AF"
            fillOpacity={0.3}
            name="Общая база"
          />
          <Area
            type="monotone"
            dataKey="active"
            stackId="2"
            stroke="#059669"
            fill="#059669"
            fillOpacity={0.6}
            name="Активные клиенты"
          />
          <Area
            type="monotone"
            dataKey="new"
            stackId="3"
            stroke="#3B82F6"
            fill="none"
            strokeWidth={2}
            name="Новые клиенты"
          />
        </AreaChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedCustomerDynamicsChart.displayName = 'OptimizedCustomerDynamicsChart';

export default OptimizedCustomerDynamicsChart;
