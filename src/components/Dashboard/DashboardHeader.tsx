
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ComparisonFilter from './filters/ComparisonFilter';
import PeriodFilter from './filters/PeriodFilter';
import DateFilter from './filters/DateFilter';
import StationFilter from './filters/StationFilter';
import ActionButtons from './filters/ActionButtons';

const DashboardHeader: React.FC = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        {/* Одна строка с равномерным распределением всех элементов */}
        <div className="flex items-center justify-between gap-3 w-full">
          
          {/* Левая группа - Сравнение */}
          <div className="flex-shrink-0">
            <ComparisonFilter />
          </div>

          {/* Центральная группа - Период, Дата и Станция */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            <PeriodFilter />
            <DateFilter />
            <StationFilter />
          </div>

          {/* Правая группа - Кнопка Экспорт, Обновление */}
          <ActionButtons />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
