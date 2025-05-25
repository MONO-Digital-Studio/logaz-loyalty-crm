
import React from 'react';
import StatsCard from '../UI/StatsCard';
import { Users, CreditCard, TrendingUp, Activity } from 'lucide-react';

const StatsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatsCard 
        title="Всего клиентов" 
        value="2845" 
        change={12}
        changeText="за 30 дней" 
        icon={<Users size={24} className="text-logaz-blue" />} 
      />
      <StatsCard 
        title="Активных клиентов" 
        value="1256" 
        change={8}
        changeText="за 30 дней" 
        icon={<Activity size={24} className="text-logaz-green" />} 
      />
      <StatsCard 
        title="Выручка" 
        value="12.45 мл" 
        change={-15}
        changeText="за 30 дней" 
        icon={<TrendingUp size={24} className="text-logaz-orange" />} 
      />
      <StatsCard 
        title="Средний чек" 
        value="₽1,234" 
        change={5.2}
        changeText="за 30 дней" 
        icon={<CreditCard size={24} className="text-purple-600" />} 
      />
    </div>
  );
};

export default StatsSummary;
