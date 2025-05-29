
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BaseChart from './BaseChart';
import { fuelColors } from '@/data/dashboardMockData';

interface VolumeChartData {
  date: string;
  methane: number;
  propane: number;
  ai92: number;
  ai95: number;
}

// Mock данные для графика объемов реализации (за последние 15 дней)
const mockVolumeChartData: VolumeChartData[] = Array.from({ length: 15 }, (_, i) => ({
  date: `${i + 1}`,
  methane: 2600 + Math.random() * 500,
  propane: 42 + Math.random() * 8,
  ai92: 75 + Math.random() * 10,
  ai95: 22 + Math.random() * 4
}));

const VolumeChart: React.FC = () => {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{`День ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)} {
                entry.dataKey === 'methane' ? 'м³' : 'т'
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <BaseChart 
      title="Динамика объемов реализации" 
      subtitle="Ежедневные объемы по видам топлива"
      height={350}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockVolumeChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={customTooltip} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="methane" 
            stroke={fuelColors.methane}
            strokeWidth={2}
            name="Метан (м³)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="propane" 
            stroke={fuelColors.propane}
            strokeWidth={2}
            name="Пропан (т)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="ai92" 
            stroke={fuelColors.ai92}
            strokeWidth={2}
            name="АИ-92 (т)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="ai95" 
            stroke={fuelColors.ai95}
            strokeWidth={2}
            name="АИ-95 (т)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChart>
  );
};

export default VolumeChart;
