
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { loyaltyStats } from '@/data/mockData';

const LoyaltyPointsChart: React.FC = () => {
  return (
    <div className="stats-card p-6">
      <h3 className="text-lg font-semibold mb-4 font-montserrat">Баллы лояльности</h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={loyaltyStats}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pointsEarned" fill="#3B55A2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pointsSpent" fill="#FB8607" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pointsExpired" fill="#F44336" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoyaltyPointsChart;
