
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { useDashboardPeriodComparison } from '@/hooks/useDashboardPeriodComparison';
import { ComparisonType } from '@/types/periodComparison';
import PeriodComparisonCard from '@/components/ContactCenter/PeriodComparisonCard';
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
    return new Intl.NumberFormat('ru-RU').format(value);
  };

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
    <Card className="stats-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold font-montserrat">
              Сравнение периодов
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Анализ динамики ключевых показателей
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
      <CardContent className="pt-0 space-y-6">
        {/* Метрики сравнения */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <PeriodComparisonCard
            data={comparisonData.revenue}
            title="Выручка"
            icon={<DollarSign size={20} className="text-logaz-blue" />}
            formatter={formatCurrency}
          />
          
          <PeriodComparisonCard
            data={comparisonData.pointsEarned}
            title="Баллы заработанные"
            icon={<TrendingUp size={20} className="text-logaz-orange" />}
            formatter={formatNumber}
          />
          
          <PeriodComparisonCard
            data={comparisonData.pointsSpent}
            title="Баллы потраченные"
            icon={<Award size={20} className="text-logaz-green" />}
            formatter={formatNumber}
          />
          
          <PeriodComparisonCard
            data={comparisonData.activeClients}
            title="Активные клиенты"
            icon={<Users size={20} className="text-purple-600" />}
            formatter={formatNumber}
          />
        </div>

        {/* График сравнения */}
        <DashboardComparisonChart 
          data={chartData} 
          comparisonType={comparisonType} 
        />
      </CardContent>
    </Card>
  );
};

export default DashboardPeriodComparison;
