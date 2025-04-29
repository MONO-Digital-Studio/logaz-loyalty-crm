
export const navigationItems = [
  {
    id: "dashboard",
    title: "Дашборд",
    path: "/",
  },
  {
    id: "crm",
    title: "CRM",
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
        title: "Операторы",
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
    title: "Программа лояльности",
    path: "/loyalty",
  },
  {
    id: "campaigns",
    title: "Рассылки",
    path: "/campaigns",
  },
  {
    id: "employees",
    title: "Сотрудники",
    path: "/employees",
    children: [
      {
        id: "list",
        title: "Сотрудники",
        path: "/employees/list",
      },
      {
        id: "structure",
        title: "Структура",
        path: "/employees/structure",
      },
    ],
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
      },
      {
        id: "access",
        title: "Доступ",
        path: "/settings/access",
        children: [
          {
            id: "users",
            title: "Пользователи",
            path: "/settings/access/users",
          },
          {
            id: "roles",
            title: "Роли",
            path: "/settings/access/roles",
          },
        ],
      },
    ],
  },
  {
    id: "system",
    title: "Система",
    path: "/system",
    children: [
      {
        id: "general",
        title: "Общие настройки",
        path: "/system/general",
      },
      {
        id: "backup",
        title: "Резервное копирование",
        path: "/system/backup",
      },
      {
        id: "logs",
        title: "Журналы",
        path: "/system/logs",
      },
      {
        id: "maintenance",
        title: "Обслуживание",
        path: "/system/maintenance",
      },
      {
        id: "integrations",
        title: "Интеграции",
        path: "/system/integrations",
      },
      {
        id: "locations",
        title: "Торговые точки",
        path: "/system/locations",
      },
    ],
  },
];

// Adding mock data for notifications
export const notifications = [
  {
    id: 1,
    title: "Новый клиент",
    message: "Зарегистрирован новый клиент Иванов А.А.",
    date: "2025-04-25T10:30:00",
    read: false
  },
  {
    id: 2,
    title: "Заказ выполнен",
    message: "Заказ №12345 успешно выполнен",
    date: "2025-04-24T15:20:00",
    read: false
  },
  {
    id: 3,
    title: "Обновление системы",
    message: "Запланировано обновление системы на 28.04.2025",
    date: "2025-04-22T09:15:00",
    read: true
  },
  {
    id: 4,
    title: "Сбой в работе",
    message: "Зафиксирован сбой в модуле отчетов",
    date: "2025-04-21T13:45:00",
    read: true
  }
];

// Adding mock data for product categories
export const productCategories = [
  { id: 1, name: "Топливо", productCount: 5 },
  { id: 2, name: "Автомобильные масла", productCount: 8 },
  { id: 3, name: "Автохимия", productCount: 12 },
  { id: 4, name: "Запчасти", productCount: 45 },
  { id: 5, name: "Аксессуары", productCount: 23 }
];

// Adding mock data for sales chart
export const monthlySales = [
  { date: "2025-04-01", revenue: 125000 },
  { date: "2025-04-02", revenue: 142000 },
  { date: "2025-04-03", revenue: 131000 },
  { date: "2025-04-04", revenue: 125000 },
  { date: "2025-04-05", revenue: 98000 },
  { date: "2025-04-06", revenue: 92000 },
  { date: "2025-04-07", revenue: 114000 },
  { date: "2025-04-08", revenue: 120000 },
  { date: "2025-04-09", revenue: 134000 },
  { date: "2025-04-10", revenue: 140000 },
  { date: "2025-04-11", revenue: 156000 },
  { date: "2025-04-12", revenue: 138000 },
  { date: "2025-04-13", revenue: 110000 },
  { date: "2025-04-14", revenue: 125000 },
];

// Adding mock data for loyalty points chart
export const loyaltyStats = [
  { period: "Янв", pointsEarned: 25000, pointsSpent: 18000, pointsExpired: 3000 },
  { period: "Фев", pointsEarned: 28000, pointsSpent: 22000, pointsExpired: 2500 },
  { period: "Мар", pointsEarned: 32000, pointsSpent: 25000, pointsExpired: 3200 },
  { period: "Апр", pointsEarned: 35000, pointsSpent: 28000, pointsExpired: 2800 },
  { period: "Май", pointsEarned: 38000, pointsSpent: 30000, pointsExpired: 3500 },
  { period: "Июн", pointsEarned: 42000, pointsSpent: 32000, pointsExpired: 4000 },
];

// Adding mock data for demographics chart
export const demographicData = [
  { age: "18-24", percentage: 15 },
  { age: "25-34", percentage: 28 },
  { age: "35-44", percentage: 25 },
  { age: "45-54", percentage: 18 },
  { age: "55-64", percentage: 10 },
  { age: "65+", percentage: 4 },
];

export const genderData = [
  { gender: "Мужчины", percentage: 0.62 },
  { gender: "Женщины", percentage: 0.38 },
];

// Adding mock data for summary statistics
export const summaryStats = {
  totalClients: 2845,
  activeClients: 1256,
  totalRevenue: 12450000,
  averageCheck: 1850,
};
