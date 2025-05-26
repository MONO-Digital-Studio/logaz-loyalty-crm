
import { SuspiciousTransaction } from '@/types/legal-entities-ai';

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
