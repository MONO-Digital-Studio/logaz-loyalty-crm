import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import StatsCard from '@/components/UI/StatsCard';
import PeriodComparisonCard from './PeriodComparisonCard';
import PeriodComparisonChart from './PeriodComparisonChart';
import { MessageSquareText, Clock, Users, BarChart3, TrendingUp } from 'lucide-react';
import { AnalyticsData, AgentStats, ChannelDistribution } from '@/types/contactCenter';
import { ComparisonType } from '@/types/periodComparison';
import { usePeriodComparison } from '@/hooks/usePeriodComparison';

// Моковые данные для аналитики
const periodData: AnalyticsData[] = [
  { 
    periodStart: new Date('2023-01-01'), 
    periodEnd: new Date('2023-01-31'), 
    totalChats: 1245,
    avgChatDuration: 7.2,
    satisfactionScore: 4.2,
    responseTime: 35
  },
  { 
    periodStart: new Date('2023-02-01'), 
    periodEnd: new Date('2023-02-28'), 
    totalChats: 1367,
    avgChatDuration: 6.9,
    satisfactionScore: 4.3,
    responseTime: 32
  },
  { 
    periodStart: new Date('2023-03-01'), 
    periodEnd: new Date('2023-03-31'), 
    totalChats: 1482,
    avgChatDuration: 6.7,
    satisfactionScore: 4.4,
    responseTime: 30
  },
  { 
    periodStart: new Date('2023-04-01'), 
    periodEnd: new Date('2023-04-30'), 
    totalChats: 1520,
    avgChatDuration: 6.5,
    satisfactionScore: 4.5,
    responseTime: 28
  },
  { 
    periodStart: new Date('2023-05-01'), 
    periodEnd: new Date('2023-05-31'), 
    totalChats: 1676,
    avgChatDuration: 6.2,
    satisfactionScore: 4.6,
    responseTime: 25
  },
  { 
    periodStart: new Date('2023-06-01'), 
    periodEnd: new Date('2023-06-30'), 
    totalChats: 1752,
    avgChatDuration: 5.9,
    satisfactionScore: 4.7,
    responseTime: 22
  }
];

const agentStatsData: AgentStats[] = [
  { 
    agentId: '1', 
    name: 'Иванов А.С.', 
    handledChats: 342, 
    avgResponseTime: 24, 
    satisfaction: 4.7 
  },
  { 
    agentId: '2', 
    name: 'Петрова Е.В.', 
    handledChats: 298, 
    avgResponseTime: 26, 
    satisfaction: 4.5 
  },
  { 
    agentId: '3', 
    name: 'Сидоров И.П.', 
    handledChats: 315, 
    avgResponseTime: 28, 
    satisfaction: 4.6 
  },
  { 
    agentId: '4', 
    name: 'Козлова Н.А.', 
    handledChats: 275, 
    avgResponseTime: 25, 
    satisfaction: 4.8 
  },
  { 
    agentId: '5', 
    name: 'Николаев Д.С.', 
    handledChats: 330, 
    avgResponseTime: 27, 
    satisfaction: 4.4 
  }
];

const channelData: ChannelDistribution[] = [
  { channel: 'Веб-чат', percentage: 45 },
  { channel: 'Телефон', percentage: 25 },
  { channel: 'WhatsApp', percentage: 15 },
  { channel: 'Telegram', percentage: 10 },
  { channel: 'Другие', percentage: 5 }
];

// Цвета для графиков
const COLORS = ['#3B55A2', '#FB8607', '#4CAF50', '#F44336', '#9C27B0'];

