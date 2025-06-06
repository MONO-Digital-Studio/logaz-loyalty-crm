
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
  tooltip?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeText,
  icon,
  color = 'bg-logaz-blue',
  className = '',
  tooltip,
}) => {
  const isPositiveChange = change && change > 0;

  const cardContent = (
    <div className={`stats-card w-full ${className}`}>
      <div className="flex items-start justify-between w-full">
        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-gray-500 font-medium text-xs sm:text-sm font-montserrat mb-1 truncate w-full">{title}</h3>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate w-full">{value}</p>
          
          {(change !== undefined || changeText) && (
            <div className="flex items-center mt-1 sm:mt-2 w-full">
              {change !== undefined && (
                <span 
                  className={`flex items-center text-xs sm:text-sm ${
                    isPositiveChange ? 'text-logaz-green' : 'text-logaz-red'
                  }`}
                >
                  {isPositiveChange ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(change)}%
                </span>
              )}
              {changeText && (
                <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2 truncate flex-1">{changeText}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-1.5 sm:p-2 rounded-full ${color} bg-opacity-10 flex-shrink-0 ml-2`}>
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {React.cloneElement(icon as React.ReactElement, { 
                size: typeof window !== 'undefined' && window.innerWidth >= 640 ? 24 : 20 
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
};

export default StatsCard;
