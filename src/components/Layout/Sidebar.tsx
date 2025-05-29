
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

  const getIconForItemWithCollapse = (id: string) => {
    return getIconForItem(id, !isOpen);
  };

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col h-full ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      <SidebarLogo isOpen={isOpen} />

      {isOpen && <WorkspaceSwitcher />}

      <nav className="flex-1 overflow-hidden py-4">
        <div className="h-full overflow-y-auto scrollbar-hide">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                isOpen={isOpen}
                expandedItems={expandedItems}
                toggleItem={toggleItem}
                getIconForItem={getIconForItemWithCollapse}
                getIconForSubItem={getIconForSubItem}
              />
            ))}
          </ul>
        </div>
      </nav>

      <SidebarAISection isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;
