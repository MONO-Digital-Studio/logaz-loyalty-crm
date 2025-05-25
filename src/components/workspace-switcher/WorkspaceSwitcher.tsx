
import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Building2 } from 'lucide-react';
import { WorkspaceType } from '@/types/legal-entities';

const WorkspaceSwitcher: React.FC = () => {
  const { currentWorkspace, switchWorkspace, isLoading } = useWorkspace();

  const handleWorkspaceChange = (value: WorkspaceType) => {
    switchWorkspace(value);
  };

  return (
    <div className="workspace-switcher mb-6 p-4 border-b border-sidebar-border">
      <Select value={currentWorkspace} onValueChange={handleWorkspaceChange} disabled={isLoading}>
        <SelectTrigger className="w-full bg-sidebar-accent/50 border-sidebar-border">
          <div className="flex items-center">
            {currentWorkspace === 'individuals' ? (
              <Users className="w-4 h-4 mr-2 text-sidebar-foreground" />
            ) : (
              <Building2 className="w-4 h-4 mr-2 text-sidebar-foreground" />
            )}
            <SelectValue placeholder="Выберите рабочее пространство" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="individuals" className="cursor-pointer">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Физические лица
            </div>
          </SelectItem>
          <SelectItem value="legal-entities" className="cursor-pointer">
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Юридические лица
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      {isLoading && (
        <div className="mt-2 text-xs text-sidebar-foreground/70 animate-pulse">
          Переключение рабочего пространства...
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
