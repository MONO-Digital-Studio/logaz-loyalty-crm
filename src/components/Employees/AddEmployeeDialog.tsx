
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AddEmployeeDialogProps {
  departments: string[];
  positions: string[];
}

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ departments, positions }) => {
  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Сотрудник добавлен");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-logaz-blue">
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Добавить сотрудника</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSaveEmployee} className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">ФИО</Label>
              <Input id="name" placeholder="Иванов Иван Иванович" />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="department">Отдел</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Должность</Label>
                <Select>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="employee@logaz.ru" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="bg-logaz-blue">
                Сохранить
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
