
import React, { memo, useMemo } from 'react';
import { BadgeRussianRuble, CreditCard, Users, Fuel, UserCheck, TrendingDown } from 'lucide-react';
import OptimizedMetricCard from '@/components/shared/OptimizedMetricCard';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/dashboardFormatters';
import { useStableMemo } from '@/hooks/useOptimizedMemo';

const OptimizedKPIOverview: React.FC = memo(() => {
  const { data, loading } = useDashboardData();

  const kpiMetrics = useStableMemo(() => [
    {
      title: 'Продажи',
      value: formatCurrency(data.kpiData.totalSales.current),
      change: {
        value: data.kpiData.totalSales.change,
        isPositive: data.kpiData.totalSales.change > 0,
        text: `${data.kpiData.totalSales.change > 0 ? '+' : ''}${data.kpiData.totalSales.change.toFixed(1)}%`
      },
      icon: BadgeRussianRuble
    },
    {
      title: 'Реализация',
      value: formatNumber(data.kpiData.totalVolume.current),
      suffix: ' т/м³',
      change: {
        value: data.kpiData.totalVolume.change,
        isPositive: data.kpiData.totalVolume.change > 0,
        text: `${data.kpiData.totalVolume.change > 0 ? '+' : ''}${data.kpiData.totalVolume.change.toFixed(1)}%`
      },
      icon: Fuel
    },
    {
      title: 'Средний чек',
      value: formatCurrency(data.kpiData.avgTicket.current),
      change: {
        value: data.kpiData.avgTicket.change,
        isPositive: data.kpiData.avgTicket.change > 0,
        text: `${data.kpiData.avgTicket.change > 0 ? '+' : ''}${data.kpiData.avgTicket.change.toFixed(1)}%`
      },
      icon: CreditCard
    },
    {
      title: 'Всего клиентов',
      value: formatNumber(data.kpiData.totalCustomers.current),
      change: {
        value: data.kpiData.totalCustomers.change,
        isPositive: data.kpiData.totalCustomers.change > 0,
        text: `${data.kpiData.totalCustomers.change > 0 ? '+' : ''}${data.kpiData.totalCustomers.change.toFixed(1)}%`
      },
      icon: UserCheck
    },
    {
      title: 'Активные клиенты',
      value: formatNumber(data.kpiData.activeCustomers.current),
      change: {
        value: data.kpiData.activeCustomers.change,
        isPositive: data.kpiData.activeCustomers.change > 0,
        text: `${data.kpiData.activeCustomers.change > 0 ? '+' : ''}${data.kpiData.activeCustomers.change.toFixed(1)}%`
      },
      icon: Users
    },
    {
      title: 'Отток клиентов',
      value: formatPercent(data.kpiData.churnRate.current),
      change: {
        value: data.kpiData.churnRate.change,
        isPositive: data.kpiData.churnRate.change < 0,
        text: `${data.kpiData.churnRate.change > 0 ? '+' : ''}${data.kpiData.churnRate.change.toFixed(1)}%`
      },
      icon: TrendingDown
    }
  ], [data.kpiData]);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiMetrics.map((metric, index) => (
          <OptimizedMetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            suffix={metric.suffix}
            change={metric.change}
            icon={metric.icon}
            loading={loading}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
});

OptimizedKPIOverview.displayName = 'OptimizedKPIOverview';

export default OptimizedKPIOverview;
