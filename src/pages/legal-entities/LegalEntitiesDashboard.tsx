
import React from 'react';
import { useLegalEntities } from '@/contexts/LegalEntitiesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Users, Fuel, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LegalEntitiesDashboard: React.FC = () => {
  const { dashboardMetrics, legalEntities, fuelCards } = useLegalEntities();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Аналитика юридических лиц</h1>
          <p className="text-muted-foreground text-sm">
            Обзор ключевых показателей и метрик корпоративных клиентов
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/legal-entities/fuel-cards/create')}>
            <CreditCard className="mr-2 h-4 w-4" />
            Создать карту
          </Button>
          <Button onClick={() => navigate('/legal-entities/clients/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Новый клиент ЮЛ
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Общий баланс</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-logaz-blue">
              {formatCurrency(dashboardMetrics.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Активные карты</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-green-600">
              {formatNumber(dashboardMetrics.activeCards)}
            </div>
            <p className="text-xs text-muted-foreground">
              из {fuelCards.length} выпущенных
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Объем топлива</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-logaz-orange">
              {formatNumber(dashboardMetrics.totalFuelVolume)} л
            </div>
            <p className="text-xs text-muted-foreground">
              За текущий месяц
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Транзакции сегодня</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold">
              {formatNumber(dashboardMetrics.transactionsToday)}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% чем вчера
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Warning Cards */}
      {dashboardMetrics.blockedCards > 0 && (
        <Card className="border-red-200 bg-red-50 p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-red-800">Заблокированные карты</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl font-bold text-red-600">
              {dashboardMetrics.blockedCards}
            </div>
            <p className="text-xs text-red-700">
              Требуют внимания
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Последние клиенты</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {legalEntities.slice(0, 5).map((entity) => (
                <div key={entity.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-logaz-blue/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-logaz-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {entity.companyName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ИНН: {entity.inn}
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(entity.balance)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Топ карты по балансу</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {fuelCards
                .sort((a, b) => b.balance - a.balance)
                .slice(0, 5)
                .map((card) => (
                  <div key={card.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-logaz-orange/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-logaz-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {card.vehicleNumber}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {card.driverName}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(card.balance)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalEntitiesDashboard;
