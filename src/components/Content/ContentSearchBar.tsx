
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ContentSearchBarProps {
  placeholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ContentSearchBar: React.FC<ContentSearchBarProps> = ({
  placeholder,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline">Фильтры</Button>
    </div>
  );
};

export default ContentSearchBar;
