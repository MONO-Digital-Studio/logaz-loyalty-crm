
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

// Initial categories data - would normally come from an API
const categories = [
  { id: 1, name: "Новости" },
  { id: 2, name: "Руководства" },
  { id: 3, name: "Статьи" },
  { id: 4, name: "Кейсы" },
  { id: 5, name: "FAQ" }
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

export type ContentFormValues = z.infer<typeof formSchema>;

interface ContentFormProps {
  initialValues?: ContentFormValues;
  isEditing: boolean;
  onSubmit: (values: ContentFormValues) => void;
  onCancel: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  initialValues,
  isEditing,
  onSubmit,
  onCancel
}) => {
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: "",
      category: "",
      content: "",
      status: "Черновик",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content section */}
          <div className="md:col-span-2 space-y-6">
            <ContentMainSection form={form} />
            <MediaUploadSection />
          </div>
          
          {/* Sidebar settings */}
          <div className="space-y-6">
            <ContentSidebar form={form} isEditing={isEditing} />

            <div className="flex flex-col gap-2">
              <Button className="bg-logaz-blue w-full" type="submit">
                <Save className="mr-2" size={18} />
                Сохранить
              </Button>
              <Button variant="outline" className="w-full" onClick={onCancel}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

const ContentMainSection = ({ form }) => {
  return (
    <div className="stats-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Содержание публикации</h3>
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
    </div>
  );
};

const MediaUploadSection = () => {
  return (
    <div className="stats-card p-6">
      <h3 className="text-lg font-semibold mb-4">Медиафайлы</h3>
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <p className="text-muted-foreground mb-2">
          Перетащите файлы сюда или нажмите для выбора
        </p>
        <Button variant="outline">Загрузить изображения</Button>
      </div>
    </div>
  );
};

const ContentSidebar = ({ form, isEditing }) => {
  return (
    <div className="stats-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Настройки публикации</h3>
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
    </div>
  );
};

export default ContentForm;
