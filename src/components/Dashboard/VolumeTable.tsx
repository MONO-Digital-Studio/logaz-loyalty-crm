
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockVolumeData } from '@/data/dashboardMockData';
import { formatNumber, formatChange } from '@/utils/dashboardFormatters';

const VolumeTable: React.FC = () => {
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
              {mockVolumeData.map((item) => {
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
