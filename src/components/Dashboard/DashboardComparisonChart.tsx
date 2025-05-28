import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      case 'D/D':
        return 'день к дню';
      case 'W/W':
        return 'неделя к неделе';
      case 'M/M':
        return 'месяц к месяцу';
      case 'Q/Q':
        return 'квартал к кварталу';
      case 'Y/Y':
        return 'год к году';
      default:
        return 'период к периоду';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Функция для вычисления линии тренда
  const calculateTrend = (values: number[]) => {
    if (values.length < 2) return values;
    const n = values.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    values.forEach((y, x) => {
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    });
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return values.map((_, index) => intercept + slope * index);
  };

  // Вычисляем линии тренда для всех показателей
  const calculateAllTrends = () => {
    if (data.length < 2) return data;
    const revenueValues = data.map(item => item.currentRevenue);
    const propaneValues = data.map(item => item.currentPropane);
    const methaneValues = data.map(item => item.currentMethane);
    const ai92Values = data.map(item => item.currentAI92);
    const ai95Values = data.map(item => item.currentAI95);
    const revenueTrend = calculateTrend(revenueValues);
    const propaneTrend = calculateTrend(propaneValues);
    const methaneTrend = calculateTrend(methaneValues);
    const ai92Trend = calculateTrend(ai92Values);
    const ai95Trend = calculateTrend(ai95Values);
    return data.map((item, index) => ({
      ...item,
      revenueTrend: revenueTrend[index],
      propaneTrend: propaneTrend[index],
      methaneTrend: methaneTrend[index],
      ai92Trend: ai92Trend[index],
      ai95Trend: ai95Trend[index]
    }));
  };

  const dataWithTrends = calculateAllTrends();
  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Сравнение {getComparisonLabel(comparisonType)} по выручке и топливу с линиями тренда
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={dataWithTrends} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" tick={{
          fontSize: 12
        }} interval="preserveStartEnd" />
          <YAxis />
          
          <Tooltip content={({
          active,
          payload,
          label
        }) => {
          if (active && payload && payload.length) {
            return <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium mb-2">{label}</p>
                    {payload.map((entry, index) => <p key={index} className="text-sm" style={{
                color: entry.color
              }}>
                        {entry.name}: {formatCurrency(Number(entry.value))}
                      </p>)}
                  </div>;
          }
          return null;
        }} />
          
          <Legend />
          
          {/* Столбчатые диаграммы для выручки */}
          <Bar dataKey="currentRevenue" name="Выручка (текущий)" fill="#3B55A2" opacity={0.8} />
          <Bar dataKey="previousRevenue" name="Выручка (предыдущий)" fill="#3B55A2" opacity={0.4} />
          
          {/* Столбчатые диаграммы для топлива */}
          <Bar dataKey="currentPropane" name="Пропан (текущий)" fill="#FB8607" opacity={0.8} />
          <Bar dataKey="currentMethane" name="Метан (текущий)" fill="#2563EB" opacity={0.8} />
          <Bar dataKey="currentAI92" name="АИ-92 (текущий)" fill="#EAB308" opacity={0.8} />
          <Bar dataKey="currentAI95" name="АИ-95 (текущий)" fill="#DC2626" opacity={0.8} />
          
          {/* Линии тренда для каждого показателя */}
          <Line type="monotone" dataKey="revenueTrend" name="Тренд выручки" stroke="#1E40AF" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          <Line type="monotone" dataKey="propaneTrend" name="Тренд пропана" stroke="#EA580C" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          <Line type="monotone" dataKey="methaneTrend" name="Тренд метана" stroke="#1D4ED8" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          <Line type="monotone" dataKey="ai92Trend" name="Тренд АИ-92" stroke="#CA8A04" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          <Line type="monotone" dataKey="ai95Trend" name="Тренд АИ-95" stroke="#B91C1C" strokeWidth={2} strokeDasharray="5 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardComparisonChart;
