
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesAnalyticsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Аналитика ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Аналитика и отчеты по корпоративным клиентам
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Аналитические отчеты</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться детальная аналитика по ЮЛ
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesAnalyticsPage;
