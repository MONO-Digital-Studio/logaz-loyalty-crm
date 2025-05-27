
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  CreditCard,
  Fuel,
  BarChart3,
  UserCheck,
  TrendingDown,
  Star,
  Percent,
  RotateCcw,
  Activity
} from 'lucide-react';
import { useDashboardPeriodComparison } from '@/hooks/useDashboardPeriodComparison';
import { ComparisonType } from '@/types/periodComparison';
import { MetricGroup } from '@/types/dashboardComparison';
import DashboardMetricGroup from './DashboardMetricGroup';
import DashboardComparisonChart from './DashboardComparisonChart';

const DashboardPeriodComparison: React.FC = () => {
  const { 
    comparisonType, 
    setComparisonType, 
    comparisonData, 
    chartData, 
    isLoading 
  } = useDashboardPeriodComparison();

  const comparisonOptions = [
    { value: 'D/D', label: 'День к дню' },
    { value: 'W/W', label: 'Неделя к неделе' },
    { value: 'M/M', label: 'Месяц к месяцу' },
    { value: 'Q/Q', label: 'Квартал к кварталу' },
    { value: 'Y/Y', label: 'Год к году' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value));
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatDecimal = (value: number) => {
    return value.toFixed(1);
  };

  const metricGroups: MetricGroup[] = [
    {
      title: 'Финансовые показатели',
      description: 'Динамика продаж, выручка и средний чек',
      icon: <DollarSign size={24} className="text-logaz-blue" />,
      metrics: [
        {
          key: 'revenue',
          title: 'Выручка',
          icon: <DollarSign size={20} className="text-logaz-blue" />,
          formatter: formatCurrency
        },
        {
          key: 'averageCheck',
          title: 'Средний чек',
          icon: <CreditCard size={20} className="text-green-600" />,
          formatter: formatCurrency
        }
      ]
    },
    {
      title: 'Показатели реализации топлива',
      description: 'Продажи по видам топлива',
      icon: <Fuel size={24} className="text-logaz-orange" />,
      metrics: [
        {
          key: 'propaneSales',
          title: 'Пропан',
          icon: <Fuel size={20} className="text-orange-600" />,
          formatter: formatCurrency
        },
        {
          key: 'methaneSales',
          title: 'Метан',
          icon: <Fuel size={20} className="text-blue-600" />,
          formatter: formatCurrency
        },
        {
          key: 'ai92Sales',
          title: 'АИ-92',
          icon: <Fuel size={20} className="text-yellow-600" />,
          formatter: formatCurrency
        },
        {
          key: 'ai95Sales',
          title: 'АИ-95',
          icon: <Fuel size={20} className="text-red-600" />,
          formatter: formatCurrency
        }
      ]
    },
    {
      title: 'Клиенты',
      description: 'Общее количество, активность и отток клиентов',
      icon: <Users size={24} className="text-purple-600" />,
      metrics: [
        {
          key: 'totalClients',
          title: 'Всего клиентов',
          icon: <Users size={20} className="text-purple-600" />,
          formatter: formatNumber
        },
        {
          key: 'activeClients',
          title: 'Активные клиенты',
          icon: <UserCheck size={20} className="text-green-600" />,
          formatter: formatNumber
        },
        {
          key: 'clientChurn',
          title: 'Отток клиентов',
          icon: <TrendingDown size={20} className="text-red-600" />,
          formatter: formatNumber
        }
      ]
    },
    {
      title: 'Лояльность',
      description: 'Баллы, индексы и конверсия программы лояльности',
      icon: <Award size={24} className="text-logaz-green" />,
      metrics: [
        {
          key: 'pointsEarned',
          title: 'Баллы заработанные',
          icon: <TrendingUp size={20} className="text-logaz-orange" />,
          formatter: formatNumber
        },
        {
          key: 'pointsSpent',
          title: 'Баллы потраченные',
          icon: <Award size={20} className="text-logaz-green" />,
          formatter: formatNumber
        },
        {
          key: 'loyaltyIndex',
          title: 'Индекс лояльности',
          icon: <Star size={20} className="text-yellow-600" />,
          formatter: formatDecimal
        },
        {
          key: 'loyaltyConversion',
          title: 'Конверсия программы',
          icon: <Percent size={20} className="text-blue-600" />,
          formatter: formatPercent
        },
        {
          key: 'fuellingFrequency',
          title: 'Частота заправок',
          icon: <RotateCcw size={20} className="text-indigo-600" />,
          formatter: formatDecimal
        }
      ]
    }
  ];

  if (isLoading || !comparisonData) {
    return (
      <Card className="stats-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Загрузка данных сравнения...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок секции */}
      <Card className="stats-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold font-montserrat">
                Сравнение периодов
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Комплексный анализ ключевых показателей бизнеса
              </p>
            </div>
            <Select value={comparisonType} onValueChange={(value) => setComparisonType(value as ComparisonType)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {comparisonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <DashboardComparisonChart 
            data={chartData} 
            comparisonType={comparisonType} 
          />
        </CardContent>
      </Card>

      {/* Группированные метрики */}
      {metricGroups.map((group) => (
        <DashboardMetricGroup
          key={group.title}
          group={group}
          data={comparisonData}
        />
      ))}
    </div>
  );
};

export default DashboardPeriodComparison;
