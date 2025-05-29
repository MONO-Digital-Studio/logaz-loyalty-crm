
import React, { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatCurrency } from '@/utils/dashboardFormatters';

const OptimizedSalesStructureChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  const colors = ['#3B55A2', '#2563EB', '#EAB308', '#DC2626'];
  
  const mockSalesStructure = [
    { name: 'АИ-92', value: 1250000, percentage: 35 },
    { name: 'Метан', value: 980000, percentage: 28 },
    { name: 'АИ-95', value: 750000, percentage: 21 },
    { name: 'Пропан', value: 570000, percentage: 16 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${payload.percentage}%`}
      </text>
    );
  };

  return (
    <BaseChart title="Структура продаж" subtitle="Доли видов топлива" height={480}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={mockSalesStructure}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={160}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {mockSalesStructure.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </BaseChart>
  );
});

OptimizedSalesStructureChart.displayName = 'OptimizedSalesStructureChart';

export default OptimizedSalesStructureChart;
