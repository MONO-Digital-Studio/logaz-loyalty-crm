
import React from 'react';
import StatsCard from '../UI/StatsCard';
import { Award, Percent, Activity } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

const PerformanceMetrics: React.FC = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard 
        title="Индекс лояльности NPS" 
        value={`${data.performanceMetrics.nps.current.toFixed(1)}%`}
        change={data.performanceMetrics.nps.change}
        changeText="за 30 дней" 
        icon={<Award size={24} className="text-logaz-orange" />} 
        color="bg-logaz-orange"
        tooltip="Net Promoter Score - индекс готовности клиентов рекомендовать компанию. Рассчитывается на основе опросов клиентов. Значения от 50% считаются отличными."
      />
      <StatsCard 
        title="Конверсия программы лояльности" 
        value={`${data.performanceMetrics.loyaltyConversion.current.toFixed(1)}%`}
        change={data.performanceMetrics.loyaltyConversion.change}
        changeText="за 30 дней" 
        icon={<Percent size={24} className="text-logaz-green" />} 
        color="bg-logaz-green"
        tooltip="Процент клиентов, активно участвующих в программе лояльности от общего числа клиентов. Показывает эффективность программы и уровень вовлеченности."
      />
      <StatsCard 
        title="Частота заправок" 
        value={`${data.performanceMetrics.refuelingFrequency.current.toFixed(1)} раза/мес`}
        change={data.performanceMetrics.refuelingFrequency.change}
        changeText="за 30 дней" 
        icon={<Activity size={24} className="text-logaz-blue" />}
        tooltip="Среднее количество заправок одного клиента в месяц. Показатель регулярности использования услуг компании."
      />
    </div>
  );
};

export default PerformanceMetrics;
