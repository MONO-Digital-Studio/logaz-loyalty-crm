
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatCurrency } from '@/utils/dashboardFormatters';

const OptimizedAvgTicketChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  const mockAvgTicketData = [
    { date: '1', methane: 1200, propane: 850, ai92: 2200, ai95: 2800 },
    { date: '2', methane: 1180, propane: 890, ai92: 2150, ai95: 2750 },
    { date: '3', methane: 1250, propane: 920, ai92: 2300, ai95: 2900 },
    { date: '4', methane: 1300, propane: 880, ai92: 2250, ai95: 2850 },
    { date: '5', methane: 1150, propane: 950, ai92: 2400, ai95: 3000 },
    { date: '6', methane: 1220, propane: 870, ai92: 2180, ai95: 2720 },
    { date: '7', methane: 1280, propane: 910, ai92: 2350, ai95: 2950 },
  ];

  const fuelColors = {
    methane: '#2563EB',
    propane: '#FB8607',
    ai92: '#EAB308',
    ai95: '#DC2626'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">День {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <BaseChart title="Динамика среднего чека" subtitle="Тренды по видам топлива">
      <ResponsiveContainer>
        <LineChart data={mockAvgTicketData}>
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
            dataKey="methane" 
            stroke={fuelColors.methane} 
            strokeWidth={2}
            name="Метан"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="propane" 
            stroke={fuelColors.propane} 
            strokeWidth={2}
            name="Пропан"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="ai92" 
            stroke={fuelColors.ai92} 
            strokeWidth={2}
            name="АИ-92"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="ai95" 
            stroke={fuelColors.ai95} 
            strokeWidth={2}
            name="АИ-95"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedAvgTicketChart.displayName = 'OptimizedAvgTicketChart';

export default OptimizedAvgTicketChart;
