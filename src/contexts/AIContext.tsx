
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AIInsight, AIRecommendation, ChatMessage, AIMetrics, WorkspaceType } from '@/types/ai';
import { useWorkspace } from './WorkspaceContext';
import { 
  mockIndividualInsights, 
  mockCorporateInsights,
  mockIndividualRecommendations,
  mockCorporateRecommendations,
  mockChatHistory 
} from '@/data/mockAIData';

interface AIContextType {
  // Состояние ИИ
  isEnabled: boolean;
  isLoading: boolean;
  isPanelOpen: boolean;
  isMinimized: boolean;
  
  // Данные ИИ
  insights: AIInsight[];
  recommendations: AIRecommendation[];
  chatHistory: ChatMessage[];
  metrics: AIMetrics;
  
  // Методы управления
  toggleAI: () => void;
  openPanel: () => void;
  closePanel: () => void;
  toggleMinimize: () => void;
  
  // Методы взаимодействия
  sendMessage: (message: string) => Promise<void>;
  refreshInsights: () => Promise<void>;
  dismissInsight: (insightId: string) => void;
  executeAction: (actionType: string, insightId: string) => Promise<void>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: React.ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const { currentWorkspace } = useWorkspace();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(mockChatHistory);

  // Автоматическое обновление данных при смене пространства
  useEffect(() => {
    if (isEnabled) {
      refreshInsights();
    }
  }, [currentWorkspace, isEnabled]);

  const refreshInsights = async () => {
    setIsLoading(true);
    
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (currentWorkspace === 'individuals') {
      setInsights(mockIndividualInsights);
      setRecommendations(mockIndividualRecommendations);
    } else {
      setInsights(mockCorporateInsights);
      setRecommendations(mockCorporateRecommendations);
    }
    
    setIsLoading(false);
  };

  const toggleAI = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      refreshInsights();
    } else {
      setIsPanelOpen(false);
    }
  };

  const openPanel = () => {
    setIsPanelOpen(true);
    setIsMinimized(false);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const sendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      workspace: currentWorkspace
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Имитация ответа ИИ
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: generateMockResponse(message, currentWorkspace),
      timestamp: new Date(),
      workspace: currentWorkspace
    };

    setChatHistory(prev => [...prev, aiResponse]);
  };

  const dismissInsight = (insightId: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId));
  };

  const executeAction = async (actionType: string, insightId: string) => {
    console.log(`Executing action: ${actionType} for insight: ${insightId}`);
    // Здесь будет логика выполнения действий
    dismissInsight(insightId);
  };

  const metrics: AIMetrics = {
    totalInsights: insights.length,
    criticalAlerts: insights.filter(i => i.priority === 'critical').length,
    automatedActions: 12,
    efficiency: 87,
    lastUpdate: new Date()
  };

  return (
    <AIContext.Provider
      value={{
        isEnabled,
        isLoading,
        isPanelOpen,
        isMinimized,
        insights,
        recommendations,
        chatHistory: chatHistory.filter(msg => msg.workspace === currentWorkspace),
        metrics,
        toggleAI,
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
    </AIContext.Provider>
  );
};

// Функция для генерации mock-ответов ИИ
const generateMockResponse = (message: string, workspace: WorkspaceType): string => {
  const lowerMessage = message.toLowerCase();
  
  if (workspace === 'individuals') {
    if (lowerMessage.includes('отток') || lowerMessage.includes('клиент')) {
      return 'Анализирую данные по оттоку клиентов... Обнаружено 23 клиента с высоким риском оттока. Рекомендую создать персонализированные предложения для удержания.';
    }
    if (lowerMessage.includes('лояльность') || lowerMessage.includes('программа')) {
      return 'Программа лояльности показывает снижение активности на 15%. Предлагаю пересмотреть условия начисления бонусов.';
    }
  } else {
    if (lowerMessage.includes('мошенничество') || lowerMessage.includes('подозрительн')) {
      return 'Система обнаружила 3 подозрительные транзакции. Все случаи требуют детального расследования.';
    }
    if (lowerMessage.includes('автопарк') || lowerMessage.includes('оптимизац')) {
      return 'Анализ автопарка показывает возможность экономии до 25% топлива при оптимизации маршрутов.';
    }
  }
  
  return 'Я анализирую ваш запрос и подготавливаю персонализированные рекомендации на основе данных CRM.';
};
