
import { useState, useMemo, useCallback } from 'react';

export interface FilterableItem {
  [key: string]: any;
}

export interface FilterOptions<T> {
  searchFields: (keyof T)[];
  filters: Record<string, any>;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}

export function useFilterableData<T extends FilterableItem>(
  data: T[],
  initialOptions: Partial<FilterOptions<T>> = {}
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(initialOptions.filters || {});
  const [sortBy, setSortBy] = useState<keyof T | undefined>(initialOptions.sortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialOptions.sortOrder || 'asc');

  const searchFields = initialOptions.searchFields || [];

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery && searchFields.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== 'all') {
        result = result.filter(item => {
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          return item[key] === value;
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, filters, sortBy, sortOrder, searchFields]);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, []);

  const toggleSort = useCallback((field: keyof T) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    sortBy,
    sortOrder,
    toggleSort,
  };
}
