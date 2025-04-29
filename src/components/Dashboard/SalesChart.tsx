
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { monthlySales } from '@/data/mockData';

const SalesChart: React.FC = () => {
  return (
    <div className="stats-card p-6">
      <h3 className="text-lg font-semibold mb-4 font-montserrat">Динамика продаж</h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={monthlySales.map(item => ({
            ...item,
            date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
          }))}>
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
      </div>
    </div>
  );
};

export default SalesChart;
