
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Initial categories data - would normally come from an API
const categories = [
  { id: 1, name: "Новости" },
  { id: 2, name: "Руководства" },
  { id: 3, name: "Статьи" },
  { id: 4, name: "Кейсы" },
  { id: 5, name: "FAQ" }
];

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

// Form schema
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Название должно содержать не менее 5 символов",
  }),
  category: z.string({
    required_error: "Выберите категорию",
  }),
  content: z.string().min(50, {
    message: "Содержание должно быть не менее 50 символов",
  }),
  status: z.string({
    required_error: "Выберите статус",
  }),
});

const ContentEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    document.title = `${isEditing ? "Редактирование" : "Создание"} публикации | ЛОГАЗ SV`;
  }, [isEditing]);

  // Initialize form with data if editing
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      status: "Черновик",
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      // Find content by ID - in a real app, this would be an API call
      const contentItem = contentItems.find(item => item.id === Number(id));
      
      if (contentItem) {
        // Populate form with found content
        form.reset({
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
  }, [isEditing, id, form, navigate]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main content section */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Содержание публикации</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Заголовок</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Введите заголовок публикации" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Текст публикации</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Введите текст публикации" 
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Медиафайлы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <p className="text-muted-foreground mb-2">
                      Перетащите файлы сюда или нажмите для выбора
                    </p>
                    <Button variant="outline">Загрузить изображения</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки публикации</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Категория</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Статус</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Черновик">Черновик</SelectItem>
                            <SelectItem value="Опубликовано">Опубликовано</SelectItem>
                            <SelectItem value="Запланировано">Запланировано</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <div className="space-y-2 pt-2">
                      <p className="text-sm font-medium">Информация</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Автор: Александр Домрачев</p>
                        <p>Создано: {new Date().toLocaleDateString('ru-RU')}</p>
                        <p>Просмотры: 0</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Button className="bg-logaz-blue w-full" type="submit">
                  <Save className="mr-2" size={18} />
                  Сохранить
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/content")}>
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentEditorPage;
