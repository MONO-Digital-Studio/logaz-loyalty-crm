import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";

// Sample data for news
const newsItems = [
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
    title: "Обновление системы лояльности",
    category: "Новости",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-15",
    views: 89,
  },
  {
    id: 4,
    title: "Запуск новой версии платформы",
    category: "Новости",
    status: "Запланировано",
    author: "Александр Домрачев",
    date: "2025-05-01",
    views: 0,
  }
];

// Sample data for text pages
const pageItems = [
  {
    id: 3,
    title: "О компании",
    category: "Информация",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-03-10",
    views: 342,
  },
  {
    id: 5,
    title: "Контактная информация",
    category: "Контакты",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-03-15",
    views: 271,
  },
  {
    id: 6,
    title: "Условия использования",
    category: "Правовая информация",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  },
  {
    id: 7,
    title: "Руководство по интеграции с CRM",
    category: "Руководства",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  }
];

// Sample data for promotions
const promotionItems = [
  {
    id: 8,
    title: "Скидка 20% на все услуги",
    category: "Акции",
    status: "Активно",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 245,
  },
  {
    id: 9,
    title: "Летняя распродажа",
    category: "Акции",
    status: "Запланировано",
    author: "Александр Домрачев",
    date: "2025-05-15",
    views: 0,
  },
  {
    id: 10,
    title: "Черная пятница",
    category: "Акции",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-11-20",
    views: 0,
  }
];

interface ContentListProps {
  contentType: "news" | "pages" | "promotions";
}

const ContentList: React.FC<ContentListProps> = ({ contentType }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Select content based on type
  let contentItems;
  switch (contentType) {
    case "news":
      contentItems = newsItems;
      break;
    case "pages":
      contentItems = pageItems;
      break;
    case "promotions":
      contentItems = promotionItems;
      break;
    default:
      contentItems = [];
  }
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Опубликовано":
      case "Активно":
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

  const handleEdit = (id: number) => {
    navigate(`/content/editor/${id}`);
  };

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the item
    let message = "";
    switch (contentType) {
      case "news":
        message = "Новость удалена";
        break;
      case "pages":
        message = "Страница удалена";
        break;
      case "promotions":
        message = "Акция удалена";
        break;
    }
    toast.success(message);
  };

  const handleView = (id: number) => {
    toast.info("Просмотр публикации (функция в разработке)");
  };

  const getContentTypeName = () => {
    switch (contentType) {
      case "news":
        return "новостей";
      case "pages":
        return "страниц";
      case "promotions":
        return "акций";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Поиск ${getContentTypeName()}...`}
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
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleEdit(item.id)}
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{item.views}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Редактировать</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleView(item.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Просмотр</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive" 
                            onClick={() => handleDelete(item.id)}
                          >
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
