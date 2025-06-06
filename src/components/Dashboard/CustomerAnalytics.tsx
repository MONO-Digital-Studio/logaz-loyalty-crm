
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber, formatCurrency, formatPercent } from '@/utils/dashboardFormatters';

const CustomerAnalytics: React.FC = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Клиентская аналитика</CardTitle>
          <p className="text-sm text-gray-500">Сегментация и метрики лояльности</p>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Клиентская аналитика</CardTitle>
        <p className="text-sm text-gray-500">Сегментация и метрики лояльности</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Сегментация клиентов */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Сегментация клиентов</h4>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Сегмент</TableHead>
                  <TableHead className="text-sm">Количество</TableHead>
                  <TableHead className="text-sm">Доля</TableHead>
                  <TableHead className="text-sm">Выручка</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.customerSegments.map((segment) => (
                  <TableRow key={segment.segment}>
                    <TableCell className="text-sm font-medium">{segment.segment}</TableCell>
                    <TableCell className="text-sm">{formatNumber(segment.count)}</TableCell>
                    <TableCell className="text-sm">{formatPercent(segment.percentage)}</TableCell>
                    <TableCell className="text-sm">{formatCurrency(segment.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Метрики лояльности */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Метрики лояльности</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {formatNumber(data.loyaltyMetrics.pointsEarned)}
              </div>
              <div className="text-xs text-gray-500">Начислено баллов</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {formatNumber(data.loyaltyMetrics.pointsSpent)}
              </div>
              <div className="text-xs text-gray-500">Потрачено баллов</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAnalytics;
