import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { 
  OptimizedSalesChart, 
  OptimizedLoyaltyChart, 
  OptimizedDemographicsCharts,
  OptimizedSalesStructureChart,
  OptimizedAvgTicketChart,
  OptimizedCustomerDynamicsChart,
  VolumeChart
} from '@/components/Dashboard/charts';
import VolumeTable from '@/components/Dashboard/VolumeTable';
import CustomerAnalytics from '@/components/Dashboard/CustomerAnalytics';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - optimized dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header with filters */}
        <div className="mb-6">
          <DashboardHeader />
        </div>
        
        {/* KPI Overview */}
        <div className="mb-6">
          <KPIOverview />
        </div>

        {/* Sales Chart - Full Width */}
        <div className="mb-6">
          <OptimizedSalesChart />
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <PerformanceMetrics />
        </div>
        
        {/* Charts Grid - Structure and Ticket */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedSalesStructureChart />
          <OptimizedAvgTicketChart />
        </div>
        
        {/* Charts Grid - Customer Dynamics and Loyalty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedCustomerDynamicsChart />
          <OptimizedLoyaltyChart />
        </div>
        
        {/* Demographics Charts - Full Width */}
        <div className="mb-6">
          <OptimizedDemographicsCharts />
        </div>

        {/* Volume Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <VolumeChart />
          <VolumeTable />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CustomerAnalytics />
          <RfmAnalysis />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRefactored;
