
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber } from '@/utils/dashboardFormatters';

const OptimizedCustomerDynamicsChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  const mockCustomerData = [
    { date: '1', total: 25000, active: 18500, new: 450, sleeping: 4200, churned: 180 },
    { date: '2', total: 25200, active: 18800, new: 380, sleeping: 4100, churned: 190 },
    { date: '3', total: 25400, active: 19100, new: 520, sleeping: 3950, churned: 200 },
    { date: '4', total: 25650, active: 19300, new: 410, sleeping: 3800, churned: 210 },
    { date: '5', total: 25900, active: 19600, new: 480, sleeping: 3650, churned: 195 },
    { date: '6', total: 26150, active: 19850, new: 390, sleeping: 3500, churned: 185 },
    { date: '7', total: 26400, active: 20100, new: 510, sleeping: 3350, churned: 175 },
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
        <LineChart data={mockCustomerData}>
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
          <Line
            type="monotone"
            dataKey="total"
            stroke="#9CA3AF"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Общая база"
          />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#059669"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Активные клиенты"
          />
          <Line
            type="monotone"
            dataKey="new"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Новые клиенты"
          />
          <Line
            type="monotone"
            dataKey="sleeping"
            stroke="#F97316"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Спящие клиенты"
          />
          <Line
            type="monotone"
            dataKey="churned"
            stroke="#DC2626"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Ушедшие клиенты"
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedCustomerDynamicsChart.displayName = 'OptimizedCustomerDynamicsChart';

export default OptimizedCustomerDynamicsChart;
