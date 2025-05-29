
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesClientsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Клиенты ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление корпоративными клиентами
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Список корпоративных клиентов</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться таблица с корпоративными клиентами
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesClientsPage;
