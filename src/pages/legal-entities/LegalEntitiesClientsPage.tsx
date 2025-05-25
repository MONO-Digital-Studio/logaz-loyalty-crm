
import React, { useState } from 'react';
import { useLegalEntities } from '@/contexts/LegalEntitiesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Building2, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LegalEntity } from '@/types/legal-entities';

const LegalEntitiesClientsPage: React.FC = () => {
  const { legalEntities } = useLegalEntities();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredEntities = legalEntities.filter((entity) => {
    const matchesSearch = entity.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entity.inn.includes(searchQuery) ||
                         entity.kpp.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || entity.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: LegalEntity['status']) => {
    const statusConfig = {
      active: { label: 'Активный', variant: 'default' as const },
      suspended: { label: 'Приостановлен', variant: 'secondary' as const },
      blocked: { label: 'Заблокирован', variant: 'destructive' as const },
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Клиенты - Юридические лица</h1>
          <p className="text-muted-foreground text-sm">
            Управление корпоративными клиентами и их договорами
          </p>
        </div>
        <Button onClick={() => navigate('/legal-entities/clients/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить клиента ЮЛ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold">{legalEntities.length}</div>
          </CardContent>
        </Card>
        
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Активные</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-green-600">
              {legalEntities.filter(e => e.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Общий баланс</CardTitle>
            <Building2 className="h-4 w-4 text-logaz-blue" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-logaz-blue">
              {formatCurrency(legalEntities.reduce((sum, e) => sum + e.balance, 0))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Заблокированные</CardTitle>
            <Building2 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-red-600">
              {legalEntities.filter(e => e.status === 'blocked').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Поиск по названию, ИНН, КПП..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Все
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Активные
              </Button>
              <Button
                variant={statusFilter === 'suspended' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('suspended')}
              >
                Приостановленные
              </Button>
              <Button
                variant={statusFilter === 'blocked' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('blocked')}
              >
                Заблокированные
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Список клиентов ({filteredEntities.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Компания</TableHead>
                <TableHead>ИНН / КПП</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Баланс</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntities.map((entity) => (
                <TableRow key={entity.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">{entity.companyName}</p>
                      <p className="text-sm text-muted-foreground">
                        Договор: {entity.contractNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>ИНН: {entity.inn}</p>
                      <p className="text-sm text-muted-foreground">КПП: {entity.kpp}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {entity.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {entity.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{formatCurrency(entity.balance)}</p>
                      {entity.overdraft > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Овердрафт: {formatCurrency(entity.overdraft)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(entity.status)}
                  </TableCell>
                  <TableCell>
                    {entity.createdAt.toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/legal-entities/clients/${entity.id}`)}
                    >
                      Подробнее
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalEntitiesClientsPage;
