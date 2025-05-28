
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

  // Вычисляем линию тренда для выручки
  const calculateTrendLine = () => {
    if (data.length < 2) return data;
    
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    data.forEach((item, index) => {
      const x = index;
      const y = item.currentRevenue;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    });
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return data.map((item, index) => ({
      ...item,
      trendLine: intercept + slope * index
    }));
  };

  const dataWithTrend = calculateTrendLine();

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-1">Динамика ключевых показателей</h4>
        <p className="text-sm text-gray-600">
          Сравнение {getComparisonLabel(comparisonType)} по выручке и топливу с трендом
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={dataWithTrend}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis />
          
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
                          entry.name === 'Линия тренда' 
                            ? formatCurrency(Number(entry.value))
                            : formatCurrency(Number(entry.value))
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
            dataKey="currentRevenue" 
            name="Выручка (текущий)" 
            fill="#3B55A2" 
            opacity={0.8}
          />
          <Bar 
            dataKey="previousRevenue" 
            name="Выручка (предыдущий)" 
            fill="#3B55A2" 
            opacity={0.4}
          />
          
          {/* Столбчатые диаграммы для топлива */}
          <Bar 
            dataKey="currentPropane" 
            name="Пропан (текущий)" 
            fill="#FB8607" 
            opacity={0.8}
          />
          <Bar 
            dataKey="currentMethane" 
            name="Метан (текущий)" 
            fill="#2563EB" 
            opacity={0.8}
          />
          <Bar 
            dataKey="currentAI92" 
            name="АИ-92 (текущий)" 
            fill="#EAB308" 
            opacity={0.8}
          />
          <Bar 
            dataKey="currentAI95" 
            name="АИ-95 (текущий)" 
            fill="#DC2626" 
            opacity={0.8}
          />
          
          {/* Линия тренда */}
          <Line 
            type="monotone" 
            dataKey="trendLine" 
            name="Линия тренда" 
            stroke="#FF6B6B" 
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardComparisonChart;
