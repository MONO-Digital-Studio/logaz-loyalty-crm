
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesDialogsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Диалоги ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление диалогами с корпоративными клиентами
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Активные диалоги</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться список диалогов с корпоративными клиентами
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesDialogsPage;
