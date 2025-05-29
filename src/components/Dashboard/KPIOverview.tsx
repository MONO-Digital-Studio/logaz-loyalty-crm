
import React from 'react';
import { DollarSign, CreditCard, Users, Fuel, UserCheck, TrendingDown } from 'lucide-react';
import KPICard from './KPICard';
import { mockKPIData } from '@/data/dashboardMockData';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/dashboardFormatters';

const KPIOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <KPICard
        title="Общие продажи"
        data={mockKPIData.totalSales}
        icon={DollarSign}
        formatter={formatCurrency}
        borderColor="border-l-logaz-blue"
      />
      
      <KPICard
        title="Общий объем"
        data={mockKPIData.totalVolume}
        icon={Fuel}
        formatter={formatNumber}
        suffix=" т/м³"
        borderColor="border-l-logaz-orange"
      />
      
      <KPICard
        title="Средний чек"
        data={mockKPIData.avgTicket}
        icon={CreditCard}
        formatter={formatCurrency}
        borderColor="border-l-green-500"
      />
      
      <KPICard
        title="Всего клиентов"
        data={mockKPIData.totalCustomers}
        icon={UserCheck}
        formatter={formatNumber}
        borderColor="border-l-purple-500"
      />
      
      <KPICard
        title="Активные клиенты"
        data={mockKPIData.activeCustomers}
        icon={Users}
        formatter={formatNumber}
        borderColor="border-l-blue-500"
      />
      
      <KPICard
        title="Отток клиентов"
        data={mockKPIData.churnRate}
        icon={TrendingDown}
        formatter={(value) => formatPercent(value)}
        borderColor="border-l-red-500"
      />
    </div>
  );
};

export default KPIOverview;
