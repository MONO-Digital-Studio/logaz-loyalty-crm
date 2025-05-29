import React from 'react';
import { BadgeRussianRuble, CreditCard, Users, Fuel, UserCheck, TrendingDown } from 'lucide-react';
import KPICard from './KPICard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/dashboardFormatters';

const KPIOverview: React.FC = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <KPICard
        title="Продажи"
        data={data.kpiData.totalSales}
        icon={BadgeRussianRuble}
        formatter={formatCurrency}
        borderColor="border-l-logaz-blue"
      />
      
      <KPICard
        title="Реализация"
        data={data.kpiData.totalVolume}
        icon={Fuel}
        formatter={formatNumber}
        suffix=" т/м³"
        borderColor="border-l-logaz-orange"
      />
      
      <KPICard
        title="Средний чек"
        data={data.kpiData.avgTicket}
        icon={CreditCard}
        formatter={formatCurrency}
        borderColor="border-l-green-500"
      />
      
      <KPICard
        title="Всего клиентов"
        data={data.kpiData.totalCustomers}
        icon={UserCheck}
        formatter={formatNumber}
        borderColor="border-l-purple-500"
      />
      
      <KPICard
        title="Активные клиенты"
        data={data.kpiData.activeCustomers}
        icon={Users}
        formatter={formatNumber}
        borderColor="border-l-blue-500"
      />
      
      <KPICard
        title="Отток клиентов"
        data={data.kpiData.churnRate}
        icon={TrendingDown}
        formatter={(value) => formatPercent(value)}
        borderColor="border-l-red-500"
      />
    </div>
  );
};

export default KPIOverview;
