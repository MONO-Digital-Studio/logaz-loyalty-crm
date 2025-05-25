
import { 
  CorporateActivityAnalysis, 
  SuspiciousTransaction, 
  CorporateInsight, 
  CorporateAIPerformanceMetrics,
  CorporateChatMessage,
  FleetEfficiency,
  CostOptimization
} from '@/types/legal-entities-ai';

export const mockCorporateAnalysis: CorporateActivityAnalysis[] = [
  {
    companyId: '1',
    companyName: 'ООО "Транспортная компания Логистик"',
    inn: '7707123456',
    contractDetails: {
      contractNumber: 'ДГ-2024-001',
      startDate: new Date('2024-01-15'),
      creditLimit: 500000,
      paymentTerms: 30
    },
    analysisperiod: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-11-30'),
      totalMonths: 11
    },
    fleetMetrics: {
      totalCards: 25,
      activeCards: 23,
      suspendedCards: 2,
      averageCardsUsedPerMonth: 21,
      cardUtilizationRate: 84
    },
    consumptionMetrics: {
      activeMonths: 10,
      averageVolumePerActiveMonth: 12500,
      averageTransactionsPerActiveMonth: 145,
      currentMonthMetrics: {
        volume: 8900,
        transactions: 98,
        spending: 445000,
        uniqueDrivers: 18
      },
      deviationPercent: {
        volume: -28.8,
        transactions: -32.4,
        spending: -30.1
      }
    },
    businessHealthIndicators: {
      paymentHealthScore: 85,
      seasonalStability: 72,
      growthTrend: 'declining',
      riskLevel: 'medium'
    },
    recommendation: {
      level: 'concerning',
      actions: [
        {
          type: 'account_review',
          message: 'Снижение активности на 30%. Рекомендуется срочный анализ причин.',
          channel: 'phone',
          timing: 'immediate',
          expectedImpact: {
            revenueProtection: 150000,
            relationshipScore: 15,
            churnReduction: 25
          }
        }
      ],
      priority: 'high',
      estimatedRevenueLoss: 180000
    }
  },
  {
    companyId: '2',
    companyName: 'АО "Грузовые перевозки Север"',
    inn: '7807234567',
    contractDetails: {
      contractNumber: 'ДГ-2024-002',
      startDate: new Date('2024-02-20'),
      creditLimit: 300000,
      paymentTerms: 21
    },
    analysisperiod: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-11-30'),
      totalMonths: 10
    },
    fleetMetrics: {
      totalCards: 15,
      activeCards: 15,
      suspendedCards: 0,
      averageCardsUsedPerMonth: 14,
      cardUtilizationRate: 93
    },
    consumptionMetrics: {
      activeMonths: 10,
      averageVolumePerActiveMonth: 8200,
      averageTransactionsPerActiveMonth: 89,
      currentMonthMetrics: {
        volume: 9150,
        transactions: 102,
        spending: 457500,
        uniqueDrivers: 14
      },
      deviationPercent: {
        volume: 11.6,
        transactions: 14.6,
        spending: 12.8
      }
    },
    businessHealthIndicators: {
      paymentHealthScore: 95,
      seasonalStability: 88,
      growthTrend: 'growing',
      riskLevel: 'low'
    },
    recommendation: {
      level: 'thriving',
      actions: [
        {
          type: 'upsell_opportunity',
          message: 'Клиент показывает стабильный рост. Возможность расширения автопарка.',
          channel: 'email',
          timing: 'within_week',
          expectedImpact: {
            revenueProtection: 0,
            relationshipScore: 10,
            churnReduction: 5
          }
        }
      ],
      priority: 'medium',
      estimatedRevenueLoss: 0
    }
  }
];

export const mockSuspiciousTransactions: SuspiciousTransaction[] = [
  {
    transactionId: 'TXN-2024-001',
    cardNumber: '****0123',
    companyName: 'ООО "Транспортная компания Логистик"',
    timestamp: new Date('2024-11-25T03:45:00'),
    location: 'АЗС Москва, ул. Неизвестная',
    amount: 15000,
    volume: 300,
    suspicionReasons: [
      {
        type: 'unusual_time',
        confidence: 85,
        description: 'Заправка в нетипичное время (03:45)'
      },
      {
        type: 'excessive_volume',
        confidence: 78,
        description: 'Объем превышает обычный в 2.5 раза'
      }
    ],
    riskScore: 82,
    recommendedAction: 'investigate'
  },
  {
    transactionId: 'TXN-2024-002',
    cardNumber: '****0456',
    companyName: 'АО "Грузовые перевозки Север"',
    timestamp: new Date('2024-11-24T14:30:00'),
    location: 'АЗС Калуга, Промзона',
    amount: 8500,
    volume: 170,
    suspicionReasons: [
      {
        type: 'unusual_location',
        confidence: 72,
        description: 'Заправка за пределами обычного региона работы'
      }
    ],
    riskScore: 65,
    recommendedAction: 'monitor'
  }
];

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

export const mockCorporateAIMetrics: CorporateAIPerformanceMetrics = {
  fraudDetectionAccuracy: 94.5,
  falsePositiveRate: 3.2,
  automatedProcesses: 78,
  timeToResolution: 4.2,
  complianceScore: 96,
  retentionImprovement: 18.5,
  revenueIncrease: 12.3,
  operationalEfficiency: 85.7,
  criticalAlerts: 4,
  totalInsights: 23,
  efficiency: 88,
  lastUpdate: new Date()
};

export const mockCorporateChatHistory: CorporateChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Добро пожаловать в корпоративный ИИ-ассистент ЛОГАЗ SV! Я помогу вам анализировать деятельность юридических лиц, выявлять риски и оптимизировать процессы. Чем могу помочь?',
    timestamp: new Date('2024-11-25T10:00:00')
  }
];

export const mockFleetEfficiency: FleetEfficiency[] = [
  {
    companyId: '1',
    companyName: 'ООО "Транспортная компания Логистик"',
    totalVehicles: 25,
    averageEfficiency: 8.2,
    potentialSavings: 45000,
    riskLevel: 'medium',
    recommendations: [
      'Обучение водителей экономичному вождению',
      'Оптимизация маршрутов движения',
      'Техническое обслуживание автопарка'
    ]
  },
  {
    companyId: '2',
    companyName: 'АО "Грузовые перевозки Север"',
    totalVehicles: 15,
    averageEfficiency: 7.8,
    potentialSavings: 28000,
    riskLevel: 'low',
    recommendations: [
      'Внедрение системы мониторинга топлива',
      'Планирование оптимальных маршрутов'
    ]
  }
];

export const mockCostOptimization: CostOptimization[] = [
  {
    companyId: '1',
    companyName: 'ООО "Транспортная компания Логистик"',
    currentMonthlyCost: 445000,
    potentialSavings: 67000,
    optimizationOpportunities: [
      'Переход на более эффективные виды топлива',
      'Оптимизация времени заправок',
      'Использование корпоративных скидок'
    ],
    implementationComplexity: 'medium',
    paybackPeriod: 3
  },
  {
    companyId: '2',
    companyName: 'АО "Грузовые перевозки Север"',
    currentMonthlyCost: 298000,
    potentialSavings: 35000,
    optimizationOpportunities: [
      'Группировка заправок для получения скидок',
      'Планирование заправок на станциях с лучшими ценами'
    ],
    implementationComplexity: 'low',
    paybackPeriod: 2
  }
];
