
import { Client, SalesData, LoyaltyStats, LocationPerformance, DemographicData, GenderData, MenuItem, UserNotification } from '../types';

// Меню навигации
export const navigationItems: MenuItem[] = [
  {
    id: 'analytics',
    title: 'Аналитика',
    icon: 'activity',
    path: '/',
  },
  {
    id: 'loyalty',
    title: 'Программа лояльности',
    icon: 'star',
    path: '/loyalty',
    children: [
      {
        id: 'mechanics',
        title: 'Механики',
        icon: 'settings',
        path: '/loyalty/mechanics',
      },
      {
        id: 'loyalty-index',
        title: 'Индекс лояльности',
        icon: 'bar-chart',
        path: '/loyalty/index',
      },
      {
        id: 'referral',
        title: 'Реферальная программа',
        icon: 'users',
        path: '/loyalty/referral',
      }
    ]
  },
  {
    id: 'content',
    title: 'Контент',
    icon: 'file-text',
    path: '/content',
    children: [
      {
        id: 'news',
        title: 'Новости',
        icon: 'newspaper',
        path: '/content/news',
      },
      {
        id: 'text-pages',
        title: 'Текстовые страницы',
        icon: 'file',
        path: '/content/pages',
      }
    ]
  },
  {
    id: 'crm',
    title: 'CRM',
    icon: 'users',
    path: '/crm',
    children: [
      {
        id: 'clients',
        title: 'Клиенты',
        icon: 'user',
        path: '/crm/clients',
      },
      {
        id: 'audiences',
        title: 'Аудитории',
        icon: 'users',
        path: '/crm/audiences',
      }
    ]
  },
  {
    id: 'contact-center',
    title: 'Контакт-центр',
    icon: 'message-circle',
    path: '/contact-center',
  },
  {
    id: 'products',
    title: 'Товары и категории',
    icon: 'shopping-bag',
    path: '/products',
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: 'settings',
    path: '/settings',
  },
  {
    id: 'tools',
    title: 'Инструменты',
    icon: 'tool',
    path: '/tools',
  },
  {
    id: 'help',
    title: 'Справка',
    icon: 'help-circle',
    path: '/help',
  },
  {
    id: 'support',
    title: 'Поддержка',
    icon: 'life-buoy',
    path: '/support',
  }
];

// Клиенты
export const clients: Client[] = [
  {
    id: '1',
    name: 'Иванов Иван',
    phone: '+7 (999) 123-45-67',
    email: 'ivanov@example.com',
    registrationDate: '2023-01-15',
    lastPurchaseDate: '2023-04-20',
    totalPurchases: 12,
    loyaltyPoints: 450,
    segment: 'VIP',
    status: 'active'
  },
  {
    id: '2',
    name: 'Петрова Анна',
    phone: '+7 (999) 234-56-78',
    email: 'petrova@example.com',
    registrationDate: '2023-02-10',
    lastPurchaseDate: '2023-04-15',
    totalPurchases: 8,
    loyaltyPoints: 320,
    segment: 'Активный',
    status: 'active'
  },
  {
    id: '3',
    name: 'Сидоров Алексей',
    phone: '+7 (999) 345-67-89',
    email: 'sidorov@example.com',
    registrationDate: '2023-03-05',
    lastPurchaseDate: '2023-04-10',
    totalPurchases: 4,
    loyaltyPoints: 150,
    segment: 'Новый',
    status: 'new'
  },
  {
    id: '4',
    name: 'Кузнецова Елена',
    phone: '+7 (999) 456-78-90',
    email: 'kuznetsova@example.com',
    registrationDate: '2023-01-20',
    lastPurchaseDate: '2023-03-05',
    totalPurchases: 6,
    loyaltyPoints: 280,
    segment: 'Активный',
    status: 'inactive'
  },
  {
    id: '5',
    name: 'Смирнов Дмитрий',
    phone: '+7 (999) 567-89-01',
    email: 'smirnov@example.com',
    registrationDate: '2023-02-25',
    lastPurchaseDate: '2023-04-18',
    totalPurchases: 10,
    loyaltyPoints: 400,
    segment: 'VIP',
    status: 'active'
  },
  {
    id: '6',
    name: 'Козлова Мария',
    phone: '+7 (999) 678-90-12',
    email: 'kozlova@example.com',
    registrationDate: '2023-03-15',
    lastPurchaseDate: '2023-04-19',
    totalPurchases: 3,
    loyaltyPoints: 120,
    segment: 'Новый',
    status: 'active'
  },
  {
    id: '7',
    name: 'Новиков Артем',
    phone: '+7 (999) 789-01-23',
    email: 'novikov@example.com',
    registrationDate: '2023-01-10',
    lastPurchaseDate: '2023-03-20',
    totalPurchases: 7,
    loyaltyPoints: 290,
    segment: 'Активный',
    status: 'inactive'
  },
  {
    id: '8',
    name: 'Морозова Ольга',
    phone: '+7 (999) 890-12-34',
    email: 'morozova@example.com',
    registrationDate: '2023-02-15',
    lastPurchaseDate: '2023-04-17',
    totalPurchases: 9,
    loyaltyPoints: 360,
    segment: 'VIP',
    status: 'active'
  }
];

