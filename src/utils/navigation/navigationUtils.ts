
import { NavigationItem } from '@/types/navigation';

export const findItemById = (items: NavigationItem[], id: string): NavigationItem | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const getItemPath = (items: NavigationItem[], id: string): string | null => {
  const item = findItemById(items, id);
  return item?.path || null;
};

export const hasChildren = (item: NavigationItem): boolean => {
  return Boolean(item.children && item.children.length > 0);
};

export const isActive = (item: NavigationItem, currentPath: string): boolean => {
  if (item.path === currentPath) return true;
  
  if (item.children) {
    return item.children.some(child => isActive(child, currentPath));
  }
  
  return false;
};

export const flattenNavigation = (items: NavigationItem[]): NavigationItem[] => {
  const flattened: NavigationItem[] = [];
  
  const flatten = (items: NavigationItem[]) => {
    items.forEach(item => {
      flattened.push(item);
      if (item.children) {
        flatten(item.children);
      }
    });
  };
  
  flatten(items);
  return flattened;
};
