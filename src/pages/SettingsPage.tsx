
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "../components/Settings/ProfileSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import CompanySettings from "../components/Settings/CompanySettings";
import IntegrationSettings from "../components/Settings/IntegrationSettings";
import DisplaySettings from "../components/Settings/DisplaySettings";
import PaymentSettings from "../components/Settings/PaymentSettings";
import UserAccessSettings from "../components/Settings/UserAccessSettings";
import SystemSettings from "../components/Settings/SystemSettings";
import StoreSettings from "../components/Settings/StoreSettings";
import EmployeeSettings from "../components/Settings/EmployeeSettings";
import { useLocation, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const currentTab = pathname.includes('/settings/') 
    ? pathname.split('/settings/')[1].split('/')[0] 
    : 'profile';
  
  // Get system subtab if on system tab
  const systemSubtab = pathname.includes('/settings/system/') 
    ? pathname.split('/settings/system/')[1]
    : '';

  useEffect(() => {
    document.title = "Настройки | ЛОГАЗ SV";
  }, []);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    navigate(`/settings/${value}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-1">
          Управление настройками приложения и учетной записью
        </p>
      </div>

      <Tabs 
        defaultValue={currentTab} 
        value={currentTab} 
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="company">Компания</TabsTrigger>
          <TabsTrigger value="display">Отображение</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="access">Доступ</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="stores">Торговые точки</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
          <TabsTrigger value="system">Системные настройки</TabsTrigger>
        </TabsList>

        {/* Display sub-tabs for System Settings when system tab is active */}
        {currentTab === 'system' && (
          <div className="mb-6">
            <Tabs
              defaultValue={systemSubtab || 'general'}
              value={systemSubtab || 'general'}
              onValueChange={(value) => navigate(`/settings/system/${value}`)}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="general">Основные</TabsTrigger>
                <TabsTrigger value="backup">Резервное копирование</TabsTrigger>
                <TabsTrigger value="logs">Логи и мониторинг</TabsTrigger>
                <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="display">
          <DisplaySettings />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="access">
          <UserAccessSettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="stores">
          <StoreSettings />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeSettings />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings currentSubtab={systemSubtab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
