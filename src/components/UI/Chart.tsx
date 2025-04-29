
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

interface ChartProps {
  data: any[];
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  xKey: string;
  yKey: string | string[];
  colors?: string[];
  height?: number;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  title,
  type,
  xKey,
  yKey,
  colors = ['#3B55A2', '#FB8607', '#4CAF50', '#F44336', '#9C27B0'],
  height = 300,
  className = '',
}) => {
  // Преобразуем yKey в массив для единообразной обработки
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey={yKeys[0]}
              nameKey={xKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                fill={colors[index % colors.length]}
                stroke={colors[index % colors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`stats-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4 font-montserrat">{title}</h3>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
