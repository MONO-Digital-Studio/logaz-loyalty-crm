
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Purchase {
  id: number;
  date: string;
  location: string;
  type: string;
  amount: number;
  price: number;
  points: number;
}

interface PurchaseHistoryProps {
  purchases: Purchase[];
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ purchases }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История покупок</CardTitle>
        <CardDescription>История транзакций клиента на АЗС</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>АЗС</TableHead>
              <TableHead>Тип топлива</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Начислено баллов</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{new Date(purchase.date).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>{purchase.location}</TableCell>
                <TableCell>{purchase.type}</TableCell>
                <TableCell>{purchase.amount} {purchase.type === "Пропан" ? "л" : "м³"}</TableCell>
                <TableCell>{purchase.price} ₽</TableCell>
                <TableCell>{purchase.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" className="mt-4">Показать все</Button>
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;
