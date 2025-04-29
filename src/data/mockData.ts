
export const navigationItems = [
  {
    id: "dashboard",
    title: "Дашборд",
    path: "/",
  },
  {
    id: "crm",
    title: "Клиенты",
    path: "/crm",
    children: [
      {
        id: "clients",
        title: "Клиенты",
        path: "/crm/clients",
      },
      {
        id: "audiences",
        title: "Аудитории",
        path: "/crm/audiences",
      },
    ],
  },
  {
    id: "products",
    title: "Товары",
    path: "/products",
  },
  {
    id: "content",
    title: "Контент",
    path: "/content",
  },
  {
    id: "campaigns",
    title: "Рассылки",
    path: "/campaigns",
  },
  {
    id: "contact_center",
    title: "Контакт-центр",
    path: "/contact-center",
    children: [
      {
        id: "dialogs",
        title: "Диалоги",
        path: "/contact-center/dialogs",
      },
      {
        id: "agents",
        title: "Агенты",
        path: "/contact-center/agents",
      },
      {
        id: "stats",
        title: "Статистика",
        path: "/contact-center/stats",
      },
      {
        id: "templates",
        title: "Шаблоны",
        path: "/contact-center/templates",
      },
      {
        id: "analytics",
        title: "Аналитика",
        path: "/contact-center/analytics",
      },
    ],
  },
  {
    id: "loyalty",
    title: "Лояльность",
    path: "/loyalty",
  },
  {
    id: "system",
    title: "Система",
    path: "/system",
    children: [
      {
        id: "general",
        title: "Основные",
        path: "/system/general",
      },
      {
        id: "backup",
        title: "Резервное копирование",
        path: "/system/backup",
      },
      {
        id: "logs",
        title: "Логи и мониторинг",
        path: "/system/logs",
      },
      {
        id: "maintenance",
        title: "Обслуживание",
        path: "/system/maintenance",
      }
    ]
  },
  {
    id: "settings",
    title: "Настройки",
    path: "/settings",
    children: [
      {
        id: "profile",
        title: "Профиль",
        path: "/settings/profile",
      }
    ],
  },
];

// Добавляем данные для StatsSummary.tsx
export const summaryStats = {
  totalClients: 3240,
  activeClients: 1856,
  totalRevenue: 14580000,
  averageCheck: 4280
};

// Добавляем данные для SalesChart.tsx
export const monthlySales = [
  { date: "2023-01-01", revenue: 950000 },
  { date: "2023-02-01", revenue: 1050000 },
  { date: "2023-03-01", revenue: 980000 },
  { date: "2023-04-01", revenue: 1150000 },
  { date: "2023-05-01", revenue: 1320000 },
  { date: "2023-06-01", revenue: 1450000 },
  { date: "2023-07-01", revenue: 1380000 },
  { date: "2023-08-01", revenue: 1420000 },
  { date: "2023-09-01", revenue: 1580000 },
  { date: "2023-10-01", revenue: 1680000 },
  { date: "2023-11-01", revenue: 1720000 },
  { date: "2023-12-01", revenue: 1900000 }
];

// Добавляем данные для LoyaltyPointsChart.tsx
export const loyaltyStats = [
  { period: "Янв", pointsEarned: 48500, pointsSpent: 32000, pointsExpired: 5200 },
  { period: "Фев", pointsEarned: 52000, pointsSpent: 38000, pointsExpired: 4800 },
  { period: "Мар", pointsEarned: 59000, pointsSpent: 41000, pointsExpired: 6500 },
  { period: "Апр", pointsEarned: 63500, pointsSpent: 46000, pointsExpired: 5300 },
  { period: "Май", pointsEarned: 68000, pointsSpent: 49000, pointsExpired: 6800 },
  { period: "Июн", pointsEarned: 71000, pointsSpent: 52000, pointsExpired: 7200 }
];

// Добавляем данные для CustomerDemographics.tsx
export const demographicData = [
  { age: "18-24", percentage: 15 },
  { age: "25-34", percentage: 32 },
  { age: "35-44", percentage: 28 },
  { age: "45-54", percentage: 18 },
  { age: "55+", percentage: 7 }
];

export const genderData = [
  { gender: "Мужской", percentage: 0.58 },
  { gender: "Женский", percentage: 0.42 }
];

// Добавляем данные для TopBar.tsx
export const notifications = [
  {
    id: 1,
    title: "Новый клиент",
    message: "Зарегистрирован новый клиент в системе",
    date: "2023-04-28T10:30:00",
    read: false
  },
  {
    id: 2,
    title: "Успешная транзакция",
    message: "Транзакция #12345 успешно завершена",
    date: "2023-04-27T15:45:00",
    read: true
  },
  {
    id: 3,
    title: "Обновление системы",
    message: "Запланировано техническое обслуживание на 30 апреля",
    date: "2023-04-25T08:15:00",
    read: false
  },
  {
    id: 4,
    title: "Предупреждение о запасах",
    message: "Низкий уровень запасов для товара 'Масло моторное ЛОГАЗ 5W-40'",
    date: "2023-04-24T14:20:00",
    read: true
  }
];

// Добавляем данные для ProductDetailsModal.tsx и ProductsPage.tsx
export const productCategories = [
  { id: 1, name: "Топливо", productCount: 5 },
  { id: 2, name: "Автомобильные масла", productCount: 8 },
  { id: 3, name: "Автохимия", productCount: 12 },
  { id: 4, name: "Аксессуары", productCount: 20 },
  { id: 5, name: "Запчасти", productCount: 34 },
  { id: 6, name: "Услуги", productCount: 6 }
];
