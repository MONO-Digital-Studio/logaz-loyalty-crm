
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { loyaltyActivityData } from '@/data/loyaltyData';

const LoyaltyStatistics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика баллов</CardTitle>
        <CardDescription>
          Активность по начислению и использованию баллов за 6 месяцев
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={loyaltyActivityData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="начислено" fill="#3B55A2" />
            <Bar dataKey="использовано" fill="#FB8607" />
            <Bar dataKey="сгорело" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LoyaltyStatistics;
