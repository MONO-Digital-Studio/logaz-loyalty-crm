
import React from 'react';
import AnalyticsDashboard from '@/components/ContactCenter/AnalyticsDashboard';

const LegalEntitiesAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl lg:text-3xl font-syncopate font-bold">Аналитика контакт-центра ЮЛ</h1>
      </div>
      
      <AnalyticsDashboard />
    </div>
  );
};

export default LegalEntitiesAnalyticsPage;
