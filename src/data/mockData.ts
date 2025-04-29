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
