
import React from 'react';
import StatsCard from '../components/UI/StatsCard';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '../components/ui/chart';
import { 
  summaryStats, 
  monthlySales, 
  loyaltyStats, 
  demographicData, 
  genderData 
} from '../data/mockData';
import { Activity, Users, ShoppingBag, Banknote, Award, Percent } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const DashboardPage: React.FC = () => {
  // Charts configuration
  const chartsConfig = {
    sales: {
      light: "#3B55A2",
    },
    transactions: {
      light: "#FB8607",
    },
    pointsEarned: {
      light: "#3B55A2",
    },
    pointsSpent: {
      light: "#FB8607",
    },
    pointsExpired: {
      light: "#F44336",
    },
    percentage: {
      light: "#3B55A2",
    },
  };
  
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
        {/* Sales Chart */}
        <div className="stats-card p-6">
          <h3 className="text-lg font-semibold mb-4 font-montserrat">Динамика продаж</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={monthlySales.map(item => ({
                ...item,
                date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
              }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B55A2"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Loyalty Points Chart */}
        <div className="stats-card p-6">
          <h3 className="text-lg font-semibold mb-4 font-montserrat">Баллы лояльности</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={loyaltyStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pointsEarned" fill="#3B55A2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pointsSpent" fill="#FB8607" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pointsExpired" fill="#F44336" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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
          <div className="stats-card p-6">
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Портрет клиента: возраст</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={demographicData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#3B55A2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="stats-card p-6">
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Портрет клиента: пол</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="percentage"
                    nameKey="gender"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#3B55A2" : "#FB8607"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
