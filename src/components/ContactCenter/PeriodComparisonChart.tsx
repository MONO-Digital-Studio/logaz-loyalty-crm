
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
import { ChartComparisonData, ComparisonType } from '@/types/periodComparison';

interface PeriodComparisonChartProps {
  data: ChartComparisonData[];
  comparisonType: ComparisonType;
}

const PeriodComparisonChart: React.FC<PeriodComparisonChartProps> = ({
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

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-1">Динамика изменений</h4>
        <p className="text-sm text-gray-600">
          Сравнение {getComparisonLabel(comparisonType)} по ключевым метрикам
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
                        {entry.name}: {entry.value}
                        {entry.dataKey?.includes('Chats') ? ' диалогов' : 
                         entry.dataKey?.includes('ResponseTime') ? ' сек' : 
                         entry.dataKey?.includes('Satisfaction') ? '/5.0' : ''}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Legend />
          
          {/* Столбчатые диаграммы для количества диалогов */}
          <Bar 
            yAxisId="left"
            dataKey="currentChats" 
            name="Диалоги (текущий)" 
            fill="#3B55A2" 
            opacity={0.8}
          />
          <Bar 
            yAxisId="left"
            dataKey="previousChats" 
            name="Диалоги (предыдущий)" 
            fill="#3B55A2" 
            opacity={0.4}
          />
          
          {/* Линии для времени ответа */}
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="currentResponseTime" 
            name="Время ответа (текущий)" 
            stroke="#FB8607" 
            strokeWidth={2}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="previousResponseTime" 
            name="Время ответа (предыдущий)" 
            stroke="#FB8607" 
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeriodComparisonChart;
