
import { CorporateActivityAnalysis } from '@/types/legal-entities-ai';

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
