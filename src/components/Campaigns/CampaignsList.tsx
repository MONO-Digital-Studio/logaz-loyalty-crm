import React from "react";
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
  Eye,
  Send,
  Pause,
  Play
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useTableData } from "@/hooks/useTableData";
import { campaignsData } from "@/data/campaignsData";

interface CampaignsListProps {
  campaignType: "email" | "push" | "telegram" | "sms" | "templates" | "automated";
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaignType }) => {
  const navigate = useNavigate();
  const campaigns = campaignsData[campaignType] || [];
  
  const {
    data: filteredCampaigns,
    updateFilter,
    filters
  } = useTableData(campaigns, ['title']);
  
  const getStatusColor = (status: string) => {
    const statusColors = {
      "Отправлена": "bg-green-100 text-green-800",
      "Черновик": "bg-gray-100 text-gray-800",
      "Запланирована": "bg-blue-100 text-blue-800",
      "Запущена": "bg-green-100 text-green-800",
      "Приостановлена": "bg-orange-100 text-orange-800",
      "Активен": "bg-green-100 text-green-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  const handleEdit = (id: number) => {
    navigate(`/contact-center/campaigns/editor/${id}`);
  };

  const handleDelete = (id: number) => {
    toast.success("Рассылка удалена");
  };

  const handleView = (id: number) => {
    toast.info("Просмотр рассылки (функция в разработке)");
  };

  const handleSendNow = (id: number) => {
    toast.success("Рассылка поставлена в очередь на отправку");
  };

  const handleTogglePause = (id: number, status: string) => {
    const message = status === "Приостановлена" ? "Рассылка возобновлена" : "Рассылка приостановлена";
    toast.success(message);
  };

  const renderTableHeaders = () => {
    switch(campaignType) {
      case "email":
      case "push":
      case "telegram":
      case "sms":
        return (
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Получатели</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead>Click Rate</TableHead>
            <TableHead>Дата отправки</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        );
      case "templates":
        return (
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Канал</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Используется в</TableHead>
            <TableHead>Последнее использование</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        );
      case "automated":
        return (
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Канал</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Получатели</TableHead>
            <TableHead>Завершаемость</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        );
    }
  };

  const renderTableRow = (item: any) => {
    switch(campaignType) {
      case "email":
      case "push":
      case "telegram":
      case "sms":
        return (
          <TableRow 
            key={item.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleEdit(item.id)}
          >
            <TableCell className="font-mono text-sm text-muted-foreground">
              {item.id}
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(item.status)} variant="outline">
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>{item.recipients}</TableCell>
            <TableCell>{item.openRate}</TableCell>
            <TableCell>{item.clickRate}</TableCell>
            <TableCell>{item.sentDate ? new Date(item.sentDate).toLocaleDateString('ru-RU') : "—"}</TableCell>
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
                  {item.status === "Черновик" && (
                    <DropdownMenuItem onClick={() => handleSendNow(item.id)}>
                      <Send className="mr-2 h-4 w-4" />
                      <span>Отправить сейчас</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleView(item.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Аналитика</span>
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
        );
      case "templates":
        return (
          <TableRow 
            key={item.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleEdit(item.id)}
          >
            <TableCell className="font-mono text-sm text-muted-foreground">
              {item.id}
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant="secondary">{item.channel}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(item.status)} variant="outline">
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>{item.usedIn} кампаниях</TableCell>
            <TableCell>{item.lastUsed ? new Date(item.lastUsed).toLocaleDateString('ru-RU') : "—"}</TableCell>
            <TableCell>{new Date(item.createdDate).toLocaleDateString('ru-RU')}</TableCell>
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
                  <DropdownMenuItem onClick={() => navigate("/contact-center/campaigns/editor?template=" + item.id)}>
                    <Send className="mr-2 h-4 w-4" />
                    <span>Создать рассылку</span>
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
        );
      case "automated":
        return (
          <TableRow 
            key={item.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleEdit(item.id)}
          >
            <TableCell className="font-mono text-sm text-muted-foreground">
              {item.id}
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant="secondary">{item.channel}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(item.status)} variant="outline">
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>{item.recipients}</TableCell>
            <TableCell>{item.completionRate}</TableCell>
            <TableCell>{new Date(item.createdDate).toLocaleDateString('ru-RU')}</TableCell>
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
                  <DropdownMenuItem onClick={() => handleTogglePause(item.id, item.status)}>
                    {item.status === "Приостановлена" ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Возобновить</span>
                      </>
                    ) : (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        <span>Приостановить</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleView(item.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Аналитика</span>
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
        );
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск рассылок..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>
          <Button variant="outline">Фильтры</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((item) => renderTableRow(item))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
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

export default CampaignsList;
