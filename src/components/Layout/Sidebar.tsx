
import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useAI } from '@/contexts/AIContext';
import { getNavigationForWorkspace } from '../../data/navigationData';
import SidebarNavItem from './SidebarNavItem';
import SidebarFooter from './SidebarFooter';
import WorkspaceSwitcher from '../workspace-switcher/WorkspaceSwitcher';
import { getIconForItem, getIconForSubItem } from '../../utils/sidebarIcons';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { currentWorkspace } = useWorkspace();
  const { isEnabled: isAIEnabled, toggleAI, openPanel, metrics } = useAI();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navigationItems = getNavigationForWorkspace(currentWorkspace);

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
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
        {isOpen ? (
          <h1 className="text-xl font-syncopate font-bold tracking-wide">ЛОГАЗ SV</h1>
        ) : (
          <h1 className="text-xl font-syncopate font-bold">ЛС</h1>
        )}
      </div>

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

      {/* AI Assistant Section - moved down */}
      {isOpen && (
        <div className="ai-section border-t border-sidebar-border px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Brain className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium">ИИ-Ассистент</span>
            </div>
            <Switch checked={isAIEnabled} onCheckedChange={toggleAI} />
          </div>
          
          {isAIEnabled && (
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start h-8 text-xs"
                onClick={openPanel}
              >
                <MessageCircle className="w-3 h-3 mr-2" />
                Открыть ассистента
              </Button>
              
              {metrics.criticalAlerts > 0 && (
                <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs">
                  <div className="flex items-center">
                    <Sparkles className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-red-700 dark:text-red-300">Критичных</span>
                  </div>
                  <span className="text-red-800 dark:text-red-200 font-medium">
                    {metrics.criticalAlerts}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <SidebarFooter isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;
