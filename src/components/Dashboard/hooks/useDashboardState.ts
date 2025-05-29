
import { useState, useCallback } from 'react';

type ComparisonType = 'D/D' | 'W/W' | 'M/M' | 'Q/Q' | 'Y/Y';

interface DashboardState {
  selectedPeriod: string;
  comparisonType: ComparisonType;
  isLoading: boolean;
  filters: Record<string, any>;
}

const initialState: DashboardState = {
  selectedPeriod: 'current',
  comparisonType: 'M/M',
  isLoading: false,
  filters: {}
};

export const useDashboardState = () => {
  const [state, setState] = useState<DashboardState>(initialState);

  const updateState = useCallback((updates: Partial<DashboardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const setComparisonType = useCallback((type: ComparisonType) => {
    updateState({ comparisonType: type });
  }, [updateState]);

  const setLoading = useCallback((isLoading: boolean) => {
    updateState({ isLoading });
  }, [updateState]);

  const setFilters = useCallback((filters: Record<string, any>) => {
    updateState({ filters });
  }, [updateState]);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setComparisonType,
    setLoading,
    setFilters,
    resetState,
    updateState
  };
};
