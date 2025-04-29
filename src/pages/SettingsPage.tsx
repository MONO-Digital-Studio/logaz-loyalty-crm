
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { settingsCategories } from "../data/mockData";

const SettingsPage = () => {
  const [companyName, setCompanyName] = useState("ЛОГАЗ");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("sk_test_logaz_12345678901234567890");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Настройки системы</h1>
        <Button variant="default" className="bg-logaz-blue">Сохранить изменения</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {settingsCategories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-2 text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="col-span-1 lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Основные настройки системы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Название компании</Label>
                <Input 
                  id="company-name" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Язык системы</Label>
                <select 
                  id="language" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                  <option value="kz">Қазақша</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <select 
                  id="timezone" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent"
                >
                  <option value="Europe/Moscow">Москва (UTC+3)</option>
                  <option value="Asia/Almaty">Алматы (UTC+6)</option>
                  <option value="Asia/Tashkent">Ташкент (UTC+5)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройки отображения интерфейса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Темная тема</Label>
                  <p className="text-sm text-muted-foreground">Включить темный режим интерфейса</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Компактный режим</Label>
                  <p className="text-sm text-muted-foreground">Уменьшить размеры элементов интерфейса</p>
                </div>
                <Switch 
                  id="compact-mode" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройки системных уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления по SMS</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push-уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API и интеграции</CardTitle>
              <CardDescription>Управление API ключами и настройками интеграций</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API ключ</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="api-key" 
                    value={apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline">Обновить</Button>
                </div>
                <p className="text-sm text-muted-foreground">Используйте этот ключ для интеграции с другими системами</p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Доступные интеграции</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">1C: Бухгалтерия</h4>
                      <p className="text-sm text-gray-500">Обмен данными с учетной системой</p>
                    </div>
                    <Button variant="outline">Настроить</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">ФГИС ЕГАИС</h4>
                      <p className="text-sm text-gray-500">Система контроля оборота топлива</p>
                    </div>
                    <Button variant="outline">Настроить</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">SMS-провайдер</h4>
                      <p className="text-sm text-gray-500">Настройка SMS-уведомлений</p>
                    </div>
                    <Button variant="outline">Настроить</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
