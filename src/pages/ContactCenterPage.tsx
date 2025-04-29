
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const handleTabChange = (value: string) => {
    navigate(`/contact-center/${value}`);
  };

  // Определяем активную вкладку на основе текущего пути
  const getActiveTab = () => {
    if (currentPath.includes('/dialogs')) return 'dialogs';
    if (currentPath.includes('/agents')) return 'agents';
    if (currentPath.includes('/stats')) return 'stats';
    return 'dialogs'; // По умолчанию
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Контакт-центр</h1>
      </div>

      <Tabs 
        defaultValue={getActiveTab()} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="dialogs">Диалоги</TabsTrigger>
          <TabsTrigger value="agents">Операторы</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
        </TabsList>

        <TabsContent value={getActiveTab()}>
          {currentPath === '/contact-center' && (
            <Card>
              <CardHeader>
                <CardTitle>Контакт-центр</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Выберите раздел для просмотра.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactCenterPage;
