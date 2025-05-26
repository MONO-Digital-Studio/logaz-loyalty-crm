
import { IndividualClientAnalysis, ChurnPrediction, LoyaltyInsight, AIPerformanceMetrics, IndividualsInsight, IndividualsPerformanceMetrics, IndividualsChatMessage, CustomerSegment, ProductRecommendation, CampaignOptimization } from '@/types/individuals-ai';

export const mockIndividualAnalyses: IndividualClientAnalysis[] = [
  {
    clientId: 'ind_001',
    customerName: 'Иванов Иван Иванович',
    phoneNumber: '+7 (999) 123-45-67',
    loyaltyLevel: 'gold',
    analysisperiod: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      totalMonths: 12
    },
    metrics: {
      activeMonths: 10,
      averageVisitsPerActiveMonth: 8.5,
      averageSpendPerActiveMonth: 2850,
      currentMonthActivity: {
        visits: 4,
        spending: 1200,
        pointsEarned: 60
      },
      deviationPercent: {
        visits: -35,
        spending: -42
      }
    },
    loyaltyMetrics: {
      pointsBalance: 1250,
      pointsEarnedPeriod: 720,
      pointsRedeemedPeriod: 300,
      pointsExpiringSoon: 180
    },
    recommendation: {
      level: 'at_risk',
      actions: [
        {
          type: 'personal_offer',
          message: 'Персональная скидка 10% на следующую заправку',
          channel: 'push',
          timing: 'immediate'
        },
        {
          type: 'point_reminder',
          message: 'У вас сгорают 180 баллов через 7 дней',
          channel: 'sms',
          timing: 'within_day'
        }
      ],
      priority: 'high'
    }
  },
  {
    clientId: 'ind_002',
    customerName: 'Петрова Мария Сергеевна',
    phoneNumber: '+7 (999) 234-56-78',
    loyaltyLevel: 'platinum',
    analysisperiod: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      totalMonths: 12
    },
    metrics: {
      activeMonths: 12,
      averageVisitsPerActiveMonth: 12.3,
      averageSpendPerActiveMonth: 4200,
      currentMonthActivity: {
        visits: 15,
        spending: 5100,
        pointsEarned: 255
      },
      deviationPercent: {
        visits: 22,
        spending: 21
      }
    },
    loyaltyMetrics: {
      pointsBalance: 3890,
      pointsEarnedPeriod: 2520,
      pointsRedeemedPeriod: 1200,
      pointsExpiringSoon: 0
    },
    recommendation: {
      level: 'engaged',
      actions: [
        {
          type: 'birthday_promo',
          message: 'Поздравляем с днем рождения! Бонус 500 баллов',
          channel: 'email',
          timing: 'immediate'
        }
      ],
      priority: 'low'
    }
  }
];

export const mockChurnPredictions: ChurnPrediction[] = [
  {
    clientId: 'ind_003',
    churnProbability: 75,
    riskFactors: [
      {
        factor: 'decreased_frequency',
        impact: 40,
        description: 'Снижение частоты заправок на 60% за последние 2 месяца'
      },
      {
        factor: 'no_point_redemption',
        impact: 25,
        description: 'Не использует накопленные баллы более 3 месяцев'
      },
      {
        factor: 'reduced_spending',
        impact: 10,
        description: 'Средний чек снизился на 30%'
      }
    ],
    timeToChurn: 14,
    preventionStrategy: {
      strategy: 'retention_offer',
      expectedEffectiveness: 65,
      cost: 500,
      roi: 2.3
    },
    interventionRecommendations: [
      {
        id: 'int_001',
        type: 'personal_offer',
        description: 'Персональное предложение с 15% скидкой',
        channel: 'sms',
        timing: 'immediate',
        expectedImpact: 45
      },
      {
        id: 'int_002',
        type: 'point_reminder',
        description: 'Напоминание о накопленных баллах с предложением потратить',
        channel: 'push',
        timing: 'within_day',
        expectedImpact: 20
      }
    ]
  }
];

export const mockLoyaltyInsights: LoyaltyInsight[] = [
  {
    id: 'insight_001',
    type: 'churn_risk',
    title: 'Критический риск оттока VIP-клиентов',
    description: '15 VIP-клиентов не заправлялись более 30 дней. Высокий риск потери ценных клиентов.',
    priority: 'critical',
    affectedClients: 15,
    suggestedActions: [
      'Создать персональные предложения',
      'Организовать телефонные звонки',
      'Предложить дополнительные бонусы'
    ],
    timestamp: new Date(),
    impact: {
      revenue: -245000,
      retention: -12,
      satisfaction: -8
    }
  },
  {
    id: 'insight_002',
    type: 'points_expiring',
    title: 'Массовое сгорание баллов',
    description: 'У 89 клиентов истекают баллы в ближайшие 7 дней на общую сумму 156,780 баллов.',
    priority: 'high',
    affectedClients: 89,
    suggestedActions: [
      'Отправить напоминания о сгорании',
      'Предложить варианты использования',
      'Создать срочную акцию'
    ],
    timestamp: new Date(),
    impact: {
      revenue: 78390,
      retention: 5,
      satisfaction: 3
    }
  },
  {
    id: 'insight_003',
    type: 'engagement_opportunity',
    title: 'Возможность повышения активности',
    description: '12 клиентов готовы к переходу на следующий уровень лояльности.',
    priority: 'medium',
    affectedClients: 12,
    suggestedActions: [
      'Персональные поздравления',
      'Информация о новых привилегиях',
      'Специальные предложения'
    ],
    timestamp: new Date(),
    impact: {
      revenue: 45000,
      retention: 8,
      satisfaction: 12
    }
  }
];

