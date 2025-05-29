
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface OptimizedMetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  icon: LucideIcon;
  suffix?: string;
  loading?: boolean;
  className?: string;
}

const OptimizedMetricCard: React.FC<OptimizedMetricCardProps> = memo(({
  title,
  value,
  change,
  icon: Icon,
  suffix = '',
  loading = false,
  className = ''
}) => {
  if (loading) {
    return (
      <Card className={`bg-white border border-gray-200 shadow-sm ${className}`}>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 truncate">{title}</h3>
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {value}{suffix}
          </div>
          
          {change && (
            <div className={`flex items-center text-sm ${
              change.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">{change.text}</span>
              <span>{change.isPositive ? '↗' : '↘'}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.loading === nextProps.loading &&
    JSON.stringify(prevProps.change) === JSON.stringify(nextProps.change)
  );
});

OptimizedMetricCard.displayName = 'OptimizedMetricCard';

export default OptimizedMetricCard;
