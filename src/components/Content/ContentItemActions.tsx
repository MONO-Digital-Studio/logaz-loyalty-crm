
import React from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash2, Eye } from "lucide-react";

interface ContentItemActionsProps {
  itemId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const ContentItemActions: React.FC<ContentItemActionsProps> = ({
  itemId,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(itemId)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Редактировать</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onView(itemId)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Просмотр</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive" 
          onClick={() => onDelete(itemId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Удалить</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentItemActions;
