
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, DialogContent, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: number;
    name: string;
    productCount: number;
  };
}

const CategoryForm = ({ isOpen, onClose, category }: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const isEditing = Boolean(category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      toast.error("Название категории не может быть пустым");
      return;
    }

    // Here you would normally save to an API
    toast.success(
      isEditing 
        ? "Категория успешно обновлена" 
        : "Новая категория успешно создана"
    );
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать категорию" : "Добавить категорию"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="categoryName">Название категории</Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" className="bg-logaz-blue">
              {isEditing ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
