
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PeriodComparison } from '@/types/periodComparison';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PeriodComparisonCardProps {
  data: PeriodComparison;
  title: string;
  icon?: React.ReactNode;
  formatter?: (value: number) => string;
}

const PeriodComparisonCard: React.FC<PeriodComparisonCardProps> = ({
  data,
  title,
  icon,
  formatter = (value) => value.toString()
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="stats-card cursor-help">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-500 mb-1 truncate">{title}</h4>
                  <p className="text-xl font-bold mb-2">{formatter(data.currentPeriod.value)}</p>
                  
                  <div className="flex items-center">
                    <span 
                      className={`flex items-center text-sm ${
                        data.isPositiveChange ? 'text-logaz-green' : 'text-logaz-red'
                      }`}
                    >
                      {data.isPositiveChange ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {data.changePercent.toFixed(1)}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      vs {data.previousPeriod.period}
                    </span>
                  </div>
                </div>
                
                {icon && (
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 bg-logaz-blue bg-opacity-10 rounded-full flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="text-sm">
            <p><strong>Текущий период:</strong> {formatter(data.currentPeriod.value)} ({data.currentPeriod.period})</p>
            <p><strong>Предыдущий период:</strong> {formatter(data.previousPeriod.value)} ({data.previousPeriod.period})</p>
            <p><strong>Изменение:</strong> {data.isPositiveChange ? '+' : '-'}{formatter(data.changeAbsolute)} ({data.isPositiveChange ? '+' : '-'}{data.changePercent.toFixed(1)}%)</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PeriodComparisonCard;
