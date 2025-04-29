
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ActivityData {
  month: string;
  расходы: number;
  визиты: number;
}

interface ClientActivityProps {
  data: ActivityData[];
}

const ClientActivity: React.FC<ClientActivityProps> = ({ data }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Активность клиента</CardTitle>
        <CardDescription>Расходы и визиты за последние 6 месяцев</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="расходы" 
              stroke="#3B55A2" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="визиты" 
              stroke="#FB8607" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientActivity;
