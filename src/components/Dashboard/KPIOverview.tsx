
import React from 'react';
import { Fuel, TrendingDown } from 'lucide-react';
import KPICard from './KPICard';
import { mockKPIData } from '@/data/dashboardMockData';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/dashboardFormatters';

const KPIOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <KPICard
        title="Продажи"
        data={mockKPIData.totalSales}
        icon={Fuel}
        formatter={formatCurrency}
        borderColor="border-l-logaz-blue"
      />
      
      <KPICard
        title="Реализация"
        data={mockKPIData.totalVolume}
        icon={Fuel}
        formatter={formatNumber}
        suffix=" т/м³"
        borderColor="border-l-logaz-orange"
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
