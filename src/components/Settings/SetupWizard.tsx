
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Настройка профиля компании",
    description: "Заполните информацию о компании",
    completed: true,
  },
  {
    id: 2,
    title: "Добавление торговых точек",
    description: "Укажите адреса и контакты ваших точек продаж",
    completed: true,
  },
  {
    id: 3,
    title: "Настройка интеграций",
    description: "Подключите системы учета и аналитики",
    completed: false,
  },
  {
    id: 4,
    title: "Настройка прав доступа",
    description: "Пригласите сотрудников и настройте их роли",
    completed: false,
  },
  {
    id: 5,
    title: "Тестирование системы",
    description: "Проверьте работу всех функций",
    completed: false,
  },
];

const SetupWizard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Мастер настройки</CardTitle>
        <CardDescription>
          Пошаговое руководство по настройке системы
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-medium">Прогресс настройки</h3>
            <p className="text-sm text-muted-foreground">
              Выполнено 2 из 5 шагов настройки
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Сбросить</Button>
            <Button className="bg-logaz-blue">Продолжить настройку</Button>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-logaz-blue h-2.5 rounded-full" style={{ width: "40%" }}></div>
        </div>

        <Separator />

        <div className="space-y-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`p-4 border rounded-lg flex items-start gap-4 ${
                step.completed ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              {step.completed ? (
                <CheckCircle className="text-green-500 h-6 w-6 mt-0.5" />
              ) : (
                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-muted border border-muted-foreground text-muted-foreground mt-0.5">
                  {step.id}
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <div className="ml-auto">
                <Button 
                  variant={step.completed ? "outline" : "default"} 
                  size="sm"
                >
                  {step.completed ? "Изменить" : "Настроить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupWizard;
