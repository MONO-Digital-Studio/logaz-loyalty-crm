
import React from 'react';
import DashboardLayout from '@/components/Dashboard/layouts/DashboardLayout';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import SalesChart from '@/components/Dashboard/SalesChart';
import SalesStructureChart from '@/components/Dashboard/SalesStructureChart';
import AvgTicketChart from '@/components/Dashboard/AvgTicketChart';
import CustomerDynamicsChart from '@/components/Dashboard/CustomerDynamicsChart';
import VolumeTable from '@/components/Dashboard/VolumeTable';
import CustomerAnalytics from '@/components/Dashboard/CustomerAnalytics';
import DashboardPeriodComparison from '@/components/Dashboard/DashboardPeriodComparison';
import { useDashboardState } from '@/components/Dashboard/hooks/useDashboardState';

const DashboardPageRefactored: React.FC = () => {
  const { state } = useDashboardState();

  return (
    <DashboardLayout
      header={<DashboardHeader />}
      className="dashboard-page"
    >
      {/* KPI Overview */}
      <KPIOverview />

      {/* Period Comparison Section */}
      <DashboardPeriodComparison />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <SalesStructureChart />
        <AvgTicketChart />
        <CustomerDynamicsChart />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolumeTable />
        <CustomerAnalytics />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPageRefactored;
