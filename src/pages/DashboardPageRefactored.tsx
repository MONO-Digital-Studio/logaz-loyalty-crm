
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { 
  OptimizedSalesChart, 
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

        {/* Volume Table - Full Width */}
        <div className="mb-6">
          <VolumeTable />
        </div>

        {/* Volume Chart - Full Width */}
        <div className="mb-6">
          <VolumeChart />
        </div>

        {/* Charts Grid - Structure and Ticket under Volume Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OptimizedSalesStructureChart />
          <OptimizedAvgTicketChart />
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <PerformanceMetrics />
        </div>
        
        {/* Customer Dynamics Chart */}
        <div className="mb-6">
          <OptimizedCustomerDynamicsChart />
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
