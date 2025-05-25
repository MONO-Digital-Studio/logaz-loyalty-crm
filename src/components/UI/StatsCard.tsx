
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeText,
  icon,
  color = 'bg-logaz-blue',
  className = '',
}) => {
  const isPositiveChange = change && change > 0;

  return (
    <div className={`stats-card w-full ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-500 font-medium text-sm font-montserrat mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          
          {(change !== undefined || changeText) && (
            <div className="flex items-center mt-2">
              {change !== undefined && (
                <span 
                  className={`flex items-center text-sm ${
                    isPositiveChange ? 'text-logaz-green' : 'text-logaz-red'
                  }`}
                >
                  {isPositiveChange ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(change)}%
                </span>
              )}
              {changeText && (
                <span className="text-gray-500 text-sm ml-2">{changeText}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-2 rounded-full ${color} bg-opacity-10 flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
