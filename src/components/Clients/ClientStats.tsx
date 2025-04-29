
import React from 'react';
import { Card } from '@/components/ui/card';

interface ClientStatsProps {
  totalClients: number;
  activeClients: number;
  newClients: number;
  averageCheck: number;
}

const ClientStats: React.FC<ClientStatsProps> = ({
  totalClients,
  activeClients,
  newClients,
  averageCheck
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Всего клиентов</span>
          <span className="text-2xl font-bold text-logaz-blue">{totalClients}</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Активных за месяц</span>
          <span className="text-2xl font-bold text-logaz-blue">{activeClients}</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Новых за месяц</span>
          <span className="text-2xl font-bold text-logaz-blue">{newClients}</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Средний чек</span>
          <span className="text-2xl font-bold text-logaz-blue">{averageCheck} ₽</span>
        </div>
      </Card>
    </div>
  );
};

export default ClientStats;
