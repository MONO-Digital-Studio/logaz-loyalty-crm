
import React, { memo } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import BaseChart from './BaseChart';
import { useDashboardData } from '@/hooks/useDashboardData';

const OptimizedDemographicsCharts: React.FC = memo(() => {
  const { data } = useDashboardData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseChart title="Портрет клиента: возраст">
        <ResponsiveContainer>
          <BarChart data={data.demographicData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="percentage" 
              fill="#3B55A2" 
              radius={[4, 4, 0, 0]}
              label={{ position: 'center', fill: 'white', fontSize: 12, formatter: (value: number) => `${value}%` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </BaseChart>
      
      <BaseChart title="Портрет клиента: пол">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data.genderData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="percentage"
              nameKey="gender"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="central"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#3B55A2" : "#FB8607"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </BaseChart>
    </div>
  );
});

OptimizedDemographicsCharts.displayName = 'OptimizedDemographicsCharts';

export default OptimizedDemographicsCharts;
