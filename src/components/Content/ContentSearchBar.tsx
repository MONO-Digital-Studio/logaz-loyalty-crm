
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  value: string;
  label: string;
}

interface ContentSearchBarProps {
  placeholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  filterOptions?: FilterOption[];
}

const ContentSearchBar: React.FC<ContentSearchBarProps> = ({
  placeholder,
  searchQuery,
  onSearchChange,
  onFilterChange,
  filterOptions = []
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleFilterSelect = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter(filter => filter !== value)
      : [...selectedFilters, value];
    
    setSelectedFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const removeFilter = (value: string) => {
    const updatedFilters = selectedFilters.filter(filter => filter !== value);
    setSelectedFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
              {selectedFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-2">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {filterOptions.length > 0 ? (
              <Command>
                <CommandInput placeholder="Поиск фильтров..." />
                <CommandList>
                  <CommandEmpty>Фильтры не найдены</CommandEmpty>
                  <CommandGroup>
                    {filterOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleFilterSelect(option.value)}
                        className="flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {selectedFilters.includes(option.value) && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Нет доступных фильтров
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map(filter => {
            const option = filterOptions.find(opt => opt.value === filter);
            return (
              <Badge key={filter} variant="secondary" className="px-3 py-1">
                {option?.label || filter}
                <button
                  className="ml-2 rounded-full outline-none"
                  onClick={() => removeFilter(filter)}
                >
                  ×
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentSearchBar;
