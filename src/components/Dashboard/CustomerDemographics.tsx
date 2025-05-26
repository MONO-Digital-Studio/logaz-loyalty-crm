

import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { demographicData, genderData } from '@/data/mockData';

const CustomerDemographics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="stats-card p-6">
        <h3 className="text-lg font-semibold mb-4 font-montserrat">Портрет клиента: возраст</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <BarChart data={demographicData}>
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
        </div>
      </div>
      
      <div className="stats-card p-6">
        <h3 className="text-lg font-semibold mb-4 font-montserrat">Портрет клиента: пол</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={genderData}
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
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#3B55A2" : "#FB8607"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerDemographics;

