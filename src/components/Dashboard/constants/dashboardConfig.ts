
export type ComparisonType = 'D/D' | 'W/W' | 'M/M' | 'Q/Q' | 'Y/Y';

export const DASHBOARD_CONSTANTS = {
  CHART_HEIGHT: 350,
  CHART_MARGINS: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 5
  },
  GRID_BREAKPOINTS: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-2',
    wide: 'xl:grid-cols-4'
  },
  ANIMATION_DURATION: 300,
  REFRESH_INTERVAL: 30000, // 30 seconds
} as const;

export const COMPARISON_TYPES: readonly ComparisonType[] = [
  'D/D', 'W/W', 'M/M', 'Q/Q', 'Y/Y'
] as const;

export const COLOR_PALETTE = {
  primary: '#3B55A2',
  secondary: '#FB8607',
  success: '#22C55E',
  warning: '#EAB308',
  danger: '#EF4444',
  info: '#3B82F6',
  muted: '#6B7280'
} as const;

export const CHART_COLORS = {
  revenue: {
    current: COLOR_PALETTE.primary,
    previous: '#93C5FD',
    trend: '#1E40AF'
  },
  fuel: {
    propane: '#FB8607',
    methane: '#2563EB',
    ai92: '#EAB308',
    ai95: '#DC2626'
  }
} as const;
