
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavChildItem {
  id: string;
  title: string;
  path?: string;
  children?: NavChildItem[];
}

interface NavItemProps {
  item: {
    id: string;
    title: string;
    path?: string;
    children?: NavChildItem[];
  };
  isOpen: boolean;
  expandedItems: string[];
  toggleItem: (id: string) => void;
  getIconForItem: (id: string) => React.ReactNode;
  getIconForSubItem: (parentId: string, childId: string) => React.ReactNode | null;
  level?: number;
}

const SidebarNavItem: React.FC<NavItemProps> = ({
  item,
  isOpen,
  expandedItems,
  toggleItem,
  getIconForItem,
  getIconForSubItem,
  level = 0,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const hasPath = item.path && item.path.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      toggleItem(item.id);
    }
  };

  const content = (
    <>
      <span className="text-sidebar-foreground">
        {level === 0 ? getIconForItem(item.id) : getIconForSubItem(item.id.split('.')[0], item.id.split('.')[1])}
      </span>
      {isOpen && <span className="ml-4 flex-1">{item.title}</span>}
      {isOpen && hasChildren && (
        <span className="p-1">
          {expandedItems.includes(item.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </>
  );

  return (
    <li key={item.id}>
      <div className="relative">
        {hasPath ? (
          <Link 
            to={item.path!} 
            className={`flex items-center px-4 py-3 hover:bg-sidebar-accent transition-colors ${!isOpen ? 'justify-center' : ''}`}
            onClick={handleClick}
          >
            {content}
          </Link>
        ) : (
          <button
            className={`w-full flex items-center px-4 py-3 hover:bg-sidebar-accent transition-colors ${!isOpen ? 'justify-center' : ''}`}
            onClick={handleClick}
          >
            {content}
          </button>
        )}
        
        {isOpen && hasChildren && expandedItems.includes(item.id) && (
          <ul className={`pl-${level > 0 ? '4' : '8'} bg-sidebar-accent/30 animate-fade-in`}>
            {item.children!.map(child => {
              const childId = level === 0 ? `${item.id}.${child.id}` : `${item.id}.${child.id}`;
              
              if (child.children && child.children.length > 0) {
                return (
                  <SidebarNavItem
                    key={childId}
                    item={{
                      ...child,
                      id: childId,
                    }}
                    isOpen={isOpen}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                    getIconForItem={getIconForItem}
                    getIconForSubItem={getIconForSubItem}
                    level={level + 1}
                  />
                );
              }
              
              return (
                <li key={childId}>
                  {child.path ? (
                    <Link to={child.path} className="flex items-center py-2 hover:bg-sidebar-accent transition-colors px-4">
                      {getIconForSubItem(item.id, child.id) && (
                        <span className="text-xs">{getIconForSubItem(item.id, child.id)}</span>
                      )}
                      <span className="ml-4">{child.title}</span>
                    </Link>
                  ) : (
                    <button className="w-full flex items-center py-2 hover:bg-sidebar-accent transition-colors px-4">
                      {getIconForSubItem(item.id, child.id) && (
                        <span className="text-xs">{getIconForSubItem(item.id, child.id)}</span>
                      )}
                      <span className="ml-4">{child.title}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

export default SidebarNavItem;
