
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ContentSearchBar from "./ContentSearchBar";
import ContentTable from "./ContentTable";
import { 
  newsItems, 
  pageItems, 
  promotionItems, 
  getContentTypeName, 
  ContentItem 
} from "@/data/contentData";

interface ContentListProps {
  contentType: "news" | "pages" | "promotions";
}

const ContentList: React.FC<ContentListProps> = ({ contentType }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Select content based on type
  const getContentItems = (): ContentItem[] => {
    switch (contentType) {
      case "news":
        return newsItems;
      case "pages":
        return pageItems;
      case "promotions":
        return promotionItems;
      default:
        return [];
    }
  };
  
  const contentItems = getContentItems();
  
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const searchPlaceholder = `Поиск ${getContentTypeName(contentType)}...`;

  return (
    <Card>
      <CardContent className="p-6">
        <ContentSearchBar
          placeholder={searchPlaceholder}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <ContentTable
          items={filteredContent}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </CardContent>
    </Card>
  );
};

export default ContentList;
