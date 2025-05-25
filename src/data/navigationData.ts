
import { WorkspaceType } from '@/types/legal-entities';
import { NavigationItem } from '@/types/navigation';
import { individualsNavigation } from './navigation/individualsNavigation';
import { legalEntitiesNavigation } from './navigation/legalEntitiesNavigation';

// Экспортируем для обратной совместимости
export { individualsNavigation, legalEntitiesNavigation };

export const getNavigationForWorkspace = (workspace: WorkspaceType): NavigationItem[] => {
  return workspace === 'individuals' ? individualsNavigation : legalEntitiesNavigation;
};
