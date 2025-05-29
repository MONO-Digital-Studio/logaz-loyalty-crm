
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DashboardChartComparisonData, ComparisonType } from '@/types/dashboardComparison';

export const getComparisonLabel = (type: ComparisonType) => {
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

export const getPeriodLabels = (type: ComparisonType) => {
  const baseDate = new Date('2023-01-01');
  const currentDate = new Date();
  
  switch (type) {
    case 'D/D':
      const previousDayDate = new Date();
      previousDayDate.setFullYear(currentDate.getFullYear() - 1);
      return {
        current: format(currentDate, 'dd.MM.yy', { locale: ru }),
        previous: format(previousDayDate, 'dd.MM.yy', { locale: ru })
      };
    case 'W/W':
      const currentWeek = Math.ceil((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      const previousWeekDate = new Date(currentDate);
      previousWeekDate.setFullYear(currentDate.getFullYear() - 1);
      const previousWeek = Math.ceil((previousWeekDate.getTime() - new Date(previousWeekDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      return {
        current: `${currentWeek}нед.${format(currentDate, 'yy')}`,
        previous: `${previousWeek}нед.${format(previousWeekDate, 'yy')}`
      };
    case 'M/M':
      const currentMonthDate = new Date();
      const previousMonthDate = new Date(currentMonthDate);
      previousMonthDate.setFullYear(currentMonthDate.getFullYear() - 1);
      return {
        current: format(currentMonthDate, 'LLL yy', { locale: ru }),
        previous: format(previousMonthDate, 'LLL yy', { locale: ru })
      };
    case 'Q/Q':
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

export const sortDataByPeriod = (data: DashboardChartComparisonData[]) => {
  return [...data].sort((a, b) => {
    const parseDate = (periodStr: string) => {
      if (periodStr.includes('нед.')) {
        const match = periodStr.match(/(\d+)нед\.(\d+)/);
        if (match) {
          const week = parseInt(match[1]);
          const year = parseInt('20' + match[2]);
          return new Date(year, 0, week * 7);
        }
      } else if (periodStr.includes('кв.')) {
        const match = periodStr.match(/(\d+)кв\.(\d+)/);
        if (match) {
          const quarter = parseInt(match[1]);
          const year = parseInt('20' + match[2]);
          return new Date(year, (quarter - 1) * 3, 1);
        }
      } else if (periodStr.match(/^\d{2}$/)) {
        const year = parseInt('20' + periodStr);
        return new Date(year, 0, 1);
      } else if (periodStr.match(/\w{3}\s\d{2}/)) {
        const [month, year] = periodStr.split(' ');
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const monthIndex = monthNames.indexOf(month);
        const fullYear = parseInt('20' + year);
        return new Date(fullYear, monthIndex, 1);
      } else if (periodStr.match(/\d{2}\.\d{2}\.\d{2}/)) {
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

export const calculateTrend = (values: number[]) => {
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

export const calculateAllTrends = (sortedData: DashboardChartComparisonData[]) => {
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
