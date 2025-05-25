
export interface NavigationItem {
  id: string;
  title: string;
  path?: string;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  items: NavigationItem[];
  workspace: WorkspaceType;
}

export type WorkspaceType = 'individuals' | 'legal-entities';

export interface NavigationUtils {
  findItemById: (id: string) => NavigationItem | null;
  getItemPath: (id: string) => string | null;
  hasChildren: (item: NavigationItem) => boolean;
  isActive: (item: NavigationItem, currentPath: string) => boolean;
}
