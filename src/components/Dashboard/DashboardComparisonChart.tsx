
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardChartComparisonData, ComparisonType } from '@/types/dashboardComparison';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

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

  // Функция для получения текущего и предыдущего периода для легенды
  const getPeriodLabels = (type: ComparisonType) => {
    // Базовая дата - 01.01.2023
    const baseDate = new Date('2023-01-01');
    const currentDate = new Date();
    
    switch (type) {
      case 'D/D':
        // Для дней используем текущую дату
        const previousDayDate = new Date();
        previousDayDate.setFullYear(currentDate.getFullYear() - 1);
        return {
          current: format(currentDate, 'dd.MM.yy', { locale: ru }),
          previous: format(previousDayDate, 'dd.MM.yy', { locale: ru })
        };
      case 'W/W':
        // Для недель используем актуальные даты с 2023 года
        const currentWeek = Math.ceil((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
        const previousWeekDate = new Date(currentDate);
        previousWeekDate.setFullYear(currentDate.getFullYear() - 1);
        const previousWeek = Math.ceil((previousWeekDate.getTime() - new Date(previousWeekDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
        return {
          current: `${currentWeek}нед.${format(currentDate, 'yy')}`,
          previous: `${previousWeek}нед.${format(previousWeekDate, 'yy')}`
        };
      case 'M/M':
        // Для месяцев используем актуальные даты с 2023 года
        const currentMonthDate = new Date();
        const previousMonthDate = new Date(currentMonthDate);
        previousMonthDate.setFullYear(currentMonthDate.getFullYear() - 1);
        return {
          current: format(currentMonthDate, 'LLL yy', { locale: ru }),
          previous: format(previousMonthDate, 'LLL yy', { locale: ru })
        };
      case 'Q/Q':
        // Для кварталов используем актуальные даты с 2023 года
        const currentQuarterDate = new Date();
        const currentQuarter = Math.ceil((currentQuarterDate.getMonth() + 1) / 3);
        const previousQuarterDate = new Date(currentQuarterDate);
        previousQuarterDate.setFullYear(currentQuarterDate.getFullYear() - 1);
        const previousQuarter = Math.ceil((previousQuarterDate.getMonth() + 1) / 3);
        return {
          current: `${currentQuarter}кв.${format(currentQuarterDate, 'yy')}`,
          previous: `${previousQuarter}кв.${format(previousQuarterDate, 'yy')}`
        };
      case 'Y/Y':
        // Для годов используем актуальные даты с 2023 года
        const currentYearDate = new Date();
        const previousYearDate = new Date(currentYearDate);
        previousYearDate.setFullYear(currentYearDate.getFullYear() - 1);
        return {
          current: format(currentYearDate, 'yy'),
          previous: format(previousYearDate, 'yy')
        };
      default:
        return {
          current: 'текущий',
          previous: 'предыдущий'
        };
    }
  };

  const periodLabels = getPeriodLabels(comparisonType);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Функция для сортировки данных по периоду
  const sortDataByPeriod = (data: DashboardChartComparisonData[]) => {
    return [...data].sort((a, b) => {
      // Извлекаем дату из строки периода для правильной сортировки
      const parseDate = (periodStr: string) => {
        // Обрабатываем разные форматы периодов
        if (periodStr.includes('нед.')) {
          // Формат: "22нед.24"
          const match = periodStr.match(/(\d+)нед\.(\d+)/);
          if (match) {
            const week = parseInt(match[1]);
            const year = parseInt('20' + match[2]);
            return new Date(year, 0, week * 7);
          }
        } else if (periodStr.includes('кв.')) {
          // Формат: "2кв.24"
          const match = periodStr.match(/(\d+)кв\.(\d+)/);
          if (match) {
            const quarter = parseInt(match[1]);
            const year = parseInt('20' + match[2]);
            return new Date(year, (quarter - 1) * 3, 1);
          }
        } else if (periodStr.match(/^\d{2}$/)) {
          // Формат года: "24"
          const year = parseInt('20' + periodStr);
          return new Date(year, 0, 1);
        } else if (periodStr.match(/\w{3}\s\d{2}/)) {
          // Формат месяца: "мар 24"
          const [month, year] = periodStr.split(' ');
          const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
          const monthIndex = monthNames.indexOf(month);
          const fullYear = parseInt('20' + year);
          return new Date(fullYear, monthIndex, 1);
        } else if (periodStr.match(/\d{2}\.\d{2}\.\d{2}/)) {
          // Формат даты: "01.01.24"
          const [day, month, year] = periodStr.split('.');
          const fullYear = parseInt('20' + year);
          return new Date(fullYear, parseInt(month) - 1, parseInt(day));
        }
        
        return new Date();
      };

      const dateA = parseDate(a.period);
      const dateB = parseDate(b.period);
      return dateA.getTime() - dateB.getTime();
    });
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
  const calculateAllTrends = (sortedData: DashboardChartComparisonData[]) => {
    if (sortedData.length < 2) return sortedData;
    const revenueValues = sortedData.map(item => item.currentRevenue);
    const propaneValues = sortedData.map(item => item.currentPropane);
    const methaneValues = sortedData.map(item => item.currentMethane);
    const ai92Values = sortedData.map(item => item.currentAI92);
    const ai95Values = sortedData.map(item => item.currentAI95);
    const revenueTrend = calculateTrend(revenueValues);
    const propaneTrend = calculateTrend(propaneValues);
    const methaneTrend = calculateTrend(methaneValues);
    const ai92Trend = calculateTrend(ai92Values);
    const ai95Trend = calculateTrend(ai95Values);
    return sortedData.map((item, index) => ({
      ...item,
      revenueTrend: revenueTrend[index],
      propaneTrend: propaneTrend[index],
      methaneTrend: methaneTrend[index],
      ai92Trend: ai92Trend[index],
      ai95Trend: ai95Trend[index]
    }));
  };

  // Сортируем данные и вычисляем тренды
  const sortedData = sortDataByPeriod(data);
  const dataWithTrends = calculateAllTrends(sortedData);

  return (
    <div className="w-full">
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
          <Bar dataKey="currentRevenue" name={`Выручка (${periodLabels.current})`} fill="#3B55A2" opacity={0.8} />
          <Bar dataKey="previousRevenue" name={`Выручка (${periodLabels.previous})`} fill="#3B55A2" opacity={0.4} />
          
          {/* Столбчатые диаграммы для топлива */}
          <Bar dataKey="currentPropane" name={`Пропан (${periodLabels.current})`} fill="#FB8607" opacity={0.8} />
          <Bar dataKey="currentMethane" name={`Метан (${periodLabels.current})`} fill="#2563EB" opacity={0.8} />
          <Bar dataKey="currentAI92" name={`АИ-92 (${periodLabels.current})`} fill="#EAB308" opacity={0.8} />
          <Bar dataKey="currentAI95" name={`АИ-95 (${periodLabels.current})`} fill="#DC2626" opacity={0.8} />
          
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
