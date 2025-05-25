
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
    switch (currentWorkspace) {
      case 'individuals':
        return {
          isEnabled: true,
          isPanelOpen: individualsAI.isPanelOpen,
          messages: [],
          metrics: {
            totalInsights: individualsAI.insights.length,
            criticalAlerts: individualsAI.insights.filter(i => i.priority === 'critical').length,
            efficiency: individualsAI.performance.businessImpact.operationalEfficiency,
            lastUpdate: new Date(),
          },
          toggleAI: () => {},
          openPanel: individualsAI.openPanel,
          closePanel: individualsAI.closePanel,
        };
      case 'legal-entities':
        return {
          isEnabled: true,
          isPanelOpen: legalEntitiesAI.isPanelOpen,
          messages: [],
          metrics: {
            totalInsights: legalEntitiesAI.insights.length,
            criticalAlerts: legalEntitiesAI.insights.filter(i => i.priority === 'critical').length,
            efficiency: legalEntitiesAI.metrics.efficiency,
            lastUpdate: legalEntitiesAI.metrics.lastUpdate,
          },
          toggleAI: () => {},
          openPanel: legalEntitiesAI.openPanel,
          closePanel: legalEntitiesAI.closePanel,
        };
      default:
        return generalAI;
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
