
import React from 'react';
import { Brain, MessageCircle, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useAI } from '@/contexts/AIContext';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';
import { useLegalEntitiesAI } from '@/contexts/LegalEntitiesAIContext';

interface SidebarAISectionProps {
  isOpen: boolean;
}

const SidebarAISection: React.FC<SidebarAISectionProps> = ({ isOpen }) => {
  const { currentWorkspace } = useWorkspace();
  const { isEnabled: isAIEnabled, toggleAI, openPanel, metrics } = useAI();
  const { 
    openPanel: openIndividualsPanel, 
    insights: individualsInsights 
  } = useIndividualsAI();
  const {
    openPanel: openLegalEntitiesPanel,
    metrics: legalEntitiesMetrics
  } = useLegalEntitiesAI();

  const criticalAlerts = currentWorkspace === 'individuals' 
    ? individualsInsights.filter(i => i.priority === 'critical').length
    : currentWorkspace === 'legal-entities'
    ? legalEntitiesMetrics.criticalAlerts
    : metrics.criticalAlerts;

  const handleOpenPanel = () => {
    if (currentWorkspace === 'individuals') {
      openIndividualsPanel();
    } else if (currentWorkspace === 'legal-entities') {
      openLegalEntitiesPanel();
    } else {
      openPanel();
    }
  };

  const getWorkspaceDisplayName = () => {
    switch (currentWorkspace) {
      case 'individuals':
        return 'Физические лица';
      case 'legal-entities':
        return 'Юридические лица';
      default:
        return 'Общий';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ai-section border-t border-sidebar-border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Brain className="w-4 h-4 text-logaz-orange mr-2" />
          <span className="text-sm font-medium">ИИ-ассистент</span>
        </div>
        <Switch checked={isAIEnabled} onCheckedChange={toggleAI} />
      </div>
      
      {isAIEnabled && (
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-8 text-xs"
            onClick={handleOpenPanel}
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
