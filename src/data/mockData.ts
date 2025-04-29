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
];
