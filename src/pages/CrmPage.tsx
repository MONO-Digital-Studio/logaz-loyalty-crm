
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, ChevronRight } from 'lucide-react';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import StatsSummary from '@/components/Dashboard/StatsSummary';
import ClientStats from '@/components/Clients/ClientStats';
import { BarChart } from '@/components/ui/charts';
import CustomerSegments from '@/components/Clients/CustomerSegments';
import ClientRetention from '@/components/Clients/ClientRetention';

const CrmPage: React.FC = () => {
  const navigate = useNavigate();

  const segmentData = [
    { name: 'VIP', value: 15 },
    { name: 'Активные', value: 42 },
    { name: 'Случайные', value: 28 },
    { name: 'Спящие', value: 15 }
  ];

  const retentionData = [
    { month: 'Янв', retention: 89 },
    { month: 'Фев', retention: 92 },
    { month: 'Мар', retention: 87 },
    { month: 'Апр', retention: 91 },
    { month: 'Май', retention: 84 },
    { month: 'Июн', retention: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <Button className="bg-logaz-blue" onClick={() => navigate('/crm/clients')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить клиента
        </Button>
      </div>

      <ClientStats 
        totalClients={2845} 
        activeClients={1256} 
        newClients={142} 
        averageCheck={1850}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RfmAnalysis />
        <CustomerSegments data={segmentData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClientRetention data={retentionData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Частота покупок</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart 
              data={[
                { name: '1 раз', purchases: 35 },
                { name: '2-5 раз', purchases: 42 },
                { name: '6-10 раз', purchases: 18 },
                { name: '11+ раз', purchases: 5 }
              ]}
              index="name"
              categories={["purchases"]}
              colors={["#3B55A2"]}
              valueFormatter={(value) => `${value}%`}
              showXAxis={true}
              showYAxis={true}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="hover:bg-accent/50 transition-colors cursor-pointer" 
            onClick={() => navigate('/crm/clients')}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Управление клиентами</CardTitle>
          <Users className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Управление базой клиентов, история заказов и коммуникаций
          </p>
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrmPage;
