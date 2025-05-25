
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useAI } from '@/contexts/AIContext';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';
import { useLegalEntitiesAI } from '@/contexts/LegalEntitiesAIContext';
import { BaseAIState } from '@/types/ai';

export const useWorkspaceAI = () => {
  const { currentWorkspace } = useWorkspace();
  const generalAI = useAI();
  const individualsAI = useIndividualsAI();
  const legalEntitiesAI = useLegalEntitiesAI();

  const getCurrentAI = (): BaseAIState => {
    console.log('getCurrentAI called for workspace:', currentWorkspace);
    console.log('generalAI.isEnabled:', generalAI.isEnabled);
    
    switch (currentWorkspace) {
      case 'individuals':
        return {
          isEnabled: generalAI.isEnabled,
          isPanelOpen: individualsAI.isPanelOpen,
          messages: generalAI.chatHistory || [],
          metrics: {
            totalInsights: individualsAI.insights.length,
            criticalAlerts: individualsAI.insights.filter(i => i.priority === 'critical').length,
            efficiency: individualsAI.performance.businessImpact.operationalEfficiency,
            lastUpdate: new Date(),
          },
          toggleAI: () => {
            console.log('toggleAI called for individuals workspace');
            generalAI.toggleAI();
          },
          openPanel: individualsAI.openPanel,
          closePanel: individualsAI.closePanel,
          addMessage: generalAI.sendMessage ? (msg) => generalAI.sendMessage(msg.content) : () => {},
          clearMessages: () => {},
          updateMetrics: () => {},
        };
      case 'legal-entities':
        return {
          isEnabled: generalAI.isEnabled,
          isPanelOpen: legalEntitiesAI.isPanelOpen,
          messages: generalAI.chatHistory || [],
          metrics: {
            totalInsights: legalEntitiesAI.insights.length,
            criticalAlerts: legalEntitiesAI.insights.filter(i => i.priority === 'critical').length,
            efficiency: legalEntitiesAI.metrics.efficiency,
            lastUpdate: legalEntitiesAI.metrics.lastUpdate,
          },
          toggleAI: () => {
            console.log('toggleAI called for legal-entities workspace');
            generalAI.toggleAI();
          },
          openPanel: legalEntitiesAI.openPanel,
          closePanel: legalEntitiesAI.closePanel,
          addMessage: generalAI.sendMessage ? (msg) => generalAI.sendMessage(msg.content) : () => {},
          clearMessages: () => {},
          updateMetrics: () => {},
        };
      default:
        return {
          ...generalAI,
          messages: generalAI.chatHistory || [],
          toggleAI: () => {
            console.log('toggleAI called for default workspace');
            generalAI.toggleAI();
          },
          addMessage: generalAI.sendMessage ? (msg) => generalAI.sendMessage(msg.content) : () => {},
          clearMessages: () => {},
          updateMetrics: () => {},
        };
    }
  };

  const openCurrentPanel = () => {
    const currentAI = getCurrentAI();
    currentAI.openPanel();
  };

  const getCurrentMetrics = () => {
    const currentAI = getCurrentAI();
    return currentAI.metrics;
  };

  const getCriticalAlerts = () => {
    const currentAI = getCurrentAI();
    return currentAI.metrics.criticalAlerts;
  };

  return {
    currentWorkspace,
    currentAI: getCurrentAI(),
    openCurrentPanel,
    getCurrentMetrics,
    getCriticalAlerts,
    getWorkspaceDisplayName: () => {
      switch (currentWorkspace) {
        case 'individuals':
          return 'Физические лица';
        case 'legal-entities':
          return 'Юридические лица';
        default:
          return 'Общий';
      }
    },
  };
};
