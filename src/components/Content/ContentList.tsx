
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
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
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
  
  // Get unique categories for filter options
  const filterOptions = Array.from(new Set(contentItems.map(item => item.category)))
    .map(category => ({
      value: category,
      label: category
    }));

  // Add status filter options
  const statusOptions = Array.from(new Set(contentItems.map(item => item.status)))
    .map(status => ({
      value: `status:${status}`,
      label: `Статус: ${status}`
    }));

  const allFilterOptions = [...filterOptions, ...statusOptions];
  
  // Filter content based on search query and active filters
  const filteredContent = contentItems.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filters
    const categoryFilters = activeFilters.filter(f => !f.startsWith('status:'));
    const matchesCategory = categoryFilters.length === 0 || 
      categoryFilters.includes(item.category);
    
    // Status filters
    const statusFilters = activeFilters
      .filter(f => f.startsWith('status:'))
      .map(f => f.replace('status:', ''));
    const matchesStatus = statusFilters.length === 0 || 
      statusFilters.includes(item.status);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (id: number) => {
    navigate(`/content/editor/${id}`);
  };

  const handleDelete = (id: number) => {
    // В реальном приложении, здесь был бы вызов API для удаления элемента
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
  
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const searchPlaceholder = `Поиск ${getContentTypeName(contentType)}...`;

  return (
    <Card>
      <CardContent className="p-6">
        <ContentSearchBar
          placeholder={searchPlaceholder}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          filterOptions={allFilterOptions}
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
