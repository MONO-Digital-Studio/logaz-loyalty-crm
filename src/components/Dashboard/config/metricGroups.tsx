
import React from 'react';
import { 
  DollarSign, 
  Users, 
  Award, 
  CreditCard,
  Fuel,
  UserCheck,
  TrendingDown,
  TrendingUp,
  Star,
  Percent,
  RotateCcw
} from 'lucide-react';
import { MetricGroup } from '@/types/dashboardComparison';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
};

export const formatPercent = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export const formatDecimal = (value: number) => {
  return value.toFixed(1);
};

export const metricGroups: MetricGroup[] = [
  {
    title: 'Финансовые показатели',
    description: 'Динамика продаж, выручка и средний чек',
    icon: () => <DollarSign size={24} className="text-logaz-blue" />,
    metrics: [
      {
        key: 'revenue',
        title: 'Выручка',
        icon: () => <DollarSign size={20} className="text-logaz-blue" />,
        formatter: formatCurrency
      },
      {
        key: 'averageCheck',
        title: 'Средний чек',
        icon: () => <CreditCard size={20} className="text-green-600" />,
        formatter: formatCurrency
      }
    ]
  },
  {
    title: 'Показатели реализации топлива',
    description: 'Продажи по видам топлива',
    icon: () => <Fuel size={24} className="text-logaz-orange" />,
    metrics: [
      {
        key: 'propaneSales',
        title: 'Пропан',
        icon: () => <Fuel size={20} className="text-orange-600" />,
        formatter: formatCurrency
      },
      {
        key: 'methaneSales',
        title: 'Метан',
        icon: () => <Fuel size={20} className="text-blue-600" />,
        formatter: formatCurrency
      },
      {
        key: 'ai92Sales',
        title: 'АИ-92',
        icon: () => <Fuel size={20} className="text-yellow-600" />,
        formatter: formatCurrency
      },
      {
        key: 'ai95Sales',
        title: 'АИ-95',
        icon: () => <Fuel size={20} className="text-red-600" />,
        formatter: formatCurrency
      }
    ]
  },
  {
    title: 'Клиенты',
    description: 'Общее количество, активность и отток клиентов',
    icon: () => <Users size={24} className="text-purple-600" />,
    metrics: [
      {
        key: 'totalClients',
        title: 'Всего клиентов',
        icon: () => <Users size={20} className="text-purple-600" />,
        formatter: formatNumber
      },
      {
        key: 'activeClients',
        title: 'Активные клиенты',
        icon: () => <UserCheck size={20} className="text-green-600" />,
        formatter: formatNumber
      },
      {
        key: 'clientChurn',
        title: 'Отток клиентов',
        icon: () => <TrendingDown size={20} className="text-red-600" />,
        formatter: formatNumber
      }
    ]
  },
  {
    title: 'Лояльность',
    description: 'Баллы, индексы и конверсия программы лояльности',
    icon: () => <Award size={24} className="text-logaz-green" />,
    metrics: [
      {
        key: 'pointsEarned',
        title: 'Баллы заработанные',
        icon: () => <TrendingUp size={20} className="text-logaz-orange" />,
        formatter: formatNumber
      },
      {
        key: 'pointsSpent',
        title: 'Баллы потраченные',
        icon: () => <Award size={20} className="text-logaz-green" />,
        formatter: formatNumber
      },
      {
        key: 'loyaltyIndex',
        title: 'Индекс лояльности',
        icon: () => <Star size={20} className="text-yellow-600" />,
        formatter: formatDecimal
      },
      {
        key: 'loyaltyConversion',
        title: 'Конверсия программы',
        icon: () => <Percent size={20} className="text-blue-600" />,
        formatter: formatPercent
      },
      {
        key: 'fuellingFrequency',
        title: 'Частота заправок',
        icon: () => <RotateCcw size={20} className="text-indigo-600" />,
        formatter: formatDecimal
      }
    ]
  }
];
