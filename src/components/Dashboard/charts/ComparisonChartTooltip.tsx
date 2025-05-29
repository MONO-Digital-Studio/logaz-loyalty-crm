
import React from 'react';

interface ComparisonChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const ComparisonChartTooltip: React.FC<ComparisonChartTooltipProps> = ({ active, payload, label }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(Number(entry.value))}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default ComparisonChartTooltip;
