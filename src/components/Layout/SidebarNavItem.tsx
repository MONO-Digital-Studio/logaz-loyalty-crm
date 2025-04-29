import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
interface NavItemProps {
  item: {
    id: string;
    title: string;
    path: string;
    children?: Array<{
      id: string;
      title: string;
      path: string;
    }>;
  };
  isOpen: boolean;
  expandedItems: string[];
  toggleItem: (id: string) => void;
  getIconForItem: (id: string) => React.ReactNode;
  getIconForSubItem: (parentId: string, childId: string) => React.ReactNode | null;
}
const SidebarNavItem: React.FC<NavItemProps> = ({
  item,
  isOpen,
  expandedItems,
  toggleItem,
  getIconForItem,
  getIconForSubItem
}) => {
  return <li key={item.id}>
      <div className="relative">
        <Link to={item.path} className={`flex items-center px-4 py-3 hover:bg-sidebar-accent transition-colors ${!isOpen ? 'justify-center' : ''}`}>
          <span className="text-sidebar-foreground">
            {getIconForItem(item.id)}
          </span>
          {isOpen && <span className="ml-4 flex-1">{item.title}</span>}
          {isOpen && item.children && <button onClick={e => {
          e.preventDefault();
          toggleItem(item.id);
        }} className="p-1">
              {expandedItems.includes(item.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>}
        </Link>
        
        {isOpen && item.children && expandedItems.includes(item.id) && <ul className="pl-8 bg-sidebar-accent/30 animate-fade-in">
            {item.children.map(child => <li key={child.id}>
                <Link to={child.path} className="flex items-center px-4 py-2 hover:bg-sidebar-accent transition-colors">
                  {getIconForSubItem(item.id, child.id) ? getIconForSubItem(item.id, child.id) : <span className="text-xs"></span>}
                  <span className="ml-4">{child.title}</span>
                </Link>
              </li>)}
          </ul>}
      </div>
    </li>;
};
export default SidebarNavItem;