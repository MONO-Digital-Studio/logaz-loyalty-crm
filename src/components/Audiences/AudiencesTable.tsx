
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Filter, Download } from 'lucide-react';

interface Audience {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
  lastUpdated: string;
}

interface AudiencesTableProps {
  audiences: Audience[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudiencesTable: React.FC<AudiencesTableProps> = ({ audiences, searchQuery, onSearchChange }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Аудитории</CardTitle>
        <CardDescription>Управление сегментами клиентов</CardDescription>
        <div className="flex items-center justify-between mt-2">
          <div className="relative w-64">
            <Input 
              placeholder="Поиск аудиторий..."
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-8"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Экспорт
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Контактов</TableHead>
              <TableHead>Создано</TableHead>
              <TableHead>Обновлено</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audiences.map((audience) => (
              <TableRow key={audience.id}>
                <TableCell className="font-medium">{audience.name}</TableCell>
                <TableCell>{audience.description}</TableCell>
                <TableCell>{audience.count}</TableCell>
                <TableCell>{audience.createdAt}</TableCell>
                <TableCell>{audience.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Просмотр
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AudiencesTable;
