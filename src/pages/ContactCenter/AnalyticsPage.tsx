
import React from 'react';
import AnalyticsDashboard from '@/components/ContactCenter/AnalyticsDashboard';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Аналитика контакт-центра</h1>
      </div>
      
      <AnalyticsDashboard />
    </div>
  );
};

export default AnalyticsPage;
