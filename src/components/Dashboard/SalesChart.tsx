
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockSalesData, fuelColors } from '@/data/dashboardMockData';
import { formatCurrency } from '@/utils/dashboardFormatters';

const SalesChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
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
        <CardTitle className="text-lg font-semibold">Динамика продаж</CardTitle>
        <p className="text-sm text-gray-500">Продажи по дням недели</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}к`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="methane" stackId="a" name="Метан" fill={fuelColors.methane} />
            <Bar dataKey="propane" stackId="a" name="Пропан" fill={fuelColors.propane} />
            <Bar dataKey="ai92" stackId="a" name="АИ-92" fill={fuelColors.ai92} />
            <Bar dataKey="ai95" stackId="a" name="АИ-95" fill={fuelColors.ai95} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
