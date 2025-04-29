
import React from "react";
import { Card } from "@/components/ui/card";

interface ClientSummaryProps {
  points: number;
  totalSpent: number;
  visits: number;
  rfmScore: string;
}

const ClientSummary: React.FC<ClientSummaryProps> = ({ points, totalSpent, visits, rfmScore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Баланс баллов</span>
          <span className="text-2xl font-bold text-logaz-blue">{points}</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Сумма покупок</span>
          <span className="text-2xl font-bold text-logaz-blue">{totalSpent} ₽</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">Число визитов</span>
          <span className="text-2xl font-bold text-logaz-blue">{visits}</span>
        </div>
      </Card>
      <Card className="stats-card">
        <div className="flex flex-col p-4">
          <span className="text-sm text-gray-500">RFM-сегмент</span>
          <span className="text-2xl font-bold text-logaz-blue">{rfmScore}</span>
        </div>
      </Card>
    </div>
  );
};

export default ClientSummary;
