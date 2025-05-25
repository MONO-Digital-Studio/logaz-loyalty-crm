
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IndividualClientAnalysis, ChurnPrediction, LoyaltyInsight, AIPerformanceMetrics } from '@/types/individuals-ai';
import { mockIndividualAnalyses, mockChurnPredictions, mockLoyaltyInsights, mockAIPerformance } from '@/data/individualsAIData';

interface IndividualsAIContextType {
  // Данные ИИ
  clientAnalyses: IndividualClientAnalysis[];
  churnPredictions: ChurnPrediction[];
  insights: LoyaltyInsight[];
  performance: AIPerformanceMetrics;
  
  // Состояние
  isLoading: boolean;
  isPanelOpen: boolean;
  isMinimized: boolean;
  
  // Методы управления
  openPanel: () => void;
  closePanel: () => void;
  toggleMinimize: () => void;
  refreshData: () => Promise<void>;
  
  // Методы взаимодействия
  dismissInsight: (insightId: string) => void;
  executeRecommendation: (clientId: string, actionType: string) => Promise<void>;
  analyzeClient: (clientId: string) => Promise<IndividualClientAnalysis | null>;
  
  // Чат
  chatHistory: Array<{ id: string; type: 'user' | 'assistant'; content: string; timestamp: Date }>;
  sendMessage: (message: string) => Promise<void>;
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
  const [clientAnalyses, setClientAnalyses] = useState<IndividualClientAnalysis[]>([]);
  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>([]);
  const [insights, setInsights] = useState<LoyaltyInsight[]>([]);
  const [performance] = useState<AIPerformanceMetrics>(mockAIPerformance);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; type: 'user' | 'assistant'; content: string; timestamp: Date }>>([
    {
      id: '1',
      type: 'assistant',
      content: 'Добро пожаловать в ИИ-ассистент ЛОГАЗ SV! Я помогу вам анализировать программу лояльности и клиентскую базу. Задайте любой вопрос о ваших клиентах.',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setClientAnalyses(mockIndividualAnalyses);
    setChurnPredictions(mockChurnPredictions);
    setInsights(mockLoyaltyInsights);
    
    setIsLoading(false);
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

  const dismissInsight = (insightId: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId));
  };

  const executeRecommendation = async (clientId: string, actionType: string) => {
    console.log(`Выполняется действие: ${actionType} для клиента: ${clientId}`);
    
    // Имитация выполнения действия
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Добавляем сообщение в чат об успешном выполнении
    const message = {
      id: Date.now().toString(),
      type: 'assistant' as const,
      content: `Действие "${actionType}" успешно выполнено для клиента ${clientId}. Уведомление отправлено.`,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, message]);
  };

  const analyzeClient = async (clientId: string): Promise<IndividualClientAnalysis | null> => {
    const analysis = clientAnalyses.find(a => a.clientId === clientId);
    return analysis || null;
  };

  const sendMessage = async (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Имитация ответа ИИ
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateAIResponse(message);
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, assistantMessage]);
  };

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('отток') || lowerMessage.includes('риск')) {
      return 'Анализирую данные по оттоку клиентов... Обнаружено 23 клиента с высоким риском оттока в ближайшие 30 дней. Рекомендую создать персонализированные предложения для удержания этих клиентов.';
    }
    
    if (lowerMessage.includes('баллы') || lowerMessage.includes('сгорают')) {
      return 'Проверяю статус баллов лояльности... У 89 клиентов истекают баллы в течение 7 дней. Общая сумма: 156,780 баллов. Рекомендую отправить push-уведомления с напоминанием.';
    }
    
    if (lowerMessage.includes('vip') || lowerMessage.includes('плат')) {
      return 'Анализ VIP-клиентов показывает снижение активности у 15 платиновых клиентов. Средний период неактивности: 32 дня. Предлагаю запустить персональную кампанию возврата.';
    }
    
    if (lowerMessage.includes('акци') || lowerMessage.includes('кампани')) {
      return 'Анализирую эффективность текущих акций... Конверсия по SMS-рассылкам: 12.3%, по push-уведомлениям: 8.7%. Рекомендую увеличить персонализацию предложений.';
    }
    
    if (lowerMessage.includes('сегмент') || lowerMessage.includes('rfm')) {
      return 'RFM-анализ показывает: Чемпионы - 23%, Верные клиенты - 31%, Под угрозой - 18%, Требуют внимания - 28%. Рекомендую сосредоточиться на сегменте "Под угрозой".';
    }
    
    return 'Анализирую ваш запрос... На основе данных программы лояльности подготавливаю персонализированные рекомендации для оптимизации работы с клиентами.';
  };

  return (
    <IndividualsAIContext.Provider
      value={{
        clientAnalyses,
        churnPredictions,
        insights,
        performance,
        isLoading,
        isPanelOpen,
        isMinimized,
        openPanel,
        closePanel,
        toggleMinimize,
        refreshData,
        dismissInsight,
        executeRecommendation,
        analyzeClient,
        chatHistory,
        sendMessage,
      }}
    >
      {children}
    </IndividualsAIContext.Provider>
  );
};
