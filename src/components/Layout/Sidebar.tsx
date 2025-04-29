
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../../data/mockData';
import { 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  HeadphonesIcon, 
  Settings, 
  Heart,
  BarChart,
  MessageSquare,
  UserCheck,
  LineChart,
  FileCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Map icons to navigation items based on their id
  const getIconForItem = (id: string) => {
    switch (id) {
      case 'dashboard':
        return <LayoutDashboard size={18} />;
      case 'crm':
        return <Users size={18} />;
      case 'products':
        return <ShoppingBag size={18} />;
      case 'content':
        return <FileText size={18} />;
      case 'contact_center':
        return <HeadphonesIcon size={18} />;
      case 'loyalty':
        return <Heart size={18} />;
      case 'analytics':
        return <BarChart size={18} />;
      default:
        return <ChevronRight size={18} />;
    }
  };

  // Get icons for submenu items
  const getIconForSubItem = (parentId: string, childId: string) => {
    if (parentId === 'contact_center') {
      switch (childId) {
        case 'dialogs':
          return <MessageSquare size={14} />;
        case 'agents':
          return <UserCheck size={14} />;
        case 'stats':
          return <LineChart size={14} />;
        case 'templates':
          return <FileCheck size={14} />;
        case 'analytics':
          return <BarChart size={14} />;
        default:
          return <ChevronRight size={14} />;
      }
    }
    return null;
  };

  // Create a modified version of navigationItems with "CRM" changed to "Клиенты"
  // Make sure there's only one "Аудитории" item
  const modifiedNavigationItems = navigationItems.map(item => {
    if (item.id === 'crm') {
      return { 
        ...item, 
        title: 'Клиенты',
        children: [
          ...(item.children || []).filter(child => child.id !== 'audiences'),
          { id: 'audiences', title: 'Аудитории', path: '/crm/audiences' }
        ]
      };
    }
    return item;
  });

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
        {isOpen ? (
          <h1 className="text-xl font-syncopate font-bold tracking-wide">ЛОГАЗ SV</h1>
        ) : (
          <h1 className="text-xl font-syncopate font-bold">ЛС</h1>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {modifiedNavigationItems.map((item) => (
            <li key={item.id}>
              <div className="relative">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 hover:bg-sidebar-accent transition-colors ${
                    !isOpen ? 'justify-center' : ''
                  }`}
                >
                  <span className="text-sidebar-foreground">
                    {getIconForItem(item.id)}
                  </span>
                  {isOpen && (
                    <span className="ml-4 flex-1">{item.title}</span>
                  )}
                  {isOpen && item.children && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleItem(item.id);
                      }}
                      className="p-1"
                    >
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  )}
                </Link>

                {isOpen && item.children && expandedItems.includes(item.id) && (
                  <ul className="pl-8 bg-sidebar-accent/30 animate-fade-in">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.path}
                          className="flex items-center px-4 py-2 hover:bg-sidebar-accent transition-colors"
                        >
                          {getIconForSubItem(item.id, child.id) ? (
                            getIconForSubItem(item.id, child.id)
                          ) : (
                            <span className="text-xs">●</span>
                          )}
                          <span className="ml-4">{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border flex justify-center">
        <Link 
          to="/settings" 
          className={`hover:bg-sidebar-accent p-2 rounded transition-colors ${
            isOpen ? 'w-full flex items-center' : 'w-10 h-10 flex items-center justify-center'
          }`}
        >
          <Settings size={18} className="text-sidebar-foreground" />
          {isOpen && <span className="ml-3">Настройки</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
