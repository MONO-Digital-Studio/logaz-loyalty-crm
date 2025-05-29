
import React from 'react';
import { useWorkspaceNavigation } from '@/hooks/useWorkspaceNavigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Building2 } from 'lucide-react';
import { WorkspaceType } from '@/types/legal-entities';

const WorkspaceSwitcher: React.FC = () => {
  const { currentWorkspace, navigateToWorkspace } = useWorkspaceNavigation();

  const handleWorkspaceChange = (value: WorkspaceType) => {
    navigateToWorkspace(value);
  };

  const getWorkspaceName = (workspace: WorkspaceType) => {
    return workspace === 'individuals' ? 'Физические лица' : 'Юридические лица';
  };

  return (
    <div className="workspace-switcher mb-6 p-4 border-b border-sidebar-border">
      <Select value={currentWorkspace} onValueChange={handleWorkspaceChange}>
        <SelectTrigger className="w-full bg-sidebar-accent/50 border-sidebar-border">
          <SelectValue placeholder="Выберите рабочее пространство">
            {getWorkspaceName(currentWorkspace)}
          </SelectValue>
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
    </div>
  );
};

export default WorkspaceSwitcher;
