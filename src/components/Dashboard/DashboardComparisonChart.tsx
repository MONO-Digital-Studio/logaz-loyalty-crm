
import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { DashboardChartComparisonData, ComparisonType } from '@/types/dashboardComparison';

interface DashboardComparisonChartProps {
  data: DashboardChartComparisonData[];
  comparisonType: ComparisonType;
}

const DashboardComparisonChart: React.FC<DashboardComparisonChartProps> = ({
  data,
  comparisonType
}) => {
  const getComparisonLabel = (type: ComparisonType) => {
    switch (type) {
      case 'D/D': return 'день к дню';
      case 'W/W': return 'неделя к неделе';
      case 'M/M': return 'месяц к месяцу';
      case 'Q/Q': return 'квартал к кварталу';
      case 'Y/Y': return 'год к году';
      default: return 'период к периоду';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-1">Динамика ключевых показателей</h4>
        <p className="text-sm text-gray-600">
          Сравнение {getComparisonLabel(comparisonType)} по выручке и баллам лояльности
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium mb-2">{label}</p>
                    {payload.map((entry, index) => (
                      <p 
                        key={index} 
                        className="text-sm"
                        style={{ color: entry.color }}
                      >
                        {entry.name}: {
                          String(entry.dataKey).includes('Revenue') ? 
                            formatCurrency(Number(entry.value)) : 
                            `${entry.value} баллов`
                        }
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Legend />
          
          {/* Столбчатые диаграммы для выручки */}
          <Bar 
            yAxisId="left"
            dataKey="currentRevenue" 
            name="Выручка (текущий)" 
            fill="#3B55A2" 
            opacity={0.8}
          />
          <Bar 
            yAxisId="left"
            dataKey="previousRevenue" 
            name="Выручка (предыдущий)" 
            fill="#3B55A2" 
            opacity={0.4}
          />
          
          {/* Линии для баллов лояльности */}
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="currentPointsEarned" 
            name="Баллы заработанные (текущий)" 
            stroke="#FB8607" 
            strokeWidth={2}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="previousPointsEarned" 
            name="Баллы заработанные (предыдущий)" 
            stroke="#FB8607" 
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardComparisonChart;
