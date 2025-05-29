
import React from 'react';
import DashboardLayout from '@/components/Dashboard/layouts/DashboardLayout';
import Layout from '@/components/Layout/Layout';

const LegalEntitiesDashboard = () => {
  return (
    <Layout>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Дашборд для юридических лиц</h1>
            <p className="text-muted-foreground mt-1">
              Управление корпоративными клиентами и топливными картами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Активные клиенты</h3>
              <p className="text-3xl font-bold text-logaz-blue">247</p>
              <p className="text-sm text-green-600">↗ +12% за месяц</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Топливные карты</h3>
              <p className="text-3xl font-bold text-logaz-blue">1,584</p>
              <p className="text-sm text-green-600">↗ +8% за месяц</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Оборот за месяц</h3>
              <p className="text-3xl font-bold text-logaz-blue">₽12.5М</p>
              <p className="text-sm text-green-600">↗ +15% за месяц</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Средний чек</h3>
              <p className="text-3xl font-bold text-logaz-blue">₽8,450</p>
              <p className="text-sm text-red-600">↘ -3% за месяц</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Быстрые действия</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-logaz-blue text-logaz-blue rounded-lg hover:bg-logaz-blue hover:text-white transition-colors">
                Добавить клиента
              </button>
              <button className="p-4 border border-logaz-blue text-logaz-blue rounded-lg hover:bg-logaz-blue hover:text-white transition-colors">
                Выпустить карту
              </button>
              <button className="p-4 border border-logaz-blue text-logaz-blue rounded-lg hover:bg-logaz-blue hover:text-white transition-colors">
                Сформировать отчет
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default LegalEntitiesDashboard;
