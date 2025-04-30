
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ContentItemActions from "./ContentItemActions";
import { ContentItem, getStatusColor } from "@/data/contentData";

interface ContentTableProps {
  items: ContentItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const ContentTable: React.FC<ContentTableProps> = ({
  items,
  onEdit,
  onDelete,
  onView
}) => {
  return (
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
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow 
                key={item.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onEdit(item.id)}
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
                  <ContentItemActions 
                    itemId={item.id} 
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                  />
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
  );
};

export default ContentTable;
