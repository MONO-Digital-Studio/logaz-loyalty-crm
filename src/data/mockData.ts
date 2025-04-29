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
