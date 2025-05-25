
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { EmployeeStatus } from "@/types/employees";

interface EmployeeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  departments: string[];
  statusFilter?: EmployeeStatus | null;
  setStatusFilter?: (status: EmployeeStatus | null) => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  departments,
  statusFilter,
  setStatusFilter
}) => {
  const statusOptions = [
    { value: "active", label: "Активный" },
    { value: "vacation", label: "В отпуске" },
    { value: "onboarding", label: "Адаптация" },
    { value: "fired", label: "Уволен" }
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени, должности или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <Select value={filter || "all"} onValueChange={setFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Все отделы" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все отделы</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {setStatusFilter && (
        <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value as EmployeeStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default EmployeeFilters;
