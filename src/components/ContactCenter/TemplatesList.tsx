
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, FileText } from 'lucide-react';
import { ResponseTemplate } from '@/types/contactCenter';

// Моковые данные шаблонов
const mockTemplates: ResponseTemplate[] = [
  {
    id: '1',
    title: 'Приветствие нового клиента',
    text: 'Здравствуйте! Благодарим за обращение в нашу компанию. Чем я могу вам помочь?',
    category: 'Приветствия',
    tags: ['приветствие', 'новый клиент'],
    usageCount: 245,
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: '2',
    title: 'Прощание',
    text: 'Спасибо за обращение! Если у вас возникнут дополнительные вопросы, пожалуйста, не стесняйтесь обращаться к нам снова. Хорошего дня!',
    category: 'Прощания',
    tags: ['прощание', 'завершение'],
    usageCount: 198,
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-11-20')
  },
  {
    id: '3',
    title: 'Запрос дополнительной информации',
    text: 'Чтобы лучше помочь вам с этим вопросом, мне потребуется немного больше информации. Не могли бы вы уточнить...?',
    category: 'Уточнения',
    tags: ['запрос', 'информация', 'уточнение'],
    usageCount: 132,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-10-10')
  },
  {
    id: '4',
    title: 'Информация о доставке',
    text: 'Ваш заказ будет доставлен в течение 2-3 рабочих дней. Курьер свяжется с вами за час до доставки.',
    category: 'Доставка',
    tags: ['доставка', 'заказ', 'сроки'],
    usageCount: 167,
    createdAt: new Date('2023-07-12'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: '5',
    title: 'Извинения за задержку',
    text: 'Приносим извинения за задержку. Мы делаем все возможное, чтобы решить вашу проблему как можно скорее.',
    category: 'Извинения',
    tags: ['извинения', 'задержка', 'проблема'],
    usageCount: 89,
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-08-15')
  }
];

const TemplatesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [templates, setTemplates] = useState<ResponseTemplate[]>(mockTemplates);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  
  // Категории шаблонов
  const categories = Array.from(new Set(templates.map(template => template.category)));
  
  // Фильтрация шаблонов по поисковому запросу и категории
  const filteredTemplates = templates.filter(template => {
    const matchesQuery = !searchQuery || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });

  // Обработка создания нового шаблона
  const handleCreateTemplate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь будет логика создания шаблона
    setIsNewTemplateDialogOpen(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center w-full md:w-auto gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Поиск шаблонов..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-logaz-blue flex items-center gap-2">
              <Plus size={18} />
              Новый шаблон
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Создать новый шаблон ответа</DialogTitle>
              <DialogDescription>
                Создайте новый шаблон ответа для использования в диалогах с клиентами.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateTemplate} className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Название шаблона
                  </label>
                  <Input id="title" placeholder="Введите название шаблона" required />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Категория
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="new_category">Новая категория...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Теги (через запятую)
                  </label>
                  <Input id="tags" placeholder="приветствие, новый клиент, ..." />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="text" className="text-sm font-medium">
                    Текст шаблона
                  </label>
                  <Textarea 
                    id="text" 
                    placeholder="Введите текст шаблона..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" className="bg-logaz-blue">
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Теги</TableHead>
                <TableHead className="text-right">Использовано</TableHead>
                <TableHead className="text-right">Обновлено</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id} className="cursor-pointer hover:bg-muted/60">
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText size={16} className="text-logaz-blue" />
                    {template.title}
                  </TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs bg-muted rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{template.usageCount}</TableCell>
                  <TableCell className="text-right">
                    {template.updatedAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesList;
