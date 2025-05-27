
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { referralData } from '@/data/loyaltyData';

const ReferralProgramSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Реферальная программа</CardTitle>
        <CardDescription>
          Управление реферальной системой и ее метриками
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Всего рефералов</h3>
            <p className="text-4xl font-bold mt-2 text-logaz-blue">386</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Активные рефералы</h3>
            <p className="text-4xl font-bold mt-2 text-green-500">284</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Выручка через рефералов</h3>
            <p className="text-4xl font-bold mt-2 text-logaz-orange">1.2M ₽</p>
          </Card>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Лучшие рефереры</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Привлечено рефералов</TableHead>
                <TableHead>Выручка</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.referrer}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.referrals}</TableCell>
                  <TableCell>{item.revenue.toLocaleString()} ₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="default" className="bg-logaz-blue">
            Настроить реферальную программу
          </Button>
          <Button variant="outline">Экспорт данных</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralProgramSection;
