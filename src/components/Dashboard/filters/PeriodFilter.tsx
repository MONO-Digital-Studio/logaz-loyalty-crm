
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { periodOptions } from '@/data/dashboardMockData';
import { useDashboardStore } from '@/stores/dashboardStore';

const PeriodFilter: React.FC = () => {
  const { filters, setFilters } = useDashboardStore();

  return (
    <Select value={filters.period} onValueChange={(value: any) => setFilters({ period: value })}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Период" />
      </SelectTrigger>
      <SelectContent>
        {periodOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodFilter;
