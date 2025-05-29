
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import SalesChart from '@/components/Dashboard/SalesChart';
import SalesStructureChart from '@/components/Dashboard/SalesStructureChart';
import AvgTicketChart from '@/components/Dashboard/AvgTicketChart';
import CustomerDynamicsChart from '@/components/Dashboard/CustomerDynamicsChart';
import VolumeTable from '@/components/Dashboard/VolumeTable';
import CustomerAnalytics from '@/components/Dashboard/CustomerAnalytics';
import DashboardPeriodComparison from '@/components/Dashboard/DashboardPeriodComparison';

const NewDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header Controls */}
        <DashboardHeader />

        {/* KPI Overview */}
        <KPIOverview />

        {/* Period Comparison Section */}
        <DashboardPeriodComparison />

        {/* Main Charts Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <SalesStructureChart />
          <AvgTicketChart />
          <CustomerDynamicsChart />
        </div>

        {/* Trend Charts Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeTable />
          <CustomerAnalytics />
        </div>
      </div>
    </div>
  );
};

export default NewDashboardPage;
