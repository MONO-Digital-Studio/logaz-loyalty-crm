
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  initials: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Александр Домрачев",
    email: "admin@logaz.ru",
    role: "admin",
    status: "active",
    lastActive: "Сегодня, 10:32",
    initials: "АД",
  },
  {
    id: "2",
    name: "Ольга Смирнова",
    email: "olga@logaz.ru",
    role: "manager",
    status: "active",
    lastActive: "Вчера, 15:47",
    initials: "ОС",
  },
  {
    id: "3",
    name: "Иван Петров",
    email: "ivan@logaz.ru",
    role: "user",
    status: "active",
    lastActive: "22.04.2025, 09:15",
    initials: "ИП",
  },
  {
    id: "4",
    name: "Мария Иванова",
    email: "maria@external.com",
    role: "guest",
    status: "pending",
    lastActive: "Никогда",
    initials: "МИ",
  },
];

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const roles: Role[] = [
  {
    id: "admin",
    name: "Администратор",
    description: "Полный доступ ко всем функциям системы",
    permissions: [
      "управление_пользователями",
      "управление_ролями",
      "настройки_системы",
      "просмотр_отчетов",
      "управление_клиентами",
      "управление_содержимым",
    ],
  },
  {
    id: "manager",
    name: "Менеджер",
    description: "Доступ к управлению клиентами и взаимодействию с ними",
    permissions: [
      "просмотр_отчетов",
      "управление_клиентами",
      "управление_содержимым",
    ],
  },
  {
    id: "user",
    name: "Пользователь",
    description: "Базовый доступ к системе",
    permissions: [
      "просмотр_отчетов",
      "управление_клиентами",
    ],
  },
  {
    id: "guest",
    name: "Гость",
    description: "Ограниченный доступ только для просмотра",
    permissions: [
      "просмотр_отчетов",
    ],
  },
];

const permissionsMap: Record<string, string> = {
  "управление_пользователями": "Управление пользователями",
  "управление_ролями": "Управление ролями",
  "настройки_системы": "Настройки системы",
  "просмотр_отчетов": "Просмотр отчетов",
  "управление_клиентами": "Управление клиентами",
  "управление_содержимым": "Управление содержимым",
};

const UserAccessSettings = () => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("user");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Приглашение отправлено на ${inviteEmail}`);
    setInviteEmail("");
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "pending") => {
    toast.success(`Статус пользователя изменен на "${
      newStatus === "active" ? "Активен" : 
      newStatus === "inactive" ? "Неактивен" : "Ожидает подтверждения"
    }"`);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    toast.success(`Роль пользователя изменена на "${
      roles.find(r => r.id === newRole)?.name || newRole
    }"`);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole({...role});
  };

  const handleSaveRole = () => {
    if (editingRole) {
      toast.success(`Роль "${editingRole.name}" обновлена`);
      setEditingRole(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="roles">Роли и разрешения</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Пригласить нового пользователя</CardTitle>
              <CardDescription>
                Отправьте приглашение новому пользователю для доступа к системе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email адрес</Label>
                    <Input
                      id="email"
                      placeholder="example@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Роль</Label>
                    <Select 
                      value={inviteRole} 
                      onValueChange={setInviteRole}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Отправить приглашение</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Управление пользователями</CardTitle>
              <CardDescription>
                Просмотр и управление существующими пользователями системы
              </CardDescription>
              <div className="mt-2">
                <Input
                  placeholder="Поиск пользователей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Последняя активность</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <div className="bg-logaz-blue text-white text-xs flex items-center justify-center h-full">
                              {user.initials}
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          defaultValue={user.role} 
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select 
                          defaultValue={user.status} 
                          onValueChange={(value: any) => handleStatusChange(user.id, value)}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Активен</SelectItem>
                            <SelectItem value="inactive">Неактивен</SelectItem>
                            <SelectItem value="pending">Ожидает подтверждения</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Открыть меню</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Сбросить пароль</DropdownMenuItem>
                            <DropdownMenuItem>История активности</DropdownMenuItem>
                            {user.id !== "1" && (
                              <DropdownMenuItem className="text-red-500">
                                Удалить пользователя
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление ролями</CardTitle>
              <CardDescription>
                Настройте роли и разрешения для пользователей системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editingRole ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="roleName">Название роли</Label>
                      <Input
                        id="roleName"
                        value={editingRole.name}
                        onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="roleDescription">Описание</Label>
                      <Input
                        id="roleDescription"
                        value={editingRole.description}
                        onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Разрешения</h3>
                    <div className="space-y-2">
                      {Object.entries(permissionsMap).map(([key, label]) => (
                        <div className="flex items-center space-x-2" key={key}>
                          <Switch
                            id={`permission-${key}`}
                            checked={editingRole.permissions.includes(key)}
                            onCheckedChange={(checked) => {
                              const newPermissions = checked 
                                ? [...editingRole.permissions, key]
                                : editingRole.permissions.filter(p => p !== key);
                              setEditingRole({...editingRole, permissions: newPermissions});
                            }}
                          />
                          <Label htmlFor={`permission-${key}`}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingRole(null)}
                    >
                      Отмена
                    </Button>
                    <Button onClick={handleSaveRole}>
                      Сохранить
                    </Button>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Разрешения</TableHead>
                      <TableHead className="w-[100px]">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission) => (
                              <span 
                                key={permission}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {permissionsMap[permission] || permission}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRole(role)}
                            disabled={role.id === "admin"}
                          >
                            Редактировать
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Глобальные настройки доступа</CardTitle>
              <CardDescription>
                Контроль доступа к системе на уровне организации
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                    <p className="text-sm text-muted-foreground">
                      Требовать 2FA для всех пользователей с административными правами
                    </p>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sessionTimeout">Тайм-аут сессии</Label>
                    <p className="text-sm text-muted-foreground">
                      Автоматически выходить из системы после 30 минут неактивности
                    </p>
                  </div>
                  <Switch id="sessionTimeout" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="guestAccess">Гостевой доступ</Label>
                    <p className="text-sm text-muted-foreground">
                      Разрешить доступ с ограниченными правами без регистрации
                    </p>
                  </div>
                  <Switch id="guestAccess" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccessSettings;
