
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesTemplatesPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Шаблоны ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление шаблонами сообщений для корпоративных клиентов
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Шаблоны сообщений</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться список шаблонов для ЮЛ
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesTemplatesPage;
