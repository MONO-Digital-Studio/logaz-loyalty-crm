
export const CHART_CONFIG = {
  // Размеры и отступы
  HEIGHT: 350,
  MARGINS: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 5
  },
  
  // Цветовая палитра для топлива
  FUEL_COLORS: {
    methane: '#2563EB',
    propane: '#FB8607', 
    ai92: '#EAB308',
    ai95: '#DC2626'
  },
  
  // Основная цветовая палитра
  COLORS: {
    primary: '#3B55A2',
    secondary: '#FB8607',
    success: '#22C55E',
    warning: '#EAB308',
    danger: '#EF4444',
    info: '#3B82F6',
    muted: '#6B7280'
  },
  
  // Настройки осей
  AXIS_CONFIG: {
    tick: { fontSize: 12 },
    stroke: '#666'
  },
  
  // Настройки сетки
  GRID_CONFIG: {
    strokeDasharray: '3 3',
    stroke: '#f0f0f0'
  },
  
  // Настройки линий
  LINE_CONFIG: {
    strokeWidth: 2,
    dot: { r: 4 },
    activeDot: { r: 6 }
  }
} as const;

// Утилитарная функция для создания кастомного tooltip
export const createCustomTooltip = (formatter?: (value: number) => string) => {
  return ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatter ? formatter(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
};
