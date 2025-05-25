
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { NavigationItem, WorkspaceType } from '@/types/navigation';
import { individualsNavigation } from '@/data/navigation/individualsNavigation';
import { legalEntitiesNavigation } from '@/data/navigation/legalEntitiesNavigation';
import { 
  findItemById, 
  getItemPath, 
  hasChildren, 
  isActive, 
  flattenNavigation 
} from '@/utils/navigation/navigationUtils';

export const useNavigation = () => {
  const { currentWorkspace } = useWorkspace();
  const location = useLocation();

  const navigationItems = useMemo(() => {
    return currentWorkspace === 'individuals' 
      ? individualsNavigation 
      : legalEntitiesNavigation;
  }, [currentWorkspace]);

  const utils = useMemo(() => ({
    findItemById: (id: string) => findItemById(navigationItems, id),
    getItemPath: (id: string) => getItemPath(navigationItems, id),
    hasChildren,
    isActive: (item: NavigationItem) => isActive(item, location.pathname),
    flattenNavigation: () => flattenNavigation(navigationItems),
  }), [navigationItems, location.pathname]);

  return {
    navigationItems,
    currentPath: location.pathname,
    currentWorkspace,
    ...utils,
  };
};
