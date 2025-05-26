import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CorporateActivityAnalysis,
  SuspiciousTransaction,
  CorporateInsight,
  CorporateAIPerformanceMetrics,
  CorporateChatMessage,
  FleetEfficiency,
  CostOptimization
} from '@/types/legal-entities-ai';
import {
  mockCorporateAnalysis,
  mockSuspiciousTransactions,
  mockCorporateInsights,
  mockCorporateAIMetrics,
  mockLegalEntitiesChatHistory,
  mockFleetEfficiency,
  mockCostOptimization
} from '@/data/legalEntitiesAIData';

interface LegalEntitiesAIContextType {
  corporateAnalysis: CorporateActivityAnalysis[];
  suspiciousTransactions: SuspiciousTransaction[];
  insights: CorporateInsight[];
  metrics: CorporateAIPerformanceMetrics;
  chatHistory: CorporateChatMessage[];
  fleetEfficiency: FleetEfficiency[];
  costOptimization: CostOptimization[];
  isLoading: boolean;
  isPanelOpen: boolean;
  isMinimized: boolean;
  openPanel: () => void;
  closePanel: () => void;
  toggleMinimize: () => void;
  sendMessage: (message: string) => Promise<void>;
  refreshInsights: () => void;
  dismissInsight: (insightId: string) => void;
  executeAction: (actionType: string, insightId: string) => void;
}

const LegalEntitiesAIContext = createContext<LegalEntitiesAIContextType | undefined>(undefined);

export const useLegalEntitiesAI = () => {
  const context = useContext(LegalEntitiesAIContext);
  if (!context) {
    throw new Error('useLegalEntitiesAI must be used within a LegalEntitiesAIProvider');
  }
  return context;
};

interface LegalEntitiesAIProviderProps {
  children: React.ReactNode;
}

export const LegalEntitiesAIProvider: React.FC<LegalEntitiesAIProviderProps> = ({ children }) => {
  const [corporateAnalysis] = useState<CorporateActivityAnalysis[]>(mockCorporateAnalysis);
  const [suspiciousTransactions] = useState<SuspiciousTransaction[]>(mockSuspiciousTransactions);
  const [insights, setInsights] = useState<CorporateInsight[]>(mockCorporateInsights);
  const [metrics] = useState<CorporateAIPerformanceMetrics>(mockCorporateAIMetrics);
  const [chatHistory, setChatHistory] = useState<CorporateChatMessage[]>(mockLegalEntitiesChatHistory);
  const [fleetEfficiency] = useState<FleetEfficiency[]>(mockFleetEfficiency);
  const [costOptimization] = useState<CostOptimization[]>(mockCostOptimization);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(() => {
    const saved = localStorage.getItem('legal-entities-ai-panel-open');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMinimized, setIsMinimized] = useState(() => {
    const saved = localStorage.getItem('legal-entities-ai-panel-minimized');
    return saved ? JSON.parse(saved) : false;
  });

  const openPanel = () => {
    setIsPanelOpen(true);
    setIsMinimized(false);
    localStorage.setItem('legal-entities-ai-panel-open', 'true');
    localStorage.setItem('legal-entities-ai-panel-minimized', 'false');
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    localStorage.setItem('legal-entities-ai-panel-open', 'false');
  };

  const toggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem('legal-entities-ai-panel-minimized', JSON.stringify(newMinimized));
  };

  const sendMessage = async (message: string) => {
    const userMessage: CorporateChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Симуляция обработки ИИ
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse: CorporateChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: generateAIResponse(message),
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, aiResponse]);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('риск') || lowerMessage.includes('отток')) {
      return 'Анализирую риски оттока клиентов... Обнаружено 2 компании с высоким риском: ООО "Логистик" (снижение активности на 30%) и ООО "БыстроГруз" (задержки платежей). Рекомендую немедленно связаться с ними.';
    }
    
    if (lowerMessage.includes('мошенничество') || lowerMessage.includes('подозрительн')) {
      return 'Система детекции мошенничества выявила 3 подозрительные транзакции за последние 24 часа. Самый высокий риск у транзакции TXN-2024-001 (score: 82). Рекомендую начать расследование.';
    }
    
    if (lowerMessage.includes('эффективность') || lowerMessage.includes('оптимизац')) {
      return 'Анализ эффективности показывает потенциал экономии 127,500₽ для 5 компаний. Основные возможности: оптимизация маршрутов (45%), улучшение топливной эффективности (35%), пересмотр лимитов карт (20%).';
    }
    
    if (lowerMessage.includes('отчет') || lowerMessage.includes('аналитик')) {
      return 'Готов сформировать отчеты по: активности компаний, рискам мошенничества, эффективности автопарков, соблюдению договорных условий. Какой отчет вас интересует?';
    }
    
    return 'Понял ваш запрос. Анализирую данные корпоративных клиентов... На основе текущих данных могу предоставить инсайты по рискам, возможностям оптимизации и рекомендации по работе с клиентами. Уточните, какая информация вам нужна?';
  };

  const refreshInsights = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const dismissInsight = (insightId: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId));
  };

  const executeAction = (actionType: string, insightId: string) => {
    console.log(`Executing action: ${actionType} for insight: ${insightId}`);
    // Здесь будет логика выполнения действий
  };

  return (
    <LegalEntitiesAIContext.Provider
      value={{
        corporateAnalysis,
        suspiciousTransactions,
        insights,
        metrics,
        chatHistory,
        fleetEfficiency,
        costOptimization,
        isLoading,
        isPanelOpen,
        isMinimized,
        openPanel,
        closePanel,
        toggleMinimize,
        sendMessage,
        refreshInsights,
        dismissInsight,
        executeAction,
      }}
    >
      {children}
    </LegalEntitiesAIContext.Provider>
  );
};
