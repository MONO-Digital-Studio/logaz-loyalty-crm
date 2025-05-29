
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "../components/Settings/ProfileSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import CompanySettings from "../components/Settings/CompanySettings";
import DisplaySettings from "../components/Settings/DisplaySettings";
import PaymentSettings from "../components/Settings/PaymentSettings";
import UserAccessSettings from "../components/Settings/UserAccessSettings";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const currentTab = pathname.includes('/settings/') 
    ? pathname.split('/settings/')[1].split('/')[0] 
    : 'profile';

  useEffect(() => {
    document.title = "Настройки | ЛОГАЗ SV";
  }, []);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    // For tabs with subtabs, navigate to the default subtab
    if (value === 'access') {
      navigate(`/settings/${value}/users`);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  // Define subtabs for each main tab
  const getSubtabs = () => {
    switch (currentTab) {
      case 'access':
        return (
          <Tabs
            defaultValue={pathname.includes('/access/roles') ? 'roles' : 'users'}
            value={pathname.includes('/access/roles') ? 'roles' : 'users'}
            onValueChange={(value) => navigate(`/settings/access/${value}`)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="roles">Роли и разрешения</TabsTrigger>
            </TabsList>
          </Tabs>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
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
          </TabsList>

          {/* Show subtabs only for the active section */}
          <div className="mb-6">
            {getSubtabs()}
          </div>

          {/* Display the content for the selected main tab */}
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
