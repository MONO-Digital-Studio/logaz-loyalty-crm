
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber } from '@/utils/dashboardFormatters';

const OptimizedCustomerDynamicsChart: React.FC = memo(() => {
  const { data } = useDashboardData();
  
  // Генерируем данные за последние 7 дней с реальными датами
  const generateDateData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0], // Формат YYYY-MM-DD
        displayDate: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }), // Формат DD.MM для отображения
        total: 25000 + (6 - i) * 66 + Math.floor(Math.random() * 100),
        active: 18500 + (6 - i) * 50 + Math.floor(Math.random() * 80),
        new: 380 + Math.floor(Math.random() * 140),
        sleeping: 4200 - (6 - i) * 25 + Math.floor(Math.random() * 50),
        churned: 175 + Math.floor(Math.random() * 35)
      });
    }
    
    return data;
  };

  const mockCustomerData = generateDateData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Найдем полную дату для отображения в tooltip
      const dataPoint = mockCustomerData.find(item => item.date === label);
      const displayDate = dataPoint ? dataPoint.displayDate : label;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{displayDate}</p>
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
            tickFormatter={(value) => {
              // Форматируем дату для отображения на оси X
              const date = new Date(value);
              return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            }}
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
