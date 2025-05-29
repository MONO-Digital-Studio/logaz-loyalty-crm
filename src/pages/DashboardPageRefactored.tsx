
import React from 'react';
import KPIOverview from '@/components/Dashboard/KPIOverview';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - with KPI');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Debug info */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-800">
            ✅ Базовая страница работает. Добавляем KPI компоненты...
          </p>
        </div>
        
        {/* KPI Overview */}
        <div className="mb-6">
          <KPIOverview />
        </div>
        
        {/* Placeholder for future components */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Следующие компоненты</h2>
          <p className="text-gray-700">
            Графики и аналитика будут добавлены далее...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRefactored;
