
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber, formatChange } from '@/utils/dashboardFormatters';

const VolumeTable: React.FC = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Объемы реализации</CardTitle>
          <p className="text-sm text-gray-500">Сводка по видам топлива</p>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded mb-2"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Объемы реализации</CardTitle>
        <p className="text-sm text-gray-500">Сводка по видам топлива</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Вид топлива</TableHead>
                <TableHead className="font-medium">За период</TableHead>
                <TableHead className="font-medium">Среднее/день</TableHead>
                <TableHead className="font-medium">Изменение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.volumeData.map((item) => {
                const change = formatChange(item.change);
                return (
                  <TableRow key={item.fuel} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.fuel}</TableCell>
                    <TableCell>
                      {formatNumber(item.period)} {item.unit}
                    </TableCell>
                    <TableCell>
                      {formatNumber(item.daily)} {item.unit}
                    </TableCell>
                    <TableCell className={change.color}>
                      <div className="flex items-center gap-1">
                        <span>{change.text}</span>
                        <span>{change.icon}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolumeTable;
