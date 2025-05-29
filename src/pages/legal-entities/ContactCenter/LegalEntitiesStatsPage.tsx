
import React from 'react';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesStatsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Статистика ЮЛ</h1>
          <p className="text-muted-foreground mt-1">
            Статистика контакт-центра для юридических лиц
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Основные показатели</h3>
          <p className="text-muted-foreground">
            Здесь будет отображаться статистика работы контакт-центра
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalEntitiesStatsPage;
