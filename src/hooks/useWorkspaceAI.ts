
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useAI } from '@/contexts/AIContext';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';
import { useLegalEntitiesAI } from '@/contexts/LegalEntitiesAIContext';

export const useWorkspaceAI = () => {
  const { currentWorkspace } = useWorkspace();
  const generalAI = useAI();
  const individualsAI = useIndividualsAI();
  const legalEntitiesAI = useLegalEntitiesAI();

  const getCurrentAI = () => {
    switch (currentWorkspace) {
      case 'individuals':
        return individualsAI;
      case 'legal-entities':
        return legalEntitiesAI;
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
    if ('insights' in currentAI) {
      return currentAI.insights.filter((insight: any) => insight.priority === 'critical').length;
    }
    return currentAI.metrics.criticalAlerts || 0;
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
