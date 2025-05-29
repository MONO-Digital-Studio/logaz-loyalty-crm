
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SystemSettings from "../components/Settings/SystemSettings";
import IntegrationSettings from "../components/Settings/IntegrationSettings";
import StoreSettings from "../components/Settings/StoreSettings";
import Layout from "../components/Layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const SystemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = useParams();
  
  const currentTab = tab || 'general';

  useEffect(() => {
    document.title = "Система | ЛОГАЗ SV";
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Системные настройки</h1>
          <p className="text-muted-foreground mt-1">
            Управление системными параметрами и обслуживание
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs 
              defaultValue={currentTab} 
              value={currentTab} 
              className="w-full"
              onValueChange={(value) => navigate(`/system/${value}`)}
            >
              <TabsList className="mb-4 flex flex-wrap gap-2">
                <TabsTrigger value="general">Основные</TabsTrigger>
                <TabsTrigger value="backup">Резервное копирование</TabsTrigger>
                <TabsTrigger value="logs">Логи и мониторинг</TabsTrigger>
                <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
                <TabsTrigger value="integrations">Интеграции</TabsTrigger>
                <TabsTrigger value="locations">Торговые точки</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <SystemSettings currentSubtab="general" />
              </TabsContent>

              <TabsContent value="backup">
                <SystemSettings currentSubtab="backup" />
              </TabsContent>

              <TabsContent value="logs">
                <SystemSettings currentSubtab="logs" />
              </TabsContent>

              <TabsContent value="maintenance">
                <SystemSettings currentSubtab="maintenance" />
              </TabsContent>

              <TabsContent value="integrations">
                <IntegrationSettings />
              </TabsContent>

              <TabsContent value="locations">
                <StoreSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SystemPage;
