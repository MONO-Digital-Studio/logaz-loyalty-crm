
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCustomerData } from '@/data/dashboardMockData';
import { formatNumber } from '@/utils/dashboardFormatters';

const CustomerDynamicsChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">День {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(Math.round(entry.value))}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Динамика клиентской базы</CardTitle>
        <p className="text-sm text-gray-500">Общая и активная база клиентов</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={mockCustomerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}к`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="total"
              stackId="1"
              stroke="#9CA3AF"
              fill="#9CA3AF"
              fillOpacity={0.3}
              name="Общая база"
            />
            <Area
              type="monotone"
              dataKey="active"
              stackId="2"
              stroke="#059669"
              fill="#059669"
              fillOpacity={0.6}
              name="Активные клиенты"
            />
            <Area
              type="monotone"
              dataKey="new"
              stackId="3"
              stroke="#3B82F6"
              fill="none"
              strokeWidth={2}
              name="Новые клиенты"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerDynamicsChart;
