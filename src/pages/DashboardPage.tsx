
import React from 'react';
import StatsCard from '../components/UI/StatsCard';
import Chart from '../components/ui/Chart';
import { 
  summaryStats, 
  monthlySales, 
  loyaltyStats, 
  demographicData, 
  genderData 
} from '../data/mockData';
import { Activity, Users, ShoppingBag, Banknote, Award, Percent } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-syncopate font-bold">Аналитика</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent">
            <option>Последние 30 дней</option>
            <option>Текущий месяц</option>
            <option>Прошлый месяц</option>
            <option>Последние 90 дней</option>
            <option>Год</option>
          </select>
          <button className="btn-primary">Экспорт</button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          title="Динамика продаж" 
          type="line" 
          data={monthlySales.map(item => ({
            ...item,
            date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
          }))} 
          xKey="date" 
          yKey="revenue" 
          height={350}
        />
        
        <Chart 
          title="Баллы лояльности" 
          type="bar" 
          data={loyaltyStats} 
          xKey="period" 
          yKey={["pointsEarned", "pointsSpent", "pointsExpired"]} 
          colors={["#3B55A2", "#FB8607", "#F44336"]} 
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="stats-card p-6">
          <h3 className="text-lg font-semibold mb-4">RFM-анализ клиентов</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-logaz-blue/10 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Recency</h4>
              <div className="text-xl font-bold">7.8</div>
              <div className="text-sm text-gray-500 mt-1">дней</div>
            </div>
            <div className="bg-logaz-orange/10 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Frequency</h4>
              <div className="text-xl font-bold">3.2</div>
              <div className="text-sm text-gray-500 mt-1">покупки в месяц</div>
            </div>
            <div className="bg-logaz-green/10 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Monetary</h4>
              <div className="text-xl font-bold">6 420 ₽</div>
              <div className="text-sm text-gray-500 mt-1">средняя сумма</div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Сегменты клиентов</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-32">VIP клиенты</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-logaz-blue h-4 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="w-10 text-right">15%</div>
              </div>
              <div className="flex items-center">
                <div className="w-32">Активные</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-logaz-orange h-4 rounded-full" style={{ width: '42%' }}></div>
                </div>
                <div className="w-10 text-right">42%</div>
              </div>
              <div className="flex items-center">
                <div className="w-32">Случайные</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-logaz-green h-4 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <div className="w-10 text-right">28%</div>
              </div>
              <div className="flex items-center">
                <div className="w-32">Спящие</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-logaz-gray h-4 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="w-10 text-right">15%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="stats-card">
            <Chart 
              title="Портрет клиента: возраст" 
              type="bar" 
              data={demographicData} 
              xKey="age" 
              yKey="percentage" 
              height={200}
            />
          </div>
          
          <div className="stats-card">
            <Chart 
              title="Портрет клиента: пол" 
              type="pie" 
              data={genderData} 
              xKey="gender" 
              yKey="percentage" 
              colors={["#3B55A2", "#FB8607"]}
              height={200}
            />
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default DashboardPage;
