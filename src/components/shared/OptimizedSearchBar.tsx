
import React, { memo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOptimizedSearch } from '@/hooks/useOptimizedSearch';

interface OptimizedSearchBarProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  onResultsChange: (results: T[]) => void;
  placeholder?: string;
  debounceDelay?: number;
  minSearchLength?: number;
  showStats?: boolean;
}

const OptimizedSearchBar = memo(<T extends Record<string, any>>({
  data,
  searchFields,
  onResultsChange,
  placeholder = "Поиск...",
  debounceDelay = 300,
  minSearchLength = 1,
  showStats = true
}: OptimizedSearchBarProps<T>) => {
  const {
    searchTerm,
    setSearchTerm,
    filteredData,
    searchStats,
    isSearchActive
  } = useOptimizedSearch(data, {
    searchFields,
    debounceDelay,
    minSearchLength,
    caseSensitive: false
  });

  React.useEffect(() => {
    onResultsChange(filteredData);
  }, [filteredData, onResultsChange]);

  const handleClear = React.useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showStats && isSearchActive && (
        <div className="text-sm text-gray-500">
          Найдено {searchStats.filteredItems} из {searchStats.totalItems} элементов
        </div>
      )}
    </div>
  );
}) as <T extends Record<string, any>>(props: OptimizedSearchBarProps<T>) => JSX.Element;

OptimizedSearchBar.displayName = 'OptimizedSearchBar';

export default OptimizedSearchBar;
