
import React from 'react';
import DashboardLayout from '@/components/Dashboard/layouts/DashboardLayout';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';

const DashboardPageRefactored: React.FC = () => {
  return (
    <DashboardLayout
      header={<DashboardHeader />}
      className="dashboard-page"
    >
      {/* Основной контент дашборда убран по запросу пользователя */}
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Элементы дашборда удалены</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPageRefactored;
