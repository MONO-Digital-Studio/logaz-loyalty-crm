
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, BarChart, PieChart } from '@/components/ui/charts';

const LegalEntitiesStatsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Период времени и фильтры */}
      <Card>
        <CardContent className="pt-6 flex justify-between items-center">
          <div className="text-xl font-bold">Статистика контакт-центра ЮЛ</div>
          <div className="flex gap-3">
            <Select defaultValue="week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="week">Эта неделя</SelectItem>
                <SelectItem value="month">Этот месяц</SelectItem>
                <SelectItem value="year">Этот год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Всего диалогов" value="187" trend="+8%" isPositive={true} />
        <MetricCard title="Среднее время ответа" value="2м 15с" trend="-18с" isPositive={true} />
        <MetricCard title="Среднее время решения" value="12м 34с" trend="+2м 12с" isPositive={false} />
        <MetricCard title="Удовлетворенность" value="94%" trend="+3%" isPositive={true} />
      </div>

      {/* Графики и диаграммы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Количество диалогов</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart 
              data={[
                { date: "Пн", value: 28 },
                { date: "Вт", value: 22 },
                { date: "Ср", value: 35 },
                { date: "Чт", value: 26 },
                { date: "Пт", value: 31 },
                { date: "Сб", value: 15 },
                { date: "Вс", value: 12 },
              ]}
              categories={["value"]}
              index="date"
              colors={["#3498db"]}
              valueFormatter={(value) => `${value} диал.`}
              showXAxis
              showYAxis
              showGradient
              showLegend={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по каналам</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart 
              data={[
                { name: "Email", value: 55 },
                { name: "Телефон", value: 30 },
                { name: "Личный кабинет", value: 15 },
              ]}
              index="name"
              categories={["value"]}
              colors={["#3498db", "#2ecc71", "#9b59b6"]}
              valueFormatter={(value) => `${value}%`}
              showTooltip
              showLegend
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Время ответа по операторам</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={[
                { name: "Мария И.", value: 95 },
                { name: "Александр П.", value: 140 },
                { name: "Екатерина С.", value: 80 },
                { name: "Дмитрий К.", value: 115 },
              ]}
              index="name"
              categories={["value"]}
              colors={["#f39c12"]}
              valueFormatter={(value) => `${value} сек.`}
              showXAxis
              showYAxis
              showLegend={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ темы обращений</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={[
                { name: "Топливные карты", value: 40 },
                { name: "Платежи", value: 25 },
                { name: "Отчетность", value: 20 },
                { name: "Интеграции", value: 10 },
                { name: "Другое", value: 5 },
              ]}
              index="name"
              categories={["value"]}
              colors={["#2ecc71"]}
              layout="horizontal"
              valueFormatter={(value) => `${value}%`}
              showXAxis
              showYAxis
              showLegend={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент для карточки с метрикой
const MetricCard = ({ title, value, trend, isPositive }: { 
  title: string, 
  value: string, 
  trend: string,
  isPositive: boolean
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm text-muted-foreground mb-1">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`mt-1 text-xs flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
          <span className="ml-1">
            {isPositive ? '↑' : '↓'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalEntitiesStatsPage;
