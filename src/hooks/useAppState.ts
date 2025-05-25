
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // User preferences
  tablePageSizes: Record<string, number>;
  lastVisitedRoutes: Record<string, string>;
  
  // Performance settings
  enableAnimations: boolean;
  autoRefreshInterval: number;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setTablePageSize: (tableId: string, pageSize: number) => void;
  setLastVisitedRoute: (workspace: string, route: string) => void;
  setEnableAnimations: (enabled: boolean) => void;
  setAutoRefreshInterval: (interval: number) => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        sidebarCollapsed: false,
        theme: 'system',
        tablePageSizes: {},
        lastVisitedRoutes: {},
        enableAnimations: true,
        autoRefreshInterval: 30000,
        
        // Actions
        setSidebarCollapsed: (collapsed) => 
          set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),
        
        setTheme: (theme) => 
          set({ theme }, false, 'setTheme'),
        
        setTablePageSize: (tableId, pageSize) =>
          set((state) => ({
            tablePageSizes: { ...state.tablePageSizes, [tableId]: pageSize }
          }), false, 'setTablePageSize'),
        
        setLastVisitedRoute: (workspace, route) =>
          set((state) => ({
            lastVisitedRoutes: { ...state.lastVisitedRoutes, [workspace]: route }
          }), false, 'setLastVisitedRoute'),
        
        setEnableAnimations: (enabled) =>
          set({ enableAnimations: enabled }, false, 'setEnableAnimations'),
        
        setAutoRefreshInterval: (interval) =>
          set({ autoRefreshInterval: interval }, false, 'setAutoRefreshInterval'),
      }),
      {
        name: 'app-state',
        partialize: (state) => ({
          theme: state.theme,
          tablePageSizes: state.tablePageSizes,
          lastVisitedRoutes: state.lastVisitedRoutes,
          enableAnimations: state.enableAnimations,
          autoRefreshInterval: state.autoRefreshInterval,
        }),
      }
    ),
    { name: 'AppState' }
  )
);
