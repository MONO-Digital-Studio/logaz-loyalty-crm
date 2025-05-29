
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComparisonType } from '@/types/dashboardComparison';
import { comparisonOptions, getComparisonLabel } from './config/comparisonOptions';

interface PeriodComparisonHeaderProps {
  comparisonType: ComparisonType;
  onComparisonTypeChange: (type: ComparisonType) => void;
}

const PeriodComparisonHeader: React.FC<PeriodComparisonHeaderProps> = ({
  comparisonType,
  onComparisonTypeChange
}) => {
  return (
    <Card className="stats-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Динамика реализации, рублей</h3>
            <p className="text-sm text-gray-600">
              Сравнение {getComparisonLabel(comparisonType)} по выручке и топливу с линиями тренда
            </p>
          </div>
          <Select value={comparisonType} onValueChange={(value) => onComparisonTypeChange(value as ComparisonType)}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {comparisonOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PeriodComparisonHeader;
