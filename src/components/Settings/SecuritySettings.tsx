
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      twoFactorEnabled: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }
    
    toast.success("Пароль успешно изменен");
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Безопасность</CardTitle>
        <CardDescription>Управление настройками безопасности</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Введите текущий пароль"
              required={Boolean(formData.newPassword || formData.confirmPassword)}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Новый пароль</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Введите новый пароль"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Подтвердите новый пароль"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-logaz-blue"
              disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            >
              Изменить пароль
            </Button>
          </div>
        </form>

        <div className="border-t mt-6 pt-6">
          <h3 className="text-lg font-medium">Двухфакторная аутентификация</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            Повысьте уровень безопасности вашего аккаунта с помощью двухфакторной аутентификации
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="twoFactor">Статус</Label>
              <p className="text-sm text-muted-foreground">
                {formData.twoFactorEnabled ? "Включено" : "Отключено"}
              </p>
            </div>
            <Switch
              id="twoFactor"
              checked={formData.twoFactorEnabled}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
