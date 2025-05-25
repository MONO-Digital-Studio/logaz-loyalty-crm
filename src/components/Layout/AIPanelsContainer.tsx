
import React from 'react';
import AIPanel from '../ai-assistant/shared/AIPanel';
import AIAssistantPanel from '../individuals/ai-assistant/AIAssistantPanel';
import LegalEntitiesAIPanel from '../legal-entities/ai-assistant/LegalEntitiesAIPanel';

const AIPanelsContainer: React.FC = () => {
  return (
    <>
      <AIPanel />
      <AIAssistantPanel />
      <LegalEntitiesAIPanel />
    </>
  );
};

export default AIPanelsContainer;
