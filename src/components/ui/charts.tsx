
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Area, 
  AreaChart as RechartsAreaChart, 
  Bar, 
  BarChart as RechartsBarChart,
  Pie, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGradient?: boolean;
  showTooltip?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

interface BarChartProps extends ChartProps {
  layout?: "vertical" | "horizontal";
}

// Area Chart Component
export function AreaChart({
  data,
  index,
  categories,
  colors = ["#3498db"],
  valueFormatter = (value) => `${value}`,
  showXAxis = false,
  showYAxis = false,
  showLegend = true,
  showGradient = false,
  height = "300px",
  width = "100%",
  className = "",
}: ChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsAreaChart data={data}>
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <CartesianGrid strokeDasharray="3 3" />
        {showTooltip !== false && (
          <ChartTooltip 
            content={({ active, payload }) => (
              <ChartTooltipContent 
                active={active} 
                payload={payload}
                formatter={(value) => valueFormatter(Number(value))}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors[i % colors.length]}
            stroke={colors[i % colors.length]}
            fillOpacity={showGradient ? 0.6 : 1}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

// Bar Chart Component
export function BarChart({
  data,
  index,
  categories,
  colors = ["#f39c12"],
  valueFormatter = (value) => `${value}`,
  showXAxis = false,
  showYAxis = false,
  showLegend = true,
  layout = "vertical",
  height = "300px",
  width = "100%",
  className = "",
}: BarChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsBarChart 
        data={data} 
        layout={layout}
      >
        {showXAxis && <XAxis dataKey={layout === "horizontal" ? index : undefined} type={layout === "horizontal" ? "category" : "number"} />}
        {showYAxis && <YAxis dataKey={layout === "vertical" ? index : undefined} type={layout === "vertical" ? "category" : "number"} />}
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip 
          content={({ active, payload }) => (
            <ChartTooltipContent 
              active={active} 
              payload={payload} 
              formatter={(value) => valueFormatter(Number(value))}
            />
          )}
        />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

// Pie Chart Component
export function PieChart({
  data,
  index,
  categories,
  colors = ["#3498db", "#2ecc71", "#9b59b6", "#e74c3c", "#f1c40f", "#1abc9c"],
  valueFormatter = (value) => `${value}`,
  showTooltip = true,
  showLegend = true,
  height = "300px",
  width = "100%",
  className = "",
}: ChartProps) {
  const config = data.reduce((acc, item, i) => {
    acc[item[index]] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsPieChart>
        {showTooltip && (
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value, name) => `${name}: ${valueFormatter(Number(value))}`}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categories.map((category) => (
          <Pie
            key={category}
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        ))}
      </RechartsPieChart>
    </ChartContainer>
  );
}
