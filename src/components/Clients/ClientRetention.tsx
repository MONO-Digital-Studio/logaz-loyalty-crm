
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RetentionData {
  month: string;
  retention: number;
}

interface ClientRetentionProps {
  data: RetentionData[];
}

const ClientRetention: React.FC<ClientRetentionProps> = ({ data }) => {
  const averageRetention = Math.round(
    data.reduce((sum, item) => sum + item.retention, 0) / data.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Удержание клиентов</CardTitle>
        <CardDescription>
          Средний показатель: {averageRetention}%
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Area 
              type="monotone" 
              dataKey="retention" 
              stroke="#3B55A2" 
              fill="#3B55A2" 
              fillOpacity={0.3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientRetention;
