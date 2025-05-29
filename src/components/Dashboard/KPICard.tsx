
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatNumber, formatChange } from '@/utils/dashboardFormatters';
import { DashboardKPI } from '@/types/dashboard';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  data: DashboardKPI;
  icon: LucideIcon;
  formatter?: (value: number) => string;
  suffix?: string;
  borderColor?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  data, 
  icon: Icon, 
  formatter = formatNumber,
  suffix = '',
  borderColor = 'border-l-logaz-blue'
}) => {
  const change = formatChange(data.change);

  return (
    <Card className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 ${borderColor}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 truncate">{title}</h3>
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {formatter(data.current)}{suffix}
          </div>
          
          <div className={`flex items-center text-sm ${change.color}`}>
            <span className="mr-1">{change.text}</span>
            <span>{change.icon}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
