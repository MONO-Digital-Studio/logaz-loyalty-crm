
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  Search, 
  MoreVertical, 
  Trash2, 
  Eye 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Примерные данные для отображения
const contentItems = [
  {
    id: 1,
    title: "Новые функции ЛОГАЗ SV",
    category: "Новости",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-25",
    views: 123,
  },
  {
    id: 2,
    title: "Руководство по интеграции с CRM",
    category: "Руководства",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  },
  {
    id: 3,
    title: "Обновление системы лояльности",
    category: "Новости",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-15",
    views: 89,
  },
  {
    id: 4,
    title: "Как повысить конверсию",
    category: "Статьи",
    status: "Запланировано",
    author: "Александр Домрачев",
    date: "2025-05-01",
    views: 0,
  }
];

const ContentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Опубликовано":
        return "bg-green-100 text-green-800";
      case "Черновик":
        return "bg-gray-100 text-gray-800";
      case "Запланировано":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск публикаций..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Фильтры</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{item.views}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Редактировать</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Просмотр</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Удалить</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    По вашему запросу ничего не найдено.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentList;
