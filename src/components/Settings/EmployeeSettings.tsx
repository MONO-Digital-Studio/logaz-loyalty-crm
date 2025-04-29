
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircle, Search, UserCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "vacation" | "fired" | "onboarding";
  initials: string;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    position: "Директор",
    department: "Руководство",
    email: "ivanov@logaz.ru",
    phone: "+7 (495) 123-45-67",
    status: "active",
    initials: "ИИ",
  },
  {
    id: "2",
    name: "Петрова Марина Сергеевна",
    position: "Менеджер по продажам",
    department: "Продажи",
    email: "petrova@logaz.ru",
    phone: "+7 (495) 234-56-78",
    status: "active",
    initials: "МП",
  },
  {
    id: "3",
    name: "Сидоров Алексей Петрович",
    position: "Бухгалтер",
    department: "Финансы",
    email: "sidorov@logaz.ru",
    phone: "+7 (495) 345-67-89",
    status: "vacation",
    initials: "АС",
  },
  {
    id: "4",
    name: "Кузнецова Ольга Владимировна",
    position: "HR-специалист",
    department: "Персонал",
    email: "kuznetsova@logaz.ru",
    phone: "+7 (495) 456-78-90",
    status: "active",
    initials: "ОК",
  },
  {
    id: "5",
    name: "Новиков Дмитрий Александрович",
    position: "Стажер",
    department: "ИТ",
    email: "novikov@logaz.ru",
    phone: "+7 (495) 567-89-01",
    status: "onboarding",
    initials: "ДН",
  },
];

const departments = [
  "Руководство",
  "Продажи",
  "Маркетинг",
  "Финансы",
  "Персонал",
  "ИТ",
  "Логистика",
  "Производство",
];

const positions = [
  "Директор",
  "Заместитель директора",
  "Менеджер",
  "Менеджер по продажам",
  "Бухгалтер",
  "HR-специалист",
  "Разработчик",
  "Стажер",
];

interface EmployeeSettingsProps {
  currentSubtab?: string;
}

const EmployeeSettings: React.FC<EmployeeSettingsProps> = ({ currentSubtab = "list" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      (searchQuery === "" || 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filter === null || filter === "all" || employee.department === filter)
  );

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Сотрудник добавлен");
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Работает";
      case "vacation": return "В отпуске";
      case "fired": return "Уволен";
      case "onboarding": return "Стажировка";
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "vacation": return "bg-blue-100 text-blue-800";
      case "fired": return "bg-red-100 text-red-800";
      case "onboarding": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Show employees list
  if (currentSubtab === "list") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Сотрудники</CardTitle>
              <CardDescription>
                Управление данными о сотрудниках компании
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-logaz-blue">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Добавить сотрудника
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Добавить сотрудника</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveEmployee} className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">ФИО</Label>
                      <Input id="name" placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="department">Отдел</Label>
                        <Select>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Выберите отдел" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="position">Должность</Label>
                        <Select>
                          <SelectTrigger id="position">
                            <SelectValue placeholder="Выберите должность" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((pos) => (
                              <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="employee@logaz.ru" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder="+7 (___) ___-__-__" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-3">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Отмена
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-logaz-blue">
                        Сохранить
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по имени, должности или email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={filter || "all"} onValueChange={setFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Все отделы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все отделы</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Отдел</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <div className="bg-logaz-blue text-white text-xs flex items-center justify-center h-full">
                              {employee.initials}
                            </div>
                          </Avatar>
                          <span>{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{employee.email}</div>
                          <div className="text-sm text-muted-foreground">{employee.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(employee.status)}`}
                        >
                          {getStatusText(employee.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Изменить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show structure tab
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Организационная структура</CardTitle>
          <CardDescription>
            Управление структурой организации и отделами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex justify-center pb-4">
              <div className="border rounded-md p-4 text-center w-48">
                <div className="flex justify-center mb-2">
                  <Avatar className="h-12 w-12">
                    <div className="bg-logaz-blue text-white flex items-center justify-center h-full">
                      ИИ
                    </div>
                  </Avatar>
                </div>
                <div className="font-medium">Иванов И.И.</div>
                <div className="text-sm text-muted-foreground">Директор</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {departments.slice(1, 7).map((dept, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{dept}</h3>
                    <Button variant="ghost" size="sm">
                      Редактировать
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {employees
                      .filter(e => e.department === dept)
                      .slice(0, 1)
                      .map(employee => (
                        <div key={employee.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="bg-logaz-blue text-white text-xs flex items-center justify-center h-full">
                              {employee.initials}
                            </div>
                          </Avatar>
                          <span className="text-sm">{employee.name}</span>
                        </div>
                      ))}
                    <Button variant="ghost" size="sm" className="w-full">
                      <UserCircle className="h-4 w-4 mr-1" />
                      {employees.filter(e => e.department === dept).length > 0 ? 
                        `Показать всех (${employees.filter(e => e.department === dept).length})` : 
                        "Добавить сотрудника"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Добавить отдел
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeSettings;
