
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardFilters } from '@/types/dashboard';

interface DashboardState {
  filters: DashboardFilters;
  lastUpdate: Date;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setLastUpdate: (date: Date) => void;
  resetFilters: () => void;
}

const defaultFilters: DashboardFilters = {
  period: 'week',
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  stations: ['all'],
  comparison: 'previous'
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      lastUpdate: new Date(),
      setFilters: (newFilters) => 
        set(state => ({ 
          filters: { ...state.filters, ...newFilters },
          lastUpdate: new Date()
        })),
      setLastUpdate: (date) => set({ lastUpdate: date }),
      resetFilters: () => set({ filters: defaultFilters })
    }),
    {
      name: 'dashboard-store',
      partialize: (state) => ({ filters: state.filters })
    }
  )
);
