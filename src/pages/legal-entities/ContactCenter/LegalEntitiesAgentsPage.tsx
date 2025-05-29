
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesAgentsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Агенты ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление агентами контакт-центра для ЮЛ
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Список агентов</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться список агентов и их статистика
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesAgentsPage;
