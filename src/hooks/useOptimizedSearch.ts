
import { useState, useMemo } from 'react';
import { useDebounced } from './useDebounced';

interface UseOptimizedSearchOptions<T> {
  searchFields: (keyof T)[];
  debounceDelay?: number;
  minSearchLength?: number;
  caseSensitive?: boolean;
}

export const useOptimizedSearch = <T extends Record<string, any>>(
  data: T[],
  options: UseOptimizedSearchOptions<T>
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounced(searchTerm, options.debounceDelay || 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < (options.minSearchLength || 1)) {
      return data;
    }

    const normalizedSearchTerm = options.caseSensitive 
      ? debouncedSearchTerm 
      : debouncedSearchTerm.toLowerCase();

    return data.filter(item => 
      options.searchFields.some(field => {
        const fieldValue = item[field];
        if (fieldValue == null) return false;
        
        const normalizedFieldValue = options.caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
          
        return normalizedFieldValue.includes(normalizedSearchTerm);
      })
    );
  }, [data, debouncedSearchTerm, options]);

  const searchStats = useMemo(() => ({
    totalItems: data.length,
    filteredItems: filteredData.length,
    isSearching: debouncedSearchTerm.length >= (options.minSearchLength || 1)
  }), [data.length, filteredData.length, debouncedSearchTerm, options.minSearchLength]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    searchStats,
    isSearchActive: searchStats.isSearching
  };
};
