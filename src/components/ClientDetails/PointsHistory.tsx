
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface PointRecord {
  id: number;
  date: string;
  action: string;
  source: string;
  amount: number;
  balance: number;
}

interface PointsHistoryProps {
  points: PointRecord[];
}

const PointsHistory: React.FC<PointsHistoryProps> = ({ points }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История баллов</CardTitle>
        <CardDescription>История начисления и списания баллов</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Операция</TableHead>
              <TableHead>Источник</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Баланс</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {points.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{new Date(record.date).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>{record.action}</TableCell>
                <TableCell>{record.source}</TableCell>
                <TableCell className={record.amount > 0 ? "text-green-600" : "text-red-600"}>
                  {record.amount > 0 ? `+${record.amount}` : record.amount}
                </TableCell>
                <TableCell>{record.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" className="mt-4">Показать все</Button>
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