const AnalyticsDashboard: React.FC = () => {
  const [periodTab, setPeriodTab] = useState('month');
  
  // Новый хук для сравнения периодов
  const {
    comparisonType,
    setComparisonType,
    comparisonData,
    chartData,
    isLoading: comparisonLoading
  } = usePeriodComparison(periodData);
  
  // Форматирование данных для графиков
  const formattedPeriodData = periodData.map(item => ({
    ...item,
    period: `${item.periodStart.toLocaleDateString('ru-RU', { month: 'short' })}`
  }));
  
  const formatters = {
    totalChats: (value: number) => value.toString(),
    responseTime: (value: number) => `${value} сек`,
    satisfactionScore: (value: number) => `${value.toFixed(1)}/5.0`,
    avgChatDuration: (value: number) => `${value.toFixed(1)} мин`
  };
  
  return (
    <div className="space-y-6">
      {/* Карточки с основными показателями */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <StatsCard
              title="Всего диалогов"
              value={periodData.reduce((acc, curr) => acc + curr.totalChats, 0)}
              icon={<MessageSquareText className="text-logaz-blue" />}
              change={8.4}
              changeText="за 30 дней"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <StatsCard
              title="Среднее время ответа"
              value={`${periodData[periodData.length - 1].responseTime} сек.`}
              icon={<Clock className="text-logaz-orange" />}
              change={-12.5}
              changeText="за 30 дней"
              color="bg-logaz-orange"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <StatsCard
              title="Активных операторов"
              value={agentStatsData.length}
              icon={<Users className="text-logaz-green" />}
              color="bg-logaz-green"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <StatsCard
              title="Удовлетворенность"
              value={`${(periodData[periodData.length - 1].satisfactionScore).toFixed(1)}/5.0`}
              icon={<BarChart3 className="text-logaz-blue" />}
              change={5.2}
              changeText="за 30 дней"
            />
          </CardContent>
        </Card>
      </div>

      {/* Новая секция сравнения периодов */}
      <section className="mt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold">Сравнение периодов</h3>
          <Select value={comparisonType} onValueChange={(value: ComparisonType) => setComparisonType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="D/D">День к дню (D/D)</SelectItem>
              <SelectItem value="W/W">Неделя к неделе (W/W)</SelectItem>
              <SelectItem value="M/M">Месяц к месяцу (M/M)</SelectItem>
              <SelectItem value="Q/Q">Квартал к кварталу (Q/Q)</SelectItem>
              <SelectItem value="Y/Y">Год к году (Y/Y)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {comparisonLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comparisonData ? (
          <>
            {/* Карточки с ключевыми изменениями */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <PeriodComparisonCard
                data={comparisonData.totalChats}
                title="Количество диалогов"
                icon={<MessageSquareText size={20} className="text-logaz-blue" />}
                formatter={formatters.totalChats}
              />
              <PeriodComparisonCard
                data={comparisonData.responseTime}
                title="Время ответа"
                icon={<Clock size={20} className="text-logaz-orange" />}
                formatter={formatters.responseTime}
              />
              <PeriodComparisonCard
                data={comparisonData.satisfactionScore}
                title="Удовлетворенность"
                icon={<BarChart3 size={20} className="text-logaz-green" />}
                formatter={formatters.satisfactionScore}
              />
              <PeriodComparisonCard
                data={comparisonData.avgChatDuration}
                title="Время диалога"
                icon={<TrendingUp size={20} className="text-purple-600" />}
                formatter={formatters.avgChatDuration}
              />
            </div>
            
            {/* Основной график сравнения */}
            <Card className="p-6">
              <PeriodComparisonChart
                data={chartData}
                comparisonType={comparisonType}
              />
            </Card>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Данные для сравнения недоступны</p>
          </div>
        )}
      </section>

      {/* Вкладки периода для графиков */}
      <Tabs defaultValue="month" onValueChange={setPeriodTab}>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl">Статистика диалогов</CardTitle>
          <TabsList>
            <TabsTrigger value="week">Неделя</TabsTrigger>
            <TabsTrigger value="month">Месяц</TabsTrigger>
            <TabsTrigger value="quarter">Квартал</TabsTrigger>
            <TabsTrigger value="year">Год</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={periodTab}>
          <Card>
            <CardHeader>
              <CardTitle>Динамика обращений</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={formattedPeriodData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalChats" 
                    name="Количество диалогов" 
                    stroke="#3B55A2" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    name="Время ответа (сек)" 
                    stroke="#FB8607" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Дополнительные графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Распределение по каналам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentage"
                  nameKey="channel"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Эффективность операторов</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={agentStatsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="handledChats" 
                  name="Обработано диалогов" 
                  fill="#3B55A2" 
                />
                <Bar 
                  dataKey="satisfaction" 
                  name="Оценка (из 5)" 
                  fill="#4CAF50" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
