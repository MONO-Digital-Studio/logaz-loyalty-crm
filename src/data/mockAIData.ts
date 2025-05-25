
import { AIInsight, AIRecommendation, ChatMessage } from '@/types/ai';

export const mockIndividualInsights: AIInsight[] = [
  {
    id: '1',
    type: 'loyalty_analysis',
    title: 'Снижение активности VIP-клиентов',
    message: '15 VIP-клиентов не заправлялись более 30 дней',
    priority: 'high',
    action: 'create_retention_campaign',
    timestamp: new Date(Date.now() - 3600000),
    workspace: 'individuals'
  },
  {
    id: '2',
    type: 'churn_prediction',
    title: 'Прогноз оттока',
    message: '23 клиента с высоким риском оттока в следующем месяце',
    priority: 'medium',
    action: 'personalized_offers',
    timestamp: new Date(Date.now() - 7200000),
    workspace: 'individuals'
  },
  {
    id: '3',
    type: 'personalization',
    title: 'Возможности персонализации',
    message: 'Для 89 клиентов доступны персонализированные предложения',
    priority: 'low',
    action: 'personalized_offers',
    timestamp: new Date(Date.now() - 10800000),
    workspace: 'individuals'
  }
];

export const mockCorporateInsights: AIInsight[] = [
  {
    id: '1',
    type: 'fraud_detection',
    title: 'Подозрительные транзакции',
    message: 'Обнаружено 3 аномальные транзакции у ООО "Транспорт+"',
    priority: 'critical',
    action: 'investigate_immediately',
    timestamp: new Date(Date.now() - 1800000),
    workspace: 'legal-entities'
  },
  {
    id: '2',
    type: 'fleet_optimization',
    title: 'Неэффективное использование парка',
    message: 'ЗАО "Логистика" может сэкономить ₽87,000/мес при оптимизации маршрутов',
    priority: 'medium',
    action: 'schedule_consultation',
    timestamp: new Date(Date.now() - 3600000),
    workspace: 'legal-entities'
  },
  {
    id: '3',
    type: 'risk_assessment',
    title: 'Оценка рисков',
    message: 'Повышенный риск неплатежей у 2 корпоративных клиентов',
    priority: 'high',
    action: 'contact_client',
    timestamp: new Date(Date.now() - 5400000),
    workspace: 'legal-entities'
  }
];

export const mockIndividualRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Создать сегмент "Потерянные VIP"',
    description: 'Выделить неактивных VIP-клиентов в отдельный сегмент для таргетированных акций',
    impact: 'high',
    effort: 'low',
    category: 'Сегментация',
    workspace: 'individuals'
  },
  {
    id: '2',
    title: 'Запустить реактивационную кампанию',
    description: 'Персонализированные предложения для клиентов с риском оттока',
    impact: 'medium',
    effort: 'medium',
    category: 'Маркетинг',
    workspace: 'individuals'
  }
];

export const mockCorporateRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Внедрить систему мониторинга',
    description: 'Автоматический мониторинг подозрительных транзакций в реальном времени',
    impact: 'high',
    effort: 'high',
    category: 'Безопасность',
    workspace: 'legal-entities'
  },
  {
    id: '2',
    title: 'Консультации по оптимизации',
    description: 'Предложить услуги консультирования по оптимизации автопарка',
    impact: 'medium',
    effort: 'low',
    category: 'Сервис',
    workspace: 'legal-entities'
  }
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    type: 'user',
    content: 'Покажи статистику по клиентам с высоким риском оттока',
    timestamp: new Date(Date.now() - 1800000),
    workspace: 'individuals'
  },
  {
    id: '2',
    type: 'assistant',
    content: 'Найдено 23 клиента с высоким риском оттока. Основные факторы: снижение частоты заправок на 40%, отсутствие активности более 14 дней.',
    timestamp: new Date(Date.now() - 1790000),
    workspace: 'individuals'
  }
];