// Данные по продажам за месяц
export const monthlySales: SalesData[] = [
  { date: '2023-04-01', revenue: 125000, transactions: 42 },
  { date: '2023-04-02', revenue: 98000, transactions: 35 },
  { date: '2023-04-03', revenue: 115000, transactions: 39 },
  { date: '2023-04-04', revenue: 132000, transactions: 44 },
  { date: '2023-04-05', revenue: 141000, transactions: 47 },
  { date: '2023-04-06', revenue: 128000, transactions: 43 },
  { date: '2023-04-07', revenue: 118000, transactions: 40 },
  { date: '2023-04-08', revenue: 132000, transactions: 44 },
  { date: '2023-04-09', revenue: 145000, transactions: 48 },
  { date: '2023-04-10', revenue: 139000, transactions: 46 },
  { date: '2023-04-11', revenue: 126000, transactions: 42 },
  { date: '2023-04-12', revenue: 134000, transactions: 45 },
  { date: '2023-04-13', revenue: 142000, transactions: 47 },
  { date: '2023-04-14', revenue: 136000, transactions: 45 },
  { date: '2023-04-15', revenue: 148000, transactions: 49 },
  { date: '2023-04-16', revenue: 152000, transactions: 51 },
  { date: '2023-04-17', revenue: 147000, transactions: 49 },
  { date: '2023-04-18', revenue: 135000, transactions: 45 },
  { date: '2023-04-19', revenue: 143000, transactions: 48 },
  { date: '2023-04-20', revenue: 156000, transactions: 52 }
];

// Статистика баллов лояльности
export const loyaltyStats: LoyaltyStats[] = [
  { period: 'Янв', pointsEarned: 12500, pointsSpent: 8700, pointsExpired: 1200 },
  { period: 'Фев', pointsEarned: 14800, pointsSpent: 9200, pointsExpired: 1100 },
  { period: 'Мар', pointsEarned: 16200, pointsSpent: 10800, pointsExpired: 1300 },
  { period: 'Апр', pointsEarned: 18500, pointsSpent: 11500, pointsExpired: 1500 }
];

// Эффективность торговых точек
export const locationPerformance: LocationPerformance[] = [
  {
    id: '1',
    name: 'ЛОГАЗ Центральный',
    sales: 1250000,
    transactions: 420,
    averageCheck: 2976,
    loyaltyUsage: 68
  },
  {
    id: '2',
    name: 'ЛОГАЗ Северный',
    sales: 980000,
    transactions: 350,
    averageCheck: 2800,
    loyaltyUsage: 62
  },
  {
    id: '3',
    name: 'ЛОГАЗ Восточный',
    sales: 1150000,
    transactions: 390,
    averageCheck: 2949,
    loyaltyUsage: 65
  },
  {
    id: '4',
    name: 'ЛОГАЗ Южный',
    sales: 1320000,
    transactions: 440,
    averageCheck: 3000,
    loyaltyUsage: 70
  }
];

// Демографические данные
export const demographicData: DemographicData[] = [
  { age: '18-24', percentage: 15 },
  { age: '25-34', percentage: 32 },
  { age: '35-44', percentage: 28 },
  { age: '45-54', percentage: 18 },
  { age: '55+', percentage: 7 }
];

// Данные по полу
export const genderData: GenderData[] = [
  { gender: 'Мужчины', percentage: 72 },
  { gender: 'Женщины', percentage: 28 }
];

// Уведомления пользователя
export const notifications: UserNotification[] = [
  {
    id: '1',
    title: 'Новый клиент',
    message: 'Зарегистрирован новый клиент: Иванов Иван',
    date: '2023-04-20T10:30:00',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Выполнен план продаж',
    message: 'Торговая точка ЛОГАЗ Центральный выполнила месячный план продаж на 100%',
    date: '2023-04-19T16:45:00',
    read: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Остаток баллов',
    message: 'У 24 клиентов истекает срок действия баллов через 7 дней',
    date: '2023-04-18T09:15:00',
    read: false,
    type: 'warning'
  }
];

// Сводные данные
export const summaryStats = {
  totalClients: 1245,
  activeClients: 956,
  totalRevenue: 4125000,
  averageCheck: 2950,
  loyaltyPointsIssued: 185000,
  loyaltyPointsUsed: 124000
};
