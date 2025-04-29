
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, FileText, Newspaper } from "lucide-react";
import ContentList from "@/components/Content/ContentList";
import ContentCategories from "@/components/Content/ContentCategories";
import { useNavigate } from "react-router-dom";

const ContentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Контент | ЛОГАЗ SV";
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление контентом</h1>
          <p className="text-muted-foreground mt-1">
            Создание и редактирование публикаций, статей и материалов
          </p>
        </div>
        <Button 
          className="bg-logaz-blue"
          onClick={() => navigate("/content/editor")}
        >
          <PlusIcon className="mr-2" size={18} />
          Создать публикацию
        </Button>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper size={16} />
            Новости
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText size={16} />
            Текстовые страницы
          </TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <ContentList contentType="news" />
        </TabsContent>
        
        <TabsContent value="pages">
          <ContentList contentType="pages" />
        </TabsContent>
        
        <TabsContent value="categories">
          <ContentCategories />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentPage;
