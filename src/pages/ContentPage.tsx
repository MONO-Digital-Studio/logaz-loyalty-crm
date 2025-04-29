
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
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

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="articles">Публикации</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <ContentList />
        </TabsContent>
        
        <TabsContent value="categories">
          <ContentCategories />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentPage;
