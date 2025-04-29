
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const DisplaySettings = () => {
  const [settings, setSettings] = useState({
    colorScheme: "light",
    sidebarCollapsed: false,
    compactMode: false,
    showStatistics: true,
    showHelp: true,
    fontSize: "medium",
  });

  const handleToggle = (setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Настройки отображения сохранены");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки отображения</CardTitle>
        <CardDescription>
          Настройте внешний вид и поведение интерфейса
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="colorScheme">Цветовая схема</Label>
              <Select
                value={settings.colorScheme}
                onValueChange={(value) => handleSelectChange("colorScheme", value)}
              >
                <SelectTrigger id="colorScheme" className="max-w-sm">
                  <SelectValue placeholder="Выберите цветовую схему" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Светлая</SelectItem>
                  <SelectItem value="dark">Темная</SelectItem>
                  <SelectItem value="system">Системная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sidebarCollapsed">Свернутая боковая панель</Label>
                <p className="text-sm text-muted-foreground">
                  Боковая панель будет свернута по умолчанию
                </p>
              </div>
              <Switch
                id="sidebarCollapsed"
                checked={settings.sidebarCollapsed}
                onCheckedChange={(checked) => handleToggle("sidebarCollapsed", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compactMode">Компактный режим</Label>
                <p className="text-sm text-muted-foreground">
                  Уменьшить отступы для отображения большего количества информации
                </p>
              </div>
              <Switch
                id="compactMode"
                checked={settings.compactMode}
                onCheckedChange={(checked) => handleToggle("compactMode", checked)}
              />
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label htmlFor="fontSize">Размер шрифта</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value) => handleSelectChange("fontSize", value)}
              >
                <SelectTrigger id="fontSize" className="max-w-sm">
                  <SelectValue placeholder="Выберите размер шрифта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Маленький</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="large">Большой</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showStatistics">Показывать статистику</Label>
                <p className="text-sm text-muted-foreground">
                  Отображать статистику на главной странице
                </p>
              </div>
              <Switch
                id="showStatistics"
                checked={settings.showStatistics}
                onCheckedChange={(checked) => handleToggle("showStatistics", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showHelp">Показывать подсказки</Label>
                <p className="text-sm text-muted-foreground">
                  Отображать подсказки при наведении на элементы интерфейса
                </p>
              </div>
              <Switch
                id="showHelp"
                checked={settings.showHelp}
                onCheckedChange={(checked) => handleToggle("showHelp", checked)}
              />
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
  );
};

export default DisplaySettings;
