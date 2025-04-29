
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import ContentForm, { ContentFormValues } from "@/components/Content/ContentForm";

// Sample content - would normally come from an API
const contentItems = [
  {
    id: 1,
    title: "Новые функции ЛОГАЗ SV",
    category: "Новости",
    content: "Детальное описание новых функций системы ЛОГАЗ SV...",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-25",
    views: 123,
  },
  {
    id: 2,
    title: "Руководство по интеграции с CRM",
    category: "Руководства",
    content: "Пошаговая инструкция по интеграции с различными CRM системами...",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  }
];

const ContentEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [initialValues, setInitialValues] = useState<ContentFormValues | undefined>();

  useEffect(() => {
    document.title = `${isEditing ? "Редактирование" : "Создание"} публикации | ЛОГАЗ SV`;
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && id) {
      // Find content by ID - in a real app, this would be an API call
      const contentItem = contentItems.find(item => item.id === Number(id));
      
      if (contentItem) {
        // Populate form with found content
        setInitialValues({
          title: contentItem.title,
          category: contentItem.category,
          content: contentItem.content,
          status: contentItem.status,
        });
      } else {
        // Content not found
        toast.error("Публикация не найдена");
        navigate("/content");
      }
    }
  }, [isEditing, id, navigate]);

  const handleSubmit = (values: ContentFormValues) => {
    // Here we would normally send the data to an API
    console.log(values);
    
    // Show success message
    toast.success(`Публикация успешно ${isEditing ? "обновлена" : "создана"}`);
    
    // Redirect back to content listing
    navigate("/content");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate("/content")} className="mr-4">
          <ArrowLeft className="mr-2" size={18} />
          Назад
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Редактирование публикации" : "Новая публикация"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Внесите изменения в существующую публикацию" : "Создайте новую публикацию или материал"}
          </p>
        </div>
      </div>

      <ContentForm 
        initialValues={initialValues}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/content")}
      />
    </div>
  );
};

export default ContentEditorPage;
