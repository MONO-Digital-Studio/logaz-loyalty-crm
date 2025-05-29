
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { comparisonOptions } from '@/data/dashboardMockData';
import { useDashboardStore } from '@/stores/dashboardStore';

const ComparisonFilter: React.FC = () => {
  const { filters, setFilters } = useDashboardStore();

  return (
    <Select value={filters.comparison} onValueChange={(value: any) => setFilters({ comparison: value })}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Сравнить с" />
      </SelectTrigger>
      <SelectContent>
        {comparisonOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ComparisonFilter;
