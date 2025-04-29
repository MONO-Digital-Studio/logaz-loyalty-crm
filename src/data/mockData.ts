export const notifications = [
  {
    id: "1",
    title: "Новое обновление системы",
    message: "Доступна новая версия системы управления. Пожалуйста, обновитесь до последней версии для улучшения производительности и безопасности.",
    date: "2023-07-15T10:30:00",
    read: false
  },
  {
    id: "2",
    title: "Акция на топливо",
    message: "Специальное предложение! Получите скидку 10% на все виды топлива в эти выходные.",
    date: "2023-07-14T16:45:00",
    read: false
  },
  {
    id: "3",
    title: "Техническое обслуживание",
    message: "Запланировано техническое обслуживание серверов. Возможны кратковременные перебои в работе системы 16 июля с 02:00 до 05:00.",
    date: "2023-07-13T09:00:00",
    read: true
  },
  {
    id: "4",
    title: "Новый клиент зарегистрирован",
    message: "Зарегистрирован новый клиент: ООО 'Ромашка'.",
    date: "2023-07-12T14:20:00",
    read: true
  },
  {
    id: "5",
    title: "Предупреждение о безопасности",
    message: "Обнаружена подозрительная активность в вашем аккаунте. Пожалуйста, смените пароль.",
    date: "2023-07-11T18:00:00",
    read: true
  }
];

// Export navigation items for the sidebar
export const navigationItems = [
  {
    id: "analytics",
    title: "Аналитика",
    path: "/",
    icon: "📊" // В будущем заменить на иконки из lucide-react
  },
  {
    id: "loyalty",
    title: "Программа лояльности",
    path: "/loyalty",
    icon: "🎯",
    children: [
      {
        id: "loyalty-mechanics",
        title: "Механики",
        path: "/loyalty?tab=mechanics",
      },
      {
        id: "loyalty-index",
        title: "Индекс лояльности",
        path: "/loyalty?tab=loyalty-index",
      },
      {
        id: "referral",
        title: "Реферальная программа",
        path: "/loyalty?tab=referral",
      }
    ]
  },
  {
    id: "content",
    title: "Контент",
    path: "/content",
    icon: "📄",
    children: [
      {
        id: "news",
        title: "Новости",
        path: "/content/news",
      },
      {
        id: "text-pages",
        title: "Текстовые страницы",
        path: "/content/pages",
      }
    ]
  },
  {
    id: "crm",
    title: "CRM",
    path: "/crm",
    icon: "👥",
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
      }
    ]
  },
  {
    id: "contact-center",
    title: "Контакт-центр",
    path: "/contact-center",
    icon: "💬",
    children: [
      {
        id: "dialogs",
        title: "Список диалогов",
        path: "/contact-center/dialogs",
      },
      {
        id: "templates",
        title: "Шаблоны ответов",
        path: "/contact-center/templates",
      },
      {
        id: "contact-analytics",
        title: "Аналитика",
        path: "/contact-center/analytics",
      }
    ]
  },
  {
    id: "products",
    title: "Товары и категории",
    path: "/products",
    icon: "🛍️",
    children: [
      {
        id: "products-list",
        title: "Товары",
        path: "/products/list",
      },
      {
        id: "categories",
        title: "Категории",
        path: "/products/categories",
      }
    ]
  },
  {
    id: "settings",
    title: "Настройки",
    path: "/settings",
    icon: "⚙️",
    children: [
      {
        id: "setup-wizard",
        title: "Мастер настройки",
        path: "/settings/wizard",
      },
      {
        id: "locations",
        title: "Торговые точки",
        path: "/settings/locations",
      },
      {
        id: "employees",
        title: "Сотрудники",
        path: "/settings/employees",
      },
      {
        id: "access",
        title: "Права доступа",
        path: "/settings/access",
      },
      {
        id: "integrations",
        title: "Интеграции",
        path: "/settings/integrations",
      },
      {
        id: "system",
        title: "Системные настройки",
        path: "/settings/system",
      }
    ]
  }
];

// Данные для панели управления
export const summaryStats = {
  totalClients: 4832,
  activeClients: 2735,
  totalRevenue: 14623500,
  averageCheck: 1850,
};

export const monthlySales = [
  { date: "2023-01-15", revenue: 1265000, transactions: 687 },
  { date: "2023-02-15", revenue: 1345000, transactions: 723 },
  { date: "2023-03-15", revenue: 1187000, transactions: 645 },
  { date: "2023-04-15", revenue: 1420000, transactions: 768 },
  { date: "2023-05-15", revenue: 1580000, transactions: 834 },
  { date: "2023-06-15", revenue: 1690000, transactions: 904 },
];

export const loyaltyStats = [
  { period: "Янв", pointsEarned: 245000, pointsSpent: 182000, pointsExpired: 12500 },
  { period: "Фев", pointsEarned: 267000, pointsSpent: 198000, pointsExpired: 15800 },
  { period: "Мар", pointsEarned: 234000, pointsSpent: 187000, pointsExpired: 10200 },
  { period: "Апр", pointsEarned: 278000, pointsSpent: 213000, pointsExpired: 14300 },
  { period: "Май", pointsEarned: 312000, pointsSpent: 245000, pointsExpired: 18500 },
  { period: "Июн", pointsEarned: 345000, pointsSpent: 275000, pointsExpired: 21200 },
];

export const demographicData = [
  { age: "18-24", percentage: 8 },
  { age: "25-34", percentage: 27 },
  { age: "35-44", percentage: 33 },
  { age: "45-54", percentage: 20 },
  { age: "55+", percentage: 12 },
];

export const genderData = [
  { gender: "Мужчины", percentage: 0.67 },
  { gender: "Женщины", percentage: 0.33 },
];

// Теперь добавим новые страницы для расширения функциональности

// Данные для страницы настроек
export const settingsCategories = [
  { id: "general", name: "Общие настройки", icon: "⚙️" },
  { id: "appearance", name: "Внешний вид", icon: "🎨" },
  { id: "notifications", name: "Уведомления", icon: "🔔" },
  { id: "security", name: "Безопасность", icon: "🔒" },
  { id: "api", name: "API и интеграции", icon: "🔌" },
];

// Данные для страницы аналитики по топливу
export const fuelSalesData = [
  { date: "2023-01", diesel: 342500, gasoline92: 256800, gasoline95: 189700, propane: 98500 },
  { date: "2023-02", diesel: 356700, gasoline92: 245600, gasoline95: 192300, propane: 104200 },
  { date: "2023-03", diesel: 378900, gasoline92: 267800, gasoline95: 203500, propane: 112800 },
  { date: "2023-04", diesel: 402300, gasoline92: 289400, gasoline95: 215700, propane: 118500 },
  { date: "2023-05", diesel: 423500, gasoline92: 312600, gasoline95: 228900, propane: 124300 },
  { date: "2023-06", diesel: 445700, gasoline92: 335800, gasoline95: 243200, propane: 135700 },
];

// Данные для страницы товаров
export const productCategories = [
  { id: 1, name: "Топливо", productCount: 5 },
  { id: 2, name: "Автомобильные масла", productCount: 28 },
  { id: 3, name: "Автохимия", productCount: 42 },
  { id: 4, name: "Автоаксессуары", productCount: 56 },
  { id: 5, name: "Продукты питания", productCount: 63 },
  { id: 6, name: "Напитки", productCount: 37 },
];
