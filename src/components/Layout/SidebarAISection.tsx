
import React from 'react';
import { Brain, MessageCircle, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useWorkspaceAI } from '@/hooks/useWorkspaceAI';

interface SidebarAISectionProps {
  isOpen: boolean;
}

const SidebarAISection: React.FC<SidebarAISectionProps> = ({ isOpen }) => {
  const {
    currentAI,
    openCurrentPanel,
    getCriticalAlerts,
    getWorkspaceDisplayName,
  } = useWorkspaceAI();

  const criticalAlerts = getCriticalAlerts();

  const handleToggle = (checked: boolean) => {
    console.log('Switch toggled:', checked);
    console.log('Current AI enabled state before toggle:', currentAI.isEnabled);
    currentAI.toggleAI();
    console.log('Toggle AI method called');
  };

  if (!isOpen) return null;

  console.log('SidebarAISection render - AI enabled:', currentAI.isEnabled);

  return (
    <div className="ai-section border-t border-sidebar-border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Brain className="w-4 h-4 text-logaz-orange mr-2" />
          <span className="text-sm font-medium">ИИ-ассистент</span>
        </div>
        <Switch 
          checked={currentAI.isEnabled} 
          onCheckedChange={handleToggle}
        />
      </div>
      
      {currentAI.isEnabled && (
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-8 text-xs"
            onClick={openCurrentPanel}
          >
            <MessageCircle className="w-3 h-3 mr-2" />
            Открыть ассистента
          </Button>
          
          {criticalAlerts > 0 && (
            <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs">
              <div className="flex items-center">
                <Sparkles className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-700 dark:text-red-300">Критичных</span>
              </div>
              <span className="text-red-800 dark:text-red-200 font-medium">
                {criticalAlerts}
              </span>
            </div>
          )}
          
          <div className="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
            Режим: {getWorkspaceDisplayName()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarAISection;
