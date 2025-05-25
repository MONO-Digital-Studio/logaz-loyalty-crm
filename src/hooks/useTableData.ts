import { useState, useMemo, useCallback } from 'react';

export interface TableFilters {
  search: string;
  status?: string;
  category?: string;
  [key: string]: any;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export const useTableData = <T extends Record<string, any>>(
  data: T[],
  searchFields: (keyof T)[] = []
) => {
  const [filters, setFilters] = useState<TableFilters>({ search: '' });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = searchFields.some(field => 
          String(item[field]).toLowerCase().includes(searchLower)
        );
        if (!matchesSearch) return false;
      }

      // Other filters
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'search' || !value) return true;
        return item[key] === value;
      });
    });
  }, [data, filters, searchFields]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '' });
    setCurrentPage(1);
  }, []);

  const sort = useCallback((key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  }, []);

  return {
    data: paginatedData,
    totalItems: sortedData.length,
    totalPages,
    currentPage,
    pageSize,
    filters,
    sortConfig,
    updateFilter,
    clearFilters,
    sort,
    setCurrentPage,
    setPageSize,
  };
};
