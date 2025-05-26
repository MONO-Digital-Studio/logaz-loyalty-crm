import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  IndividualsInsight,
  IndividualsPerformanceMetrics,
  IndividualsChatMessage,
  CustomerSegment,
  ChurnPrediction,
  ProductRecommendation,
  CampaignOptimization
} from '@/types/individuals-ai';
import {
  mockIndividualsInsights,
  mockIndividualsPerformance,
  mockIndividualsChatHistory,
  mockCustomerSegments,
  mockChurnPredictions,
  mockProductRecommendations,
  mockCampaignOptimizations
} from '@/data/individualsAIData';

interface IndividualsAIContextType {
  insights: IndividualsInsight[];
  performance: IndividualsPerformanceMetrics;
  chatHistory: IndividualsChatMessage[];
  customerSegments: CustomerSegment[];
  churnPredictions: ChurnPrediction[];
  productRecommendations: ProductRecommendation[];
  campaignOptimizations: CampaignOptimization[];
  isLoading: boolean;
  isPanelOpen: boolean;
  isMinimized: boolean;
  openPanel: () => void;
  closePanel: () => void;
  toggleMinimize: () => void;
  sendMessage: (message: string) => Promise<void>;
  refreshData: () => void;
  dismissInsight: (insightId: string) => void;
  executeAction: (actionType: string, insightId: string) => void;
}

const IndividualsAIContext = createContext<IndividualsAIContextType | undefined>(undefined);

export const useIndividualsAI = () => {
  const context = useContext(IndividualsAIContext);
  if (!context) {
    throw new Error('useIndividualsAI must be used within an IndividualsAIProvider');
  }
  return context;
};

interface IndividualsAIProviderProps {
  children: React.ReactNode;
}

export const IndividualsAIProvider: React.FC<IndividualsAIProviderProps> = ({ children }) => {
  const [insights, setInsights] = useState<IndividualsInsight[]>(mockIndividualsInsights);
  const [performance] = useState<IndividualsPerformanceMetrics>(mockIndividualsPerformance);
  const [chatHistory, setChatHistory] = useState<IndividualsChatMessage[]>(mockIndividualsChatHistory);
  const [customerSegments] = useState<CustomerSegment[]>(mockCustomerSegments);
  const [churnPredictions] = useState<ChurnPrediction[]>(mockChurnPredictions);
  const [productRecommendations] = useState<ProductRecommendation[]>(mockProductRecommendations);
  const [campaignOptimizations] = useState<CampaignOptimization[]>(mockCampaignOptimizations);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(() => {
    const saved = localStorage.getItem('individuals-ai-panel-open');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMinimized, setIsMinimized] = useState(() => {
    const saved = localStorage.getItem('individuals-ai-panel-minimized');
    return saved ? JSON.parse(saved) : false;
  });

  const openPanel = () => {
    setIsPanelOpen(true);
    setIsMinimized(false);
    localStorage.setItem('individuals-ai-panel-open', 'true');
    localStorage.setItem('individuals-ai-panel-minimized', 'false');
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    localStorage.setItem('individuals-ai-panel-open', 'false');
  };

  const toggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem('individuals-ai-panel-minimized', JSON.stringify(newMinimized));
  };

  const sendMessage = async (message: string) => {
    const userMessage: IndividualsChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Симуляция обработки ИИ
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse: IndividualsChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: generateAIResponse(message),
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, aiResponse]);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('отток') || lowerMessage.includes('риск')) {
      return 'Анализирую риски оттока клиентов... Обнаружено 247 клиентов с высоким риском (score > 0.8). Рекомендую запустить персонализированную кампаню удержания с предложением кэшбека 5%.';
    }
    
    if (lowerMessage.includes('сегмент') || lowerMessage.includes('группа')) {
      return 'Актуальная сегментация: VIP-клиенты (3.2%), Активные покупатели (28.5%), Редкие покупатели (45.3%), Новые клиенты (12.8%), Спящие (10.2%). Рекомендую активировать спящих клиентов через персональные предложения.';
    }
    
    if (lowerMessage.includes('рекомендаци') || lowerMessage.includes('товар')) {
      return 'Топ-3 продукта для cross-sell: Премиум 95 (+15% к среднему чеку), Автомойка (+8% частота визитов), Кофе (+12% лояльность). Точность модели: 84.2%.';
    }
    
    if (lowerMessage.includes('кампани') || lowerMessage.includes('акци')) {
      return 'Оптимизация кампаний: SMS-рассылка показывает ROI 340%, Email - 180%, Push - 95%. Рекомендую увеличить SMS-бюджет на 25% и перераспределить из Push-каналов.';
    }
    
    return 'Понял ваш запрос. Анализирую поведение клиентов... На основе данных за последние 30 дней могу предоставить инсайты по сегментации, рискам оттока, продуктовым рекомендациям и оптимизации кампаний. Что вас интересует больше всего?';
  };

  const refreshData = () => {
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
    <IndividualsAIContext.Provider
      value={{
        insights,
        performance,
        chatHistory,
        customerSegments,
        churnPredictions,
        productRecommendations,
        campaignOptimizations,
        isLoading,
        isPanelOpen,
        isMinimized,
        openPanel,
        closePanel,
        toggleMinimize,
        sendMessage,
        refreshData,
        dismissInsight,
        executeAction,
      }}
    >
      {children}
    </IndividualsAIContext.Provider>
  );
};
