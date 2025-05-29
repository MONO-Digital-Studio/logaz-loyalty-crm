
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GasStationData } from '@/types/gasStations';
import { formatCurrency, formatNumber } from '@/utils/dashboardFormatters';

interface GasStationsTableProps {
  data: GasStationData[];
}

const GasStationsTable: React.FC<GasStationsTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Заправочная станция</TableHead>
            <TableHead className="font-semibold text-center">Операции</TableHead>
            <TableHead className="font-semibold text-center">Реализация (л)</TableHead>
            <TableHead className="font-semibold text-center">Сумма продаж</TableHead>
            <TableHead className="font-semibold text-center">Средний чек</TableHead>
            <TableHead className="font-semibold text-center">Начислено баллов</TableHead>
            <TableHead className="font-semibold text-center">Списано баллов</TableHead>
            <TableHead className="font-semibold text-center">Выдано подарков</TableHead>
            <TableHead className="font-semibold text-center">Клиенты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((station) => (
            <TableRow key={station.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {station.name}
              </TableCell>
              
              <TableCell className="text-center">
                {formatNumber(station.operations)}
              </TableCell>
              
              <TableCell className="text-center">
                <div className="space-y-1">
                  <div className="font-semibold">{formatNumber(station.volume.total)}</div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>АИ-92: {formatNumber(station.volume.ai92)}</div>
                    <div>АИ-95: {formatNumber(station.volume.ai95)}</div>
                    <div>АИ-98: {formatNumber(station.volume.ai98)}</div>
                    <div>ДТ: {formatNumber(station.volume.diesel)}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <div className="space-y-1">
                  <div className="font-semibold">{formatCurrency(station.sales.total)}</div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>Топливо: {formatCurrency(station.sales.fuel.total)}</div>
                    <div className="pl-2 space-y-0.5">
                      <div>АИ-92: {formatCurrency(station.sales.fuel.ai92)}</div>
                      <div>АИ-95: {formatCurrency(station.sales.fuel.ai95)}</div>
                      <div>АИ-98: {formatCurrency(station.sales.fuel.ai98)}</div>
                      <div>ДТ: {formatCurrency(station.sales.fuel.diesel)}</div>
                    </div>
                    <div>Маркет: {formatCurrency(station.sales.market)}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <div className="space-y-1">
                  <div className="font-semibold">{formatCurrency(station.averageCheck.total)}</div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>Топливо: {formatCurrency(station.averageCheck.fuel.total)}</div>
                    <div className="pl-2 space-y-0.5">
                      <div>АИ-92: {formatCurrency(station.averageCheck.fuel.ai92)}</div>
                      <div>АИ-95: {formatCurrency(station.averageCheck.fuel.ai95)}</div>
                      <div>АИ-98: {formatCurrency(station.averageCheck.fuel.ai98)}</div>
                      <div>ДТ: {formatCurrency(station.averageCheck.fuel.diesel)}</div>
                    </div>
                    <div>Маркет: {formatCurrency(station.averageCheck.market)}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                {formatNumber(station.pointsEarned)}
              </TableCell>
              
              <TableCell className="text-center">
                {formatNumber(station.pointsSpent)}
              </TableCell>
              
              <TableCell className="text-center">
                {formatNumber(station.giftsGiven)}
              </TableCell>
              
              <TableCell className="text-center">
                {formatNumber(station.uniqueCustomers)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GasStationsTable;
