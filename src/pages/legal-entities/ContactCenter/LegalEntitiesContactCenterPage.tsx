
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesContactCenterPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Контакт-центр ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Управление коммуникациями с корпоративными клиентами
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Обзор контакт-центра</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться статистика и основные показатели контакт-центра для ЮЛ
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesContactCenterPage;
