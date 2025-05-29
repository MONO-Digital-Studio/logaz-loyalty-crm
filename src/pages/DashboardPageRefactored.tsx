
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { 
  OptimizedSalesChart, 
  OptimizedLoyaltyChart, 
  OptimizedDemographicsCharts,
  OptimizedSalesStructureChart,
  OptimizedAvgTicketChart,
  OptimizedCustomerDynamicsChart
} from '@/components/Dashboard/charts';
import VolumeTable from '@/components/Dashboard/VolumeTable';
import CustomerAnalytics from '@/components/Dashboard/CustomerAnalytics';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';
import StatsSummary from '@/components/Dashboard/StatsSummary';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - optimized dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Debug info */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-800">
            ✅ Оптимизированный дашборд с мемоизированными компонентами
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
          <OptimizedSalesChart />
          <OptimizedSalesStructureChart />
        </div>
        
        {/* Charts Grid - Ticket and Customer Dynamics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedAvgTicketChart />
          <OptimizedCustomerDynamicsChart />
        </div>
        
        {/* Charts Grid - Loyalty and Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedLoyaltyChart />
          <OptimizedDemographicsCharts />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CustomerAnalytics />
          <RfmAnalysis />
        </div>

        {/* Volume Table - Full Width */}
        <div className="mb-6">
          <VolumeTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRefactored;
