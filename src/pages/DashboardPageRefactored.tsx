
import React from 'react';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { OptimizedSalesChart, OptimizedLoyaltyChart, OptimizedDemographicsCharts } from '@/components/Dashboard/charts';
import SalesStructureChart from '@/components/Dashboard/SalesStructureChart';
import AvgTicketChart from '@/components/Dashboard/AvgTicketChart';
import CustomerDynamicsChart from '@/components/Dashboard/CustomerDynamicsChart';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - full dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Debug info */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-800">
            ✅ Полный дашборд с KPI и графиками
          </p>
        </div>
        
        {/* KPI Overview */}
        <div className="mb-6">
          <KPIOverview />
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedSalesChart />
          <SalesStructureChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AvgTicketChart />
          <CustomerDynamicsChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedLoyaltyChart />
          <OptimizedDemographicsCharts />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRefactored;
