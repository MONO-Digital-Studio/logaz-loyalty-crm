
import { FleetEfficiency, CostOptimization } from '@/types/legal-entities-ai';

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
