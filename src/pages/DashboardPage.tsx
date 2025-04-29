
import React from 'react';
import StatsSummary from '@/components/Dashboard/StatsSummary';
import { ChartContainer } from '@/components/ui/chart';
import SalesChart from '@/components/Dashboard/SalesChart';
import LoyaltyPointsChart from '@/components/Dashboard/LoyaltyPointsChart';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import CustomerDemographics from '@/components/Dashboard/CustomerDemographics';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';

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

      <StatsSummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <LoyaltyPointsChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RfmAnalysis />
        <CustomerDemographics />
      </div>
      
      <PerformanceMetrics />
    </div>
  );
};

export default DashboardPage;
