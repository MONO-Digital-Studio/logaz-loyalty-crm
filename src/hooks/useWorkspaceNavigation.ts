
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { WorkspaceType } from '@/types/legal-entities';

export const useWorkspaceNavigation = () => {
  const navigate = useNavigate();
  const { currentWorkspace, switchWorkspace } = useWorkspace();

  const navigateToWorkspace = (workspace: WorkspaceType) => {
    switchWorkspace(workspace);
    
    // Перенаправляем на соответствующий дашборд
    if (workspace === 'legal-entities') {
      navigate('/legal-entities');
    } else {
      navigate('/dashboard');
    }
  };

  const getWorkspaceDefaultRoute = (workspace?: WorkspaceType) => {
    const targetWorkspace = workspace || currentWorkspace;
    return targetWorkspace === 'legal-entities' ? '/legal-entities' : '/dashboard';
  };

  return {
    navigateToWorkspace,
    getWorkspaceDefaultRoute,
    currentWorkspace,
  };
};
