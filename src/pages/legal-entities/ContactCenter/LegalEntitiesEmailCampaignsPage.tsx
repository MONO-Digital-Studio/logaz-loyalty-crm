
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesEmailCampaignsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Email кампании ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление email кампаниями для корпоративных клиентов
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Активные кампании</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться список email кампаний для ЮЛ
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesEmailCampaignsPage;
