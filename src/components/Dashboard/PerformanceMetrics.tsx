
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
      />
      <StatsCard 
        title="Конверсия программы лояльности" 
        value="37.5%" 
        change={2.3}
        changeText="за 30 дней" 
        icon={<Percent size={24} className="text-logaz-green" />} 
        color="bg-logaz-green"
      />
      <StatsCard 
        title="Частота заправок" 
        value="3.2 раза/мес" 
        change={0.5}
        changeText="за 30 дней" 
        icon={<Activity size={24} className="text-logaz-blue" />} 
      />
    </div>
  );
};

export default PerformanceMetrics;
