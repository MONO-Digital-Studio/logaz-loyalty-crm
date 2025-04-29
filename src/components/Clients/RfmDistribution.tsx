
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RfmData {
  name: string;
  value: number;
}

interface RfmDistributionProps {
  data: RfmData[];
}

const RfmDistribution: React.FC<RfmDistributionProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RFM-сегментация</CardTitle>
        <CardDescription>Распределение клиентов по сегментам</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B55A2" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <Button variant="default" size="sm" className="w-full bg-logaz-blue">
            Аналитика RFM
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RfmDistribution;
