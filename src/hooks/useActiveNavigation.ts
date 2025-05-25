
import { useNavigation } from './useNavigation';
import { NavigationItem } from '@/types/navigation';

export const useActiveNavigation = () => {
  const { navigationItems, currentPath, isActive } = useNavigation();

  const getActiveItem = (): NavigationItem | null => {
    const findActive = (items: NavigationItem[]): NavigationItem | null => {
      for (const item of items) {
        if (isActive(item)) {
          return item;
        }
        if (item.children) {
          const activeChild = findActive(item.children);
          if (activeChild) return activeChild;
        }
      }
      return null;
    };

    return findActive(navigationItems);
  };

  const getBreadcrumbs = (): NavigationItem[] => {
    const breadcrumbs: NavigationItem[] = [];
    
    const findPath = (items: NavigationItem[], targetPath: string, path: NavigationItem[] = []): boolean => {
      for (const item of items) {
        const currentPath = [...path, item];
        
        if (item.path === targetPath) {
          breadcrumbs.push(...currentPath);
          return true;
        }
        
        if (item.children && findPath(item.children, targetPath, currentPath)) {
          return true;
        }
      }
      return false;
    };

    findPath(navigationItems, currentPath);
    return breadcrumbs;
  };

  return {
    activeItem: getActiveItem(),
    breadcrumbs: getBreadcrumbs(),
    isActive,
  };
};
