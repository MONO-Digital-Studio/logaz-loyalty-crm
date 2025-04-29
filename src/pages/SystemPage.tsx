
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SystemSettings from "../components/Settings/SystemSettings";

const SystemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = useParams();
  
  const currentTab = tab || 'general';

  useEffect(() => {
    document.title = "Система | ЛОГАЗ SV";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Системные настройки</h1>
        <p className="text-muted-foreground mt-1">
          Управление системными параметрами и обслуживание
        </p>
      </div>

      <Tabs 
        defaultValue={currentTab} 
        value={currentTab} 
        className="w-full"
        onValueChange={(value) => navigate(`/system/${value}`)}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="backup">Резервное копирование</TabsTrigger>
          <TabsTrigger value="logs">Логи и мониторинг</TabsTrigger>
          <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default SystemPage;
