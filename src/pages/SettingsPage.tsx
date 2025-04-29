
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
import SetupWizard from "../components/Settings/SetupWizard";
import StoreSettings from "../components/Settings/StoreSettings";
import EmployeeSettings from "../components/Settings/EmployeeSettings";
import { useLocation } from "react-router-dom";

const SettingsPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentTab = pathname.includes('/settings/') 
    ? pathname.split('/settings/')[1] 
    : 'profile';

  useEffect(() => {
    document.title = "Настройки | ЛОГАЗ SV";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-1">
          Управление настройками приложения и учетной записью
        </p>
      </div>

      <Tabs defaultValue={currentTab} value={currentTab} className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="company">Компания</TabsTrigger>
          <TabsTrigger value="display">Отображение</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="access">Доступ</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="wizard">Мастер настройки</TabsTrigger>
          <TabsTrigger value="stores">Торговые точки</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
          <TabsTrigger value="system">Системные настройки</TabsTrigger>
        </TabsList>

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

        <TabsContent value="wizard">
          <SetupWizard />
        </TabsContent>

        <TabsContent value="stores">
          <StoreSettings />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeSettings />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
