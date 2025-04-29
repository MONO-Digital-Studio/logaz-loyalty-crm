
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const CompanySettings = () => {
  const [formData, setFormData] = useState({
    name: "ЛОГАЗ SV",
    taxId: "7701234567",
    address: "г. Москва, ул. Ленина, д. 10",
    phone: "+7 (495) 123-45-67",
    email: "info@logaz-sv.ru",
    website: "https://logaz-sv.ru",
  });

  const [features, setFeatures] = useState({
    enableMultiBranch: true,
    enableAnalytics: true,
    enableCRM: true,
    enableLoyalty: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Данные о компании успешно обновлены");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Основная информация о компании</CardTitle>
          <CardDescription>Управление данными вашей компании</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Название компании</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="taxId">ИНН</Label>
                <Input
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Юридический адрес</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Веб-сайт</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-logaz-blue">
                Сохранить изменения
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Функциональность системы</CardTitle>
          <CardDescription>Включение и отключение модулей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiBranch">Мульти-филиал</Label>
                <p className="text-sm text-muted-foreground">
                  Управление несколькими филиалами компании
                </p>
              </div>
              <Switch
                id="multiBranch"
                checked={features.enableMultiBranch}
                onCheckedChange={() => handleFeatureToggle("enableMultiBranch")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics">Аналитика</Label>
                <p className="text-sm text-muted-foreground">
                  Расширенная аналитика и отчеты
                </p>
              </div>
              <Switch
                id="analytics"
                checked={features.enableAnalytics}
                onCheckedChange={() => handleFeatureToggle("enableAnalytics")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="crm">CRM функциональность</Label>
                <p className="text-sm text-muted-foreground">
                  Управление клиентами и сделками
                </p>
              </div>
              <Switch
                id="crm"
                checked={features.enableCRM}
                onCheckedChange={() => handleFeatureToggle("enableCRM")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loyalty">Система лояльности</Label>
                <p className="text-sm text-muted-foreground">
                  Программы лояльности и маркетинг
                </p>
              </div>
              <Switch
                id="loyalty"
                checked={features.enableLoyalty}
                onCheckedChange={() => handleFeatureToggle("enableLoyalty")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettings;
