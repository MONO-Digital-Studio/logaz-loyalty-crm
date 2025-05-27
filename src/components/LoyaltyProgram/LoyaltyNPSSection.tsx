
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const npsData = [
  { month: 'Янв', nps: 62 },
  { month: 'Фев', nps: 65 },
  { month: 'Мар', nps: 63 },
  { month: 'Апр', nps: 67 },
  { month: 'Май', nps: 65 },
  { month: 'Июн', nps: 68 }
];

const LoyaltyNPSSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Индекс лояльности клиентов (NPS)</CardTitle>
        <CardDescription>
          Оценка лояльности клиентов к бренду на основе опросов
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Текущий NPS</h3>
            <p className="text-4xl font-bold mt-2 text-logaz-blue">68%</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Промоутеры</h3>
            <p className="text-4xl font-bold mt-2 text-green-500">72%</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Критики</h3>
            <p className="text-4xl font-bold mt-2 text-red-500">4%</p>
          </Card>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Динамика NPS</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={npsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="nps" fill="#3B55A2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <Button variant="outline">Настроить опросы NPS</Button>
      </CardContent>
    </Card>
  );
};

export default LoyaltyNPSSection;
