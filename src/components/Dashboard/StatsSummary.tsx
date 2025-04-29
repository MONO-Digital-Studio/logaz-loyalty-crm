
import React from 'react';
import StatsCard from '../UI/StatsCard';
import { summaryStats } from '@/data/mockData';
import { Activity, Users, ShoppingBag, Banknote } from 'lucide-react';

const StatsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard 
        title="Всего клиентов" 
        value={summaryStats.totalClients} 
        change={12}
        changeText="за 30 дней" 
        icon={<Users size={24} className="text-logaz-blue" />} 
      />
      <StatsCard 
        title="Активных клиентов" 
        value={summaryStats.activeClients} 
        change={8}
        changeText="за 30 дней" 
        icon={<Activity size={24} className="text-logaz-blue" />} 
      />
      <StatsCard 
        title="Выручка" 
        value={`${(summaryStats.totalRevenue / 1000000).toFixed(2)} млн ₽`} 
        change={15}
        changeText="за 30 дней" 
        icon={<Banknote size={24} className="text-logaz-blue" />} 
      />
      <StatsCard 
        title="Средний чек" 
        value={`${summaryStats.averageCheck} ₽`} 
        change={-3}
        changeText="за 30 дней" 
        icon={<ShoppingBag size={24} className="text-logaz-blue" />} 
      />
    </div>
  );
};

export default StatsSummary;
