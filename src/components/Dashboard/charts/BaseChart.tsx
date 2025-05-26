
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BaseChartProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BaseChart: React.FC<BaseChartProps> = memo(({ title, children, className = "" }) => {
  return (
    <Card className={`stats-card ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold font-montserrat">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div style={{ width: '100%', height: 350 }}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
});

BaseChart.displayName = 'BaseChart';

export default BaseChart;
