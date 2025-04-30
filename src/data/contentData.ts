
// Sample data for news, pages and promotions

// Sample data for news
export const newsItems = [
  {
    id: 1,
    title: "Новые функции ЛОГАЗ SV",
    category: "Новости",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-25",
    views: 123,
  },
  {
    id: 2,
    title: "Обновление системы лояльности",
    category: "Новости",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-04-15",
    views: 89,
  },
  {
    id: 4,
    title: "Запуск новой версии платформы",
    category: "Новости",
    status: "Запланировано",
    author: "Александр Домрачев",
    date: "2025-05-01",
    views: 0,
  }
];

// Sample data for text pages
export const pageItems = [
  {
    id: 3,
    title: "О компании",
    category: "Информация",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-03-10",
    views: 342,
  },
  {
    id: 5,
    title: "Контактная информация",
    category: "Контакты",
    status: "Опубликовано",
    author: "Александр Домрачев",
    date: "2025-03-15",
    views: 271,
  },
  {
    id: 6,
    title: "Условия использования",
    category: "Правовая информация",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  },
  {
    id: 7,
    title: "Руководство по интеграции с CRM",
    category: "Руководства",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 45,
  }
];

// Sample data for promotions
export const promotionItems = [
  {
    id: 8,
    title: "Скидка 20% на все услуги",
    category: "Акции",
    status: "Активно",
    author: "Александр Домрачев",
    date: "2025-04-20",
    views: 245,
  },
  {
    id: 9,
    title: "Летняя распродажа",
    category: "Акции",
    status: "Запланировано",
    author: "Александр Домрачев",
    date: "2025-05-15",
    views: 0,
  },
  {
    id: 10,
    title: "Черная пятница",
    category: "Акции",
    status: "Черновик",
    author: "Александр Домрачев",
    date: "2025-11-20",
    views: 0,
  }
];

// Content item type
export interface ContentItem {
  id: number;
  title: string;
  category: string;
  status: string;
  author: string;
  date: string;
  views: number;
}

// Helper function to get content type name
export const getContentTypeName = (contentType: "news" | "pages" | "promotions"): string => {
  switch (contentType) {
    case "news":
      return "новостей";
    case "pages":
      return "страниц";
    case "promotions":
      return "акций";
    default:
      return "";
  }
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  switch(status) {
    case "Опубликовано":
    case "Активно":
      return "bg-green-100 text-green-800";
    case "Черновик":
      return "bg-gray-100 text-gray-800";
    case "Запланировано":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

