
import React, { useState } from 'react';
import { navigationItems } from '../../data/mockData';
import SidebarNavItem from './SidebarNavItem';
import SidebarFooter from './SidebarFooter';
import { getIconForItem, getIconForSubItem } from '../../utils/sidebarIcons';

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
            <SidebarNavItem
              key={item.id}
              item={item}
              isOpen={isOpen}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
              getIconForItem={getIconForItem}
              getIconForSubItem={getIconForSubItem}
            />
          ))}
        </ul>
      </nav>

      <SidebarFooter isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;
