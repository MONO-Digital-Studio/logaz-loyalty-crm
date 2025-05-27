
import React from 'react';
import StatsCard from '../UI/StatsCard';
import { Users, CreditCard, TrendingUp, Activity } from 'lucide-react';

const StatsSummary: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
        <StatsCard 
          title="Всего клиентов" 
          value="2845" 
          change={12}
          changeText="за 30 дней" 
          icon={<Users size={24} className="text-logaz-blue" />}
          tooltip="Общее количество зарегистрированных клиентов в программе лояльности. Включает активных и неактивных участников."
        />
        <StatsCard 
          title="Активных клиентов" 
          value="1256" 
          change={8}
          changeText="за 30 дней" 
          icon={<Activity size={24} className="text-logaz-green" />}
          tooltip="Клиенты, которые совершили хотя бы одну покупку за последние 30 дней. Показатель вовлеченности аудитории."
        />
        <StatsCard 
          title="Выручка" 
          value="12.45 мл" 
          change={-15}
          changeText="за 30 дней" 
          icon={<TrendingUp size={24} className="text-logaz-orange" />}
          tooltip="Общая выручка от продаж за текущий месяц. Включает все транзакции по топливным картам и прочим услугам."
        />
        <StatsCard 
          title="Средний чек" 
          value="₽1,234" 
          change={5.2}
          changeText="за 30 дней" 
          icon={<CreditCard size={24} className="text-purple-600" />}
          tooltip="Средний размер покупки одного клиента. Рассчитывается как общая выручка деленная на количество транзакций."
        />
      </div>
    </div>
  );
};

export default StatsSummary;
