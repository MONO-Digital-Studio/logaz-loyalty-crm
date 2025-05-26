
import { CorporateInsight } from '@/types/legal-entities-ai';

export const mockCorporateInsights: CorporateInsight[] = [
  {
    id: 'insight-001',
    type: 'fraud_detection',
    title: 'Подозрительная активность карт',
    description: 'Обнаружено 3 подозрительные транзакции за последние 24 часа',
    priority: 'high',
    affectedCompanies: ['ООО "Логистик"', 'ИП Петров'],
    suggestedActions: [
      'Связаться с компаниями для подтверждения',
      'Временно заблокировать карты',
      'Провести детальный анализ'
    ],
    timestamp: new Date('2024-11-25T10:30:00'),
    impact: {
      revenue: -45000,
      risk: 75,
      efficiency: -10
    }
  },
  {
    id: 'insight-002',
    type: 'cost_optimization',
    title: 'Возможности оптимизации затрат',
    description: '5 компаний могут сэкономить до 127,500₽ при оптимизации маршрутов',
    priority: 'medium',
    affectedCompanies: ['ООО "Логистик"', 'АО "Север"', 'ООО "СтройТранс"'],
    suggestedActions: [
      'Предложить консультацию по оптимизации',
      'Внедрить систему мониторинга маршрутов',
      'Создать персональные рекомендации'
    ],
    timestamp: new Date('2024-11-25T09:15:00'),
    impact: {
      revenue: 127500,
      risk: -15,
      efficiency: 20
    }
  },
  {
    id: 'insight-003',
    type: 'fleet_efficiency',
    title: 'Неэффективное использование автопарка',
    description: '2 компании используют менее 70% своих топливных карт',
    priority: 'medium',
    affectedCompanies: ['ООО "МегаЛогистик"', 'АО "ТрансСервис"'],
    suggestedActions: [
      'Пересмотреть количество выданных карт',
      'Предложить более гибкие тарифы',
      'Оптимизировать лимиты карт'
    ],
    timestamp: new Date('2024-11-25T08:45:00'),
    impact: {
      revenue: 25000,
      risk: 5,
      efficiency: 15
    }
  },
  {
    id: 'insight-004',
    type: 'payment_risk',
    title: 'Риск просрочки платежей',
    description: '3 компании могут не выполнить обязательства по оплате в срок',
    priority: 'critical',
    affectedCompanies: ['ООО "БыстроГруз"', 'ИП Сидоров', 'ООО "ЭкспрессДоставка"'],
    suggestedActions: [
      'Срочно связаться с клиентами',
      'Пересмотреть кредитные лимиты',
      'Активировать процедуры взыскания'
    ],
    timestamp: new Date('2024-11-25T07:20:00'),
    impact: {
      revenue: -89000,
      risk: 85,
      efficiency: -5
    }
  }
];
