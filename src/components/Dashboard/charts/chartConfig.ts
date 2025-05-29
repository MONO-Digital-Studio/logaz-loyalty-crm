
export const chartMargins = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 5
};

export const chartHeight = 500;

export const axisSettings = {
  tick: { fontSize: 12 },
  interval: "preserveStartEnd" as const
};

export const chartColors = {
  revenue: {
    current: "#3B55A2",
    previous: "#3B55A2",
    trend: "#1E40AF"
  },
  propane: {
    current: "#FB8607",
    previous: "#FB8607",
    trend: "#EA580C"
  },
  methane: {
    current: "#2563EB",
    previous: "#2563EB", 
    trend: "#1D4ED8"
  },
  ai92: {
    current: "#EAB308",
    previous: "#EAB308",
    trend: "#CA8A04"
  },
  ai95: {
    current: "#DC2626",
    previous: "#DC2626",
    trend: "#B91C1C"
  }
};

export const barOpacity = {
  current: 0.8,
  previous: 0.4
};

export const trendLineSettings = {
  strokeWidth: 2,
  strokeDasharray: "5 3",
  dot: false
};
