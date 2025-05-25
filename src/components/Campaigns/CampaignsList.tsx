
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
import { useCampaignTableData } from "@/hooks/useCampaignTableData";
import { campaignsData } from "@/data/campaignsData";
import { CampaignType, StandardCampaign, TemplateCampaign, AutomatedCampaign } from "@/types/campaigns";

interface CampaignsListProps {
  campaignType: CampaignType;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaignType }) => {
  const navigate = useNavigate();
  const campaigns = campaignsData[campaignType] || [];
  
  const {
    data: filteredCampaigns,
    updateFilter,
    filters
  } = useCampaignTableData(campaigns, campaignType);
  
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
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead className="min-w-[200px]">Название</TableHead>
            <TableHead className="w-32 text-center">Статус</TableHead>
            <TableHead className="w-24 text-center">Получатели</TableHead>
            <TableHead className="w-20 text-center">Open Rate</TableHead>
            <TableHead className="w-20 text-center">Click Rate</TableHead>
            <TableHead className="w-32 text-center">Дата отправки</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        );
      case "templates":
        return (
          <TableRow>
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead className="min-w-[200px]">Название</TableHead>
            <TableHead className="w-24 text-center">Канал</TableHead>
            <TableHead className="w-32 text-center">Статус</TableHead>
            <TableHead className="w-32 text-center">Используется в</TableHead>
            <TableHead className="w-40 text-center">Последнее использование</TableHead>
            <TableHead className="w-32 text-center">Дата создания</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        );
      case "automated":
        return (
          <TableRow>
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead className="min-w-[200px]">Название</TableHead>
            <TableHead className="w-24 text-center">Канал</TableHead>
            <TableHead className="w-32 text-center">Статус</TableHead>
            <TableHead className="w-24 text-center">Получатели</TableHead>
            <TableHead className="w-28 text-center">Завершаемость</TableHead>
            <TableHead className="w-32 text-center">Дата создания</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        );
    }
  };

  const renderStandardCampaignRow = (item: StandardCampaign) => (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => handleEdit(item.id)}
    >
      <TableCell className="font-mono text-sm text-muted-foreground text-center">
        {item.id}
      </TableCell>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell className="text-center">
        <Badge className={getStatusColor(item.status)} variant="outline">
          {item.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{item.recipients.toLocaleString()}</TableCell>
      <TableCell className="text-center">{item.openRate}</TableCell>
      <TableCell className="text-center">{item.clickRate}</TableCell>
      <TableCell className="text-center">{item.sentDate ? new Date(item.sentDate).toLocaleDateString('ru-RU') : "—"}</TableCell>
      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
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

  const renderTemplateCampaignRow = (item: TemplateCampaign) => (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => handleEdit(item.id)}
    >
      <TableCell className="font-mono text-sm text-muted-foreground text-center">
        {item.id}
      </TableCell>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell className="text-center">
        <Badge variant="secondary">{item.channel}</Badge>
      </TableCell>
      <TableCell className="text-center">
        <Badge className={getStatusColor(item.status)} variant="outline">
          {item.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{item.usedIn} кампаниях</TableCell>
      <TableCell className="text-center">{item.lastUsed ? new Date(item.lastUsed).toLocaleDateString('ru-RU') : "—"}</TableCell>
      <TableCell className="text-center">{new Date(item.createdDate).toLocaleDateString('ru-RU')}</TableCell>
      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
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

  const renderAutomatedCampaignRow = (item: AutomatedCampaign) => (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => handleEdit(item.id)}
    >
      <TableCell className="font-mono text-sm text-muted-foreground text-center">
        {item.id}
      </TableCell>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell className="text-center">
        <Badge variant="secondary">{item.channel}</Badge>
      </TableCell>
      <TableCell className="text-center">
        <Badge className={getStatusColor(item.status)} variant="outline">
          {item.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{item.recipients.toLocaleString()}</TableCell>
      <TableCell className="text-center">{item.completionRate}</TableCell>
      <TableCell className="text-center">{new Date(item.createdDate).toLocaleDateString('ru-RU')}</TableCell>
      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
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

  const renderTableRow = (item: any) => {
    switch(campaignType) {
      case "email":
      case "push":
      case "telegram":
      case "sms":
        return renderStandardCampaignRow(item as StandardCampaign);
      case "templates":
        return renderTemplateCampaignRow(item as TemplateCampaign);
      case "automated":
        return renderAutomatedCampaignRow(item as AutomatedCampaign);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
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

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsList;
