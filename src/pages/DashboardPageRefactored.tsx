
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { OptimizedSalesChart, OptimizedLoyaltyChart, OptimizedDemographicsCharts } from '@/components/Dashboard/charts';
import SalesStructureChart from '@/components/Dashboard/SalesStructureChart';
import AvgTicketChart from '@/components/Dashboard/AvgTicketChart';
import CustomerDynamicsChart from '@/components/Dashboard/CustomerDynamicsChart';
import VolumeTable from '@/components/Dashboard/VolumeTable';
import CustomerAnalytics from '@/components/Dashboard/CustomerAnalytics';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';
import StatsSummary from '@/components/Dashboard/StatsSummary';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - full dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Debug info */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-800">
            ✅ Полный дашборд с KPI и графиками
          </p>
        </div>

        {/* Dashboard Header with filters */}
        <div className="mb-6">
          <DashboardHeader />
        </div>
        
        {/* KPI Overview */}
        <div className="mb-6">
          <KPIOverview />
        </div>

        {/* Stats Summary */}
        <div className="mb-6">
          <StatsSummary />
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <PerformanceMetrics />
        </div>
        
        {/* Charts Grid - Sales and Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <OptimizedSalesChart />
          </div>
          <div className="relative">
            <SalesStructureChart />
          </div>
        </div>
        
        {/* Charts Grid - Ticket and Customer Dynamics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <AvgTicketChart />
          </div>
          <div className="relative">
            <CustomerDynamicsChart />
          </div>
        </div>
        
        {/* Charts Grid - Loyalty and Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <OptimizedLoyaltyChart />
          </div>
          <div className="relative">
            <OptimizedDemographicsCharts />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <CustomerAnalytics />
          </div>
          <div className="relative">
            <RfmAnalysis />
          </div>
        </div>

        {/* Volume Table - Full Width */}
        <div className="mb-6">
          <VolumeTable />
        </div>
      </div>
      
      {/* CSS для скрытия застрявших tooltip'ов */}
      <style>{`
        .recharts-tooltip-wrapper {
          pointer-events: none !important;
        }
        
        .recharts-tooltip-wrapper:not(:hover) {
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        /* Скрыть все возможные застрявшие tooltip'ы */
        [data-tooltip]:not(:hover) {
          opacity: 0 !important;
        }
        
        /* Принудительно скрыть элементы с текстом о сумме, если они вне контекста */
        div:not(.recharts-tooltip-wrapper):not(.stats-card) {
          position: relative !important;
        }
      `}</style>
    </div>
  );
};

export default DashboardPageRefactored;
