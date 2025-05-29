
import React from 'react';
import Layout from '@/components/Layout/Layout';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import GasStationsTable from '@/components/GasStations/GasStationsTable';
import { useGasStationsData } from '@/hooks/useGasStationsData';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatNumber } from '@/utils/dashboardFormatters';
import { Fuel, Receipt, Users, Gift } from 'lucide-react';

const GasStationsPage: React.FC = () => {
  const { data, totals, loading } = useGasStationsData();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Заправочные станции</h1>
        </div>

        {/* Dashboard Header с фильтрами */}
        <DashboardHeader />

        {/* Сводная статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Всего операций</p>
                <p className="text-2xl font-bold">{formatNumber(totals.operations)}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Реализация (л)</p>
                <p className="text-2xl font-bold">{formatNumber(totals.volume)}</p>
              </div>
              <Fuel className="h-8 w-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Общие продажи</p>
                <p className="text-2xl font-bold">{formatCurrency(totals.sales)}</p>
              </div>
              <Receipt className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Уникальные клиенты</p>
                <p className="text-2xl font-bold">{formatNumber(totals.uniqueCustomers)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Таблица заправочных станций */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Детализация по заправочным станциям</h2>
          
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Загрузка данных...</span>
              </div>
            </div>
          ) : (
            <GasStationsTable data={data} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GasStationsPage;
