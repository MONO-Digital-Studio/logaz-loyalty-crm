
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PlusCircle, Map, Store } from "lucide-react";
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

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: "active" | "inactive";
}

const stores: StoreLocation[] = [
  {
    id: "1",
    name: "Центральный магазин",
    address: "ул. Ленина, 15, Москва",
    phone: "+7 (495) 123-45-67",
    manager: "Иванов И.И.",
    status: "active",
  },
  {
    id: "2",
    name: "ТЦ Гагаринский",
    address: "Гагаринская пл., 5, Москва",
    phone: "+7 (495) 987-65-43",
    manager: "Петров П.П.",
    status: "active",
  },
  {
    id: "3",
    name: "ТЦ Европейский",
    address: "пл. Киевского вокзала, 2, Москва",
    phone: "+7 (495) 765-43-21",
    manager: "Сидоров С.С.",
    status: "inactive",
  },
];

const StoreSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Торговая точка добавлена");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Торговые точки</CardTitle>
            <CardDescription>
              Управление физическими локациями вашего бизнеса
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-logaz-blue">
                <PlusCircle className="mr-2 h-4 w-4" />
                Добавить точку
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Добавить торговую точку</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveStore} className="space-y-4 pt-4">
                <div className="grid gap-4 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Название</Label>
                    <Input id="name" placeholder="Центральный магазин" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Адрес</Label>
                  <div className="flex gap-2">
                    <Input id="address" placeholder="ул. Ленина, 15, Москва" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">Управляющий</Label>
                  <Input id="manager" placeholder="Иванов И.И." />
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
            <Input
              placeholder="Поиск по названию или адресу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Адрес</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Управляющий</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        {store.name}
                      </div>
                    </TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>{store.phone}</TableCell>
                    <TableCell>{store.manager}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          store.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {store.status === "active" ? "Активна" : "Неактивна"}
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
      
      <Card>
        <CardHeader>
          <CardTitle>Настройки геолокации</CardTitle>
          <CardDescription>
            Настройка параметров для поиска ближайших торговых точек
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="maxDistance">Максимальное расстояние для поиска</Label>
                <div className="flex items-center gap-2">
                  <Input id="maxDistance" type="number" defaultValue={10} />
                  <span className="text-sm text-muted-foreground">км</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="defaultCity">Город по умолчанию</Label>
                <Input id="defaultCity" defaultValue="Москва" />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button 
                type="button"
                className="bg-logaz-blue"
                onClick={() => toast.success("Настройки геолокации сохранены")}
              >
                Сохранить настройки
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreSettings;
