
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BaseChartProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  height?: number;
}

const BaseChart: React.FC<BaseChartProps> = memo(({ 
  title, 
  subtitle, 
  children, 
  className = "", 
  height = 350 
}) => {
  return (
    <Card className={`bg-white border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
});

BaseChart.displayName = 'BaseChart';

export default BaseChart;
