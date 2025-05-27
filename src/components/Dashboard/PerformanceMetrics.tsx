
import React from 'react';
import StatsCard from '../UI/StatsCard';
import { Award, Percent, Activity } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard 
        title="Индекс лояльности NPS" 
        value="68%" 
        change={5}
        changeText="за 30 дней" 
        icon={<Award size={24} className="text-logaz-orange" />} 
        color="bg-logaz-orange"
        tooltip="Net Promoter Score - индекс готовности клиентов рекомендовать компанию. Рассчитывается на основе опросов клиентов. Значения от 50% считаются отличными."
      />
      <StatsCard 
        title="Конверсия программы лояльности" 
        value="37.5%" 
        change={2.3}
        changeText="за 30 дней" 
        icon={<Percent size={24} className="text-logaz-green" />} 
        color="bg-logaz-green"
        tooltip="Процент клиентов, активно участвующих в программе лояльности от общего числа клиентов. Показывает эффективность программы и уровень вовлеченности."
      />
      <StatsCard 
        title="Частота заправок" 
        value="3.2 раза/мес" 
        change={0.5}
        changeText="за 30 дней" 
        icon={<Activity size={24} className="text-logaz-blue" />}
        tooltip="Среднее количество заправок одного клиента в месяц. Показатель регулярности использования услуг компании."
      />
    </div>
  );
};

export default PerformanceMetrics;
