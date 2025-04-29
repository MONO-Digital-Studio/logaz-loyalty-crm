
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DownloadCloud,
  Clock,
  Sliders,
  Database,
  Server,
  Shield,
  BellRing,
  RefreshCw
} from "lucide-react";

const SystemSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleClearCache = () => {
    toast.success("Кеш успешно очищен");
  };

  const handleRestartSystem = () => {
    toast.success("Система перезапущена");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Настройки системы сохранены");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="backup">Резервное копирование</TabsTrigger>
          <TabsTrigger value="logs">Логи и мониторинг</TabsTrigger>
          <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Общие системные настройки</CardTitle>
              <CardDescription>
                Основные параметры работы системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
                      <p className="text-sm text-muted-foreground">
                        Включить режим обслуживания системы
                      </p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debugMode">Режим отладки</Label>
                      <p className="text-sm text-muted-foreground">
                        Включить расширенное логирование для отладки
                      </p>
                    </div>
                    <Switch
                      id="debugMode"
                      checked={debugMode}
                      onCheckedChange={setDebugMode}
                    />
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <Select defaultValue="Europe/Moscow">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Выберите часовой пояс" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                          <SelectItem value="Europe/Kaliningrad">Калининград (UTC+2)</SelectItem>
                          <SelectItem value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                          <SelectItem value="Asia/Novosibirsk">Новосибирск (UTC+7)</SelectItem>
                          <SelectItem value="Asia/Vladivostok">Владивосток (UTC+10)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="dateFormat">Формат даты</Label>
                      <Select defaultValue="DD.MM.YYYY">
                        <SelectTrigger id="dateFormat">
                          <SelectValue placeholder="Выберите формат даты" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD.MM.YYYY">ДД.ММ.ГГГГ</SelectItem>
                          <SelectItem value="MM/DD/YYYY">ММ/ДД/ГГГГ</SelectItem>
                          <SelectItem value="YYYY-MM-DD">ГГГГ-ММ-ДД</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="sessionTimeout">Таймаут сессии (минуты)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        defaultValue={30}
                        min={1}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="maxUploadSize">Максимальный размер загрузки (МБ)</Label>
                      <Input
                        id="maxUploadSize"
                        type="number"
                        defaultValue={10}
                        min={1}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-logaz-blue">
                    Сохранить настройки
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Системные уведомления для администраторов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Уведомления о входе в систему</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления при входе пользователей в систему
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Уведомления о безопасности</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления о проблемах безопасности
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Уведомления о состоянии сервера</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления о проблемах с сервером
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" /> 
                Резервное копирование
              </CardTitle>
              <CardDescription>
                Настройка автоматического резервного копирования базы данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Автоматическое резервное копирование</Label>
                    <p className="text-sm text-muted-foreground">
                      Регулярно создавать резервные копии базы данных
                    </p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>

                {autoBackup && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="backupFrequency">Частота</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backupFrequency">
                          <SelectValue placeholder="Выберите частоту" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Каждый час</SelectItem>
                          <SelectItem value="daily">Ежедневно</SelectItem>
                          <SelectItem value="weekly">Еженедельно</SelectItem>
                          <SelectItem value="monthly">Ежемесячно</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backupTime">Время резервного копирования</Label>
                      <Input
                        id="backupTime"
                        type="time"
                        defaultValue="03:00"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backupRetention">Срок хранения (дни)</Label>
                      <Input
                        id="backupRetention"
                        type="number"
                        defaultValue={30}
                        min={1}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backupLocation">Место хранения</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="backupLocation">
                          <SelectValue placeholder="Выберите место хранения" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Локальное хранилище</SelectItem>
                          <SelectItem value="cloud">Облачное хранилище</SelectItem>
                          <SelectItem value="both">Локальное и облачное</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Последние резервные копии</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 px-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">backup_2025-04-28_03-00.sql</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <DownloadCloud className="h-4 w-4" />
                        <span className="sr-md:inline hidden">Скачать</span>
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">backup_2025-04-27_03-00.sql</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <DownloadCloud className="h-4 w-4" />
                        <span className="sr-md:inline hidden">Скачать</span>
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">backup_2025-04-26_03-00.sql</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <DownloadCloud className="h-4 w-4" />
                        <span className="sr-md:inline hidden">Скачать</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <Button variant="outline">
                    Восстановить из резервной копии
                  </Button>
                  <Button onClick={() => toast.success("Резервная копия создана")}>
                    Создать резервную копию
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" /> 
                Логи и мониторинг
              </CardTitle>
              <CardDescription>
                Настройка логирования и мониторинга системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="logLevel">Уровень логирования</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="logLevel">
                        <SelectValue placeholder="Выберите уровень логирования" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Только ошибки</SelectItem>
                        <SelectItem value="warn">Предупреждения и ошибки</SelectItem>
                        <SelectItem value="info">Информация, предупреждения и ошибки</SelectItem>
                        <SelectItem value="debug">Отладка (все логи)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="logRetention">Срок хранения логов (дни)</Label>
                    <Input
                      id="logRetention"
                      type="number"
                      defaultValue={14}
                      min={1}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sqlLogging">SQL логирование</Label>
                    <p className="text-sm text-muted-foreground">
                      Логировать выполнение SQL запросов (замедляет работу)
                    </p>
                  </div>
                  <Switch id="sqlLogging" defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="performanceMonitoring">Мониторинг производительности</Label>
                    <p className="text-sm text-muted-foreground">
                      Отслеживать показатели производительности системы
                    </p>
                  </div>
                  <Switch id="performanceMonitoring" defaultChecked={true} />
                </div>

                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Журналы событий</h3>
                    <Button variant="outline" size="sm">
                      Экспорт логов
                    </Button>
                  </div>
                  
                  <div className="h-48 overflow-y-auto border rounded-md p-2 bg-muted font-mono text-xs">
                    <div className="text-green-600">[2025-04-29 08:32:14] INFO: Система запущена</div>
                    <div className="text-green-600">[2025-04-29 08:32:15] INFO: База данных подключена</div>
                    <div className="text-green-600">[2025-04-29 08:32:16] INFO: Кеш инициализирован</div>
                    <div className="text-yellow-600">[2025-04-29 08:35:23] WARN: Высокая нагрузка на CPU (78%)</div>
                    <div className="text-green-600">[2025-04-29 08:45:12] INFO: Пользователь admin вошел в систему</div>
                    <div className="text-green-600">[2025-04-29 09:12:44] INFO: Резервное копирование завершено</div>
                    <div className="text-red-600">[2025-04-29 09:23:51] ERROR: Не удалось подключиться к внешнему API</div>
                    <div className="text-green-600">[2025-04-29 09:24:02] INFO: Повторное подключение к API выполнено</div>
                    <div className="text-green-600">[2025-04-29 09:35:17] INFO: Обновление кеша завершено</div>
                    <div className="text-green-600">[2025-04-29 10:01:23] INFO: Пользователь manager вошел в систему</div>
                    <div className="text-green-600">[2025-04-29 10:15:45] INFO: Импорт данных завершен</div>
                    <div className="text-yellow-600">[2025-04-29 10:32:18] WARN: Низкое свободное место на диске (15%)</div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button"
                    className="bg-logaz-blue"
                    onClick={() => toast.success("Настройки логирования сохранены")}
                  >
                    Сохранить настройки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" /> 
                Обслуживание системы
              </CardTitle>
              <CardDescription>
                Инструменты для обслуживания и оптимизации системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Очистка кеша</CardTitle>
                      <CardDescription>
                        Очистить временные файлы и кеш системы
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={handleClearCache}
                        variant="outline" 
                        className="w-full"
                      >
                        Очистить кеш
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Оптимизация БД</CardTitle>
                      <CardDescription>
                        Оптимизировать таблицы базы данных
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => toast.success("База данных оптимизирована")}
                        variant="outline" 
                        className="w-full"
                      >
                        Оптимизировать БД
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Проверка целостности данных</CardTitle>
                      <CardDescription>
                        Проверить целостность данных в базе
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => toast.success("Проверка целостности данных выполнена")}
                        variant="outline" 
                        className="w-full"
                      >
                        Проверить целостность
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Перезапуск системы</CardTitle>
                      <CardDescription>
                        Перезапустить все системные процессы
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Перезапустить систему
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Перезапустить систему?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие приведет к временной недоступности системы. 
                              Все пользователи будут отключены. Продолжить?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={handleRestartSystem}
                            >
                              Перезапустить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Информация о системе</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Версия системы:</span>
                      <span className="font-medium">3.4.2</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Дата установки:</span>
                      <span className="font-medium">01.02.2025</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Последнее обновление:</span>
                      <span className="font-medium">15.03.2025</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Использование дискового пространства:</span>
                      <span className="font-medium">4.2 ГБ / 20 ГБ</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Размер базы данных:</span>
                      <span className="font-medium">1.8 ГБ</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
