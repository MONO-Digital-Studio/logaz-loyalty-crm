
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockCustomerSegments, mockLoyaltyMetrics } from '@/data/dashboardMockData';
import { formatNumber, formatCurrency, formatPercent } from '@/utils/dashboardFormatters';

const CustomerAnalytics: React.FC = () => {
  const npsValue = 72;
  const npsColor = npsValue >= 70 ? 'text-green-600' : npsValue >= 50 ? 'text-yellow-600' : 'text-red-600';
  const progressColor = npsValue >= 70 ? 'bg-green-500' : npsValue >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Клиентская аналитика</CardTitle>
        <p className="text-sm text-gray-500">Сегментация и лояльность</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NPS Индикатор */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${npsColor} mb-2`}>
            {npsValue}
          </div>
          <div className="text-sm text-gray-500 mb-3">Net Promoter Score</div>
          <div className="max-w-xs mx-auto">
            <Progress 
              value={npsValue} 
              className="h-2"
              style={{ 
                background: `linear-gradient(to right, ${progressColor} ${npsValue}%, #e5e7eb ${npsValue}%)` 
              }}
            />
          </div>
        </div>

        {/* Сегментация клиентов */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Сегментация клиентов</h4>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Сегмент</TableHead>
                  <TableHead className="text-xs">Количество</TableHead>
                  <TableHead className="text-xs">Доля</TableHead>
                  <TableHead className="text-xs">Выручка</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomerSegments.map((segment) => (
                  <TableRow key={segment.segment}>
                    <TableCell className="text-xs font-medium">{segment.segment}</TableCell>
                    <TableCell className="text-xs">{formatNumber(segment.count)}</TableCell>
                    <TableCell className="text-xs">{formatPercent(segment.percentage)}</TableCell>
                    <TableCell className="text-xs">{formatCurrency(segment.revenue)}</TableCell>
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
                {formatNumber(mockLoyaltyMetrics.pointsEarned)}
              </div>
              <div className="text-xs text-gray-500">Начислено баллов</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {formatNumber(mockLoyaltyMetrics.pointsSpent)}
              </div>
              <div className="text-xs text-gray-500">Потрачено баллов</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {formatNumber(mockLoyaltyMetrics.activePrograms)}
              </div>
              <div className="text-xs text-gray-500">Активные программы</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {formatPercent(mockLoyaltyMetrics.conversionRate)}
              </div>
              <div className="text-xs text-gray-500">Конверсия</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAnalytics;
