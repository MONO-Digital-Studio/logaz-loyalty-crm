
import React, { useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import SidebarNavItem from './SidebarNavItem';
import SidebarLogo from './SidebarLogo';
import SidebarAISection from './SidebarAISection';
import WorkspaceSwitcher from '../workspace-switcher/WorkspaceSwitcher';
import { getIconForItem, getIconForSubItem } from '../../utils/sidebarIcons';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { navigationItems } = useNavigation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <SidebarLogo isOpen={isOpen} />

      {isOpen && <WorkspaceSwitcher />}

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
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

      <SidebarAISection isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;
