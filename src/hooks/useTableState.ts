
import { useState, useMemo, useCallback } from 'react';

export interface TableState {
  page: number;
  pageSize: number;
  sortKey?: string;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, any>;
  search: string;
}

export const useTableState = (initialState?: Partial<TableState>) => {
  const [tableState, setTableState] = useState<TableState>({
    page: 1,
    pageSize: 10,
    sortDirection: 'asc',
    filters: {},
    search: '',
    ...initialState
  });

  const updatePage = useCallback((page: number) => {
    setTableState(prev => ({ ...prev, page }));
  }, []);

  const updatePageSize = useCallback((pageSize: number) => {
    setTableState(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const updateSort = useCallback((sortKey: string) => {
    setTableState(prev => ({
      ...prev,
      sortKey,
      sortDirection: prev.sortKey === sortKey && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const updateFilter = useCallback((key: string, value: any) => {
    setTableState(prev => ({
      ...prev,
      filters: { ...prev.filters, [key]: value },
      page: 1
    }));
  }, []);

  const updateSearch = useCallback((search: string) => {
    setTableState(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setTableState(prev => ({
      ...prev,
      filters: {},
      search: '',
      page: 1
    }));
  }, []);

  const actions = useMemo(() => ({
    updatePage,
    updatePageSize,
    updateSort,
    updateFilter,
    updateSearch,
    clearFilters
  }), [updatePage, updatePageSize, updateSort, updateFilter, updateSearch, clearFilters]);

  return [tableState, actions] as const;
};
