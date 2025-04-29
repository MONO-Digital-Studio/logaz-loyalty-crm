
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    emailNewClients: true,
    emailOrders: true,
    emailMarketing: false,
    systemNotifications: true,
    systemUpdates: true,
    systemAlerts: true
  });

  const handleSwitchChange = (name: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Настройки уведомлений обновлены");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Уведомления</CardTitle>
        <CardDescription>Настройка уведомлений системы</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email-уведомления</h3>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления на электронную почту
                </p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => 
                  handleSwitchChange("emailNotifications", checked)
                }
              />
            </div>
            
            {notifications.emailNotifications && (
              <div className="ml-6 space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNewClients">Новые клиенты</Label>
                  <Switch
                    id="emailNewClients"
                    checked={notifications.emailNewClients}
                    onCheckedChange={(checked) => 
                      handleSwitchChange("emailNewClients", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailOrders">Заказы и платежи</Label>
                  <Switch
                    id="emailOrders"
                    checked={notifications.emailOrders}
                    onCheckedChange={(checked) => 
                      handleSwitchChange("emailOrders", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailMarketing">Маркетинговые рассылки</Label>
                  <Switch
                    id="emailMarketing"
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => 
                      handleSwitchChange("emailMarketing", checked)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Системные уведомления</h3>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления в системе
                </p>
              </div>
              <Switch
                checked={notifications.systemNotifications}
                onCheckedChange={(checked) => 
                  handleSwitchChange("systemNotifications", checked)
                }
              />
            </div>
            
            {notifications.systemNotifications && (
              <div className="ml-6 space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="systemUpdates">Обновления системы</Label>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      handleSwitchChange("systemUpdates", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="systemAlerts">Важные уведомления</Label>
                  <Switch
                    id="systemAlerts"
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => 
                      handleSwitchChange("systemAlerts", checked)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-logaz-blue">
              Сохранить настройки
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
