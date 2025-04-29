
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  PlusIcon, 
  Edit, 
  Trash2 
} from "lucide-react";
import { toast } from "sonner";

// Примерные данные для категорий
const initialCategories = [
  { id: 1, name: "Новости", count: 12 },
  { id: 2, name: "Руководства", count: 5 },
  { id: 3, name: "Статьи", count: 8 },
  { id: 4, name: "Кейсы", count: 3 },
  { id: 5, name: "FAQ", count: 10 }
];

const ContentCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{id: number, name: string} | null>(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Введите название категории");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      count: 0
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    toast.success("Категория добавлена");
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    if (!editingCategory.name.trim()) {
      toast.error("Введите название категории");
      return;
    }

    setCategories(
      categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: editingCategory.name } : cat
      )
    );
    
    setEditingCategory(null);
    toast.success("Категория обновлена");
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast.success("Категория удалена");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Категории контента</CardTitle>
          <CardDescription>
            Управление категориями для организации публикаций
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => (
              <div 
                key={category.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
              >
                <div>
                  <span className="font-medium">{category.name}</span>
                  <p className="text-sm text-muted-foreground">
                    {category.count} публикаций
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setEditingCategory({ id: category.id, name: category.name })}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Редактировать категорию</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Название
                          </Label>
                          <Input
                            id="edit-name"
                            value={editingCategory?.name || ""}
                            onChange={(e) => setEditingCategory(prev => 
                              prev ? { ...prev, name: e.target.value } : null
                            )}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleUpdateCategory}>Сохранить</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Добавить категорию</CardTitle>
          <CardDescription>
            Создайте новую категорию для публикаций
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">
                Название
              </Label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="col-span-3"
                placeholder="Введите название категории"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleAddCategory}>
                <PlusIcon className="mr-2" size={16} />
                Добавить категорию
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCategories;