export const mockAIPerformance: AIPerformanceMetrics = {
  predictionAccuracy: {
    churnPrediction: 87.3,
    campaignPerformance: 82.1,
    personalizedOffers: 91.5
  },
  automationEfficiency: {
    triggersProcessed: 1247,
    responseTime: 0.3,
    falsePositives: 4.2
  },
  businessImpact: {
    retentionImprovement: 15.7,
    revenueIncrease: 23.4,
    operationalEfficiency: 67.8
  }
};

// Новые экспорты для IndividualsAIContext
export const mockIndividualsInsights: IndividualsInsight[] = [
  {
    id: 'ins_001',
    type: 'churn_risk',
    title: 'Высокий риск оттока клиентов',
    description: '247 клиентов с риском оттока выше 80%',
    priority: 'critical',
    timestamp: new Date(),
    actionRequired: true,
    suggestedActions: ['Запустить retention кампанию', 'Персональные предложения']
  },
  {
    id: 'ins_002',
    type: 'points_expiring',
    title: 'Истекают бонусные баллы',
    description: 'У 156 клиентов истекают баллы в течение недели',
    priority: 'high',
    timestamp: new Date(),
    actionRequired: true,
    suggestedActions: ['Отправить уведомления', 'Создать срочную акцию']
  }
];

export const mockIndividualsPerformance: IndividualsPerformanceMetrics = {
  businessImpact: {
    operationalEfficiency: 67.8,
    revenueIncrease: 23.4,
    retentionImprovement: 15.7
  },
  predictionAccuracy: {
    churnPrediction: 87.3,
    campaignPerformance: 82.1,
    personalizedOffers: 91.5
  },
  automationEfficiency: {
    triggersProcessed: 1247,
    responseTime: 0.3,
    falsePositives: 4.2
  }
};

export const mockIndividualsChatHistory: IndividualsChatMessage[] = [
  {
    id: 'msg_001',
    type: 'assistant',
    content: 'Привет! Я ваш ИИ-помощник для работы с клиентами. Могу помочь с анализом рисков оттока, сегментацией и рекомендациями.',
    timestamp: new Date(Date.now() - 60000)
  }
];

export const mockCustomerSegments: CustomerSegment[] = [
  {
    id: 'seg_001',
    name: 'VIP-клиенты',
    description: 'Высокоценные клиенты с platinum статусом',
    count: 1250,
    percentage: 3.2,
    averageSpend: 5200,
    averageVisits: 15.3,
    churnRate: 2.1
  },
  {
    id: 'seg_002',
    name: 'Активные покупатели',
    description: 'Регулярные клиенты с gold/silver статусом',
    count: 11100,
    percentage: 28.5,
    averageSpend: 2800,
    averageVisits: 8.7,
    churnRate: 8.5
  },
  {
    id: 'seg_003',
    name: 'Редкие покупатели',
    description: 'Клиенты с низкой активностью',
    count: 17650,
    percentage: 45.3,
    averageSpend: 1200,
    averageVisits: 2.1,
    churnRate: 25.3
  }
];

export const mockProductRecommendations: ProductRecommendation[] = [
  {
    id: 'rec_001',
    productName: 'Премиум 95',
    targetSegment: 'VIP-клиенты',
    confidence: 84.2,
    expectedUplift: 15.3,
    reasoning: 'Высокий доход сегмента позволяет продвигать премиум топливо'
  },
  {
    id: 'rec_002',
    productName: 'Автомойка',
    targetSegment: 'Активные покупатели',
    confidence: 76.8,
    expectedUplift: 8.1,
    reasoning: 'Частые визиты создают возможность для cross-sell услуг'
  }
];

export const mockCampaignOptimizations: CampaignOptimization[] = [
  {
    id: 'camp_001',
    campaignType: 'Retention',
    channel: 'sms',
    currentPerformance: 12.5,
    optimizedPerformance: 18.7,
    recommendation: 'Персонализировать сообщения по сегментам'
  },
  {
    id: 'camp_002',
    campaignType: 'Cross-sell',
    channel: 'push',
    currentPerformance: 6.2,
    optimizedPerformance: 9.8,
    recommendation: 'Оптимизировать время отправки уведомлений'
  }
];
