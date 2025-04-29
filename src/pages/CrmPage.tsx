
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, ChevronRight } from 'lucide-react';

const CrmPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
        <Button className="bg-logaz-blue" onClick={() => navigate('/crm/clients')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:bg-accent/50 transition-colors cursor-pointer" 
              onClick={() => navigate('/crm/clients')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Клиенты</CardTitle>
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

        <Card className="hover:bg-accent/50 transition-colors cursor-pointer" 
              onClick={() => navigate('/loyalty')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Программа лояльности</CardTitle>
            <span className="text-xl">🎁</span>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Настройка и управление программами лояльности для клиентов
            </p>
            <div className="flex justify-end mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                Перейти <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrmPage;
