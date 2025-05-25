
import { WorkspaceType } from '@/types/legal-entities';

interface NavigationItem {
  id: string;
  title: string;
  path?: string;
  children?: NavigationItem[];
}

// Навигация для физических лиц (существующая)
export const individualsNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Аналитика',
    path: '/',
  },
  {
    id: 'loyalty',
    title: 'Программа лояльности',
    path: '/loyalty',
  },
  {
    id: 'content',
    title: 'Контент',
    path: '/content',
  },
  {
    id: 'crm',
    title: 'CRM',
    children: [
      {
        id: 'clients',
        title: 'Клиенты',
        path: '/crm/clients',
      },
      {
        id: 'audiences',
        title: 'Аудитории',
        path: '/crm/audiences',
      },
    ],
  },
  {
    id: 'contact_center',
    title: 'Контакт-центр',
    children: [
      {
        id: 'dialogs',
        title: 'Диалоги',
        path: '/contact-center/dialogs',
      },
      {
        id: 'agents',
        title: 'Агенты',
        path: '/contact-center/agents',
      },
      {
        id: 'campaigns',
        title: 'Рассылки',
        path: '/contact-center/campaigns',
      },
      {
        id: 'stats',
        title: 'Статистика',
        path: '/contact-center/stats',
      },
      {
        id: 'templates',
        title: 'Шаблоны',
        path: '/contact-center/templates',
      },
      {
        id: 'analytics',
        title: 'Аналитика',
        path: '/contact-center/analytics',
      },
    ],
  },
  {
    id: 'products',
    title: 'Товары и категории',
    path: '/products',
  },
  {
    id: 'employees',
    title: 'Сотрудники',
    children: [
      {
        id: 'list',
        title: 'Список сотрудников',
        path: '/employees/list',
      },
      {
        id: 'structure',
        title: 'Организационная структура',
        path: '/employees/structure',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Настройки',
    path: '/settings',
  },
  {
    id: 'system',
    title: 'Система',
    path: '/system',
  },
];

// Навигация для юридических лиц
export const legalEntitiesNavigation: NavigationItem[] = [
  {
    id: 'le-dashboard',
    title: 'Аналитика',
    path: '/legal-entities',
  },
  {
    id: 'le-clients',
    title: 'Клиенты ЮЛ',
    children: [
      {
        id: 'le-clients-list',
        title: 'Список клиентов',
        path: '/legal-entities/clients',
      },
      {
        id: 'le-clients-create',
        title: 'Создать клиента',
        path: '/legal-entities/clients/create',
      },
    ],
  },
  {
    id: 'le-fuel-cards',
    title: 'Топливные карты',
    children: [
      {
        id: 'le-cards-list',
        title: 'Все карты',
        path: '/legal-entities/fuel-cards',
      },
      {
        id: 'le-cards-create',
        title: 'Создать карту',
        path: '/legal-entities/fuel-cards/create',
      },
      {
        id: 'le-cards-blocked',
        title: 'Заблокированные',
        path: '/legal-entities/fuel-cards/blocked',
      },
    ],
  },
  {
    id: 'le-transactions',
    title: 'Транзакции',
    path: '/legal-entities/transactions',
  },
  {
    id: 'le-payments',
    title: 'Платежи и счета',
    children: [
      {
        id: 'le-payments-invoices',
        title: 'Счета',
        path: '/legal-entities/payments/invoices',
      },
      {
        id: 'le-payments-history',
        title: 'История платежей',
        path: '/legal-entities/payments/history',
      },
    ],
  },
  {
    id: 'le-communications',
    title: 'Коммуникации',
    children: [
      {
        id: 'le-comm-email',
        title: 'Email рассылки',
        path: '/legal-entities/communications/email',
      },
      {
        id: 'le-comm-telegram',
        title: 'Telegram',
        path: '/legal-entities/communications/telegram',
      },
      {
        id: 'le-comm-sms',
        title: 'SMS',
        path: '/legal-entities/communications/sms',
      },
    ],
  },
  {
    id: 'le-contact-center',
    title: 'Контакт-центр',
    children: [
      {
        id: 'le-contact-dialogs',
        title: 'Диалоги',
        path: '/legal-entities/contact-center/dialogs',
      },
      {
        id: 'le-contact-agents',
        title: 'Агенты',
        path: '/legal-entities/contact-center/agents',
      },
      {
        id: 'le-contact-campaigns',
        title: 'Рассылки',
        path: '/legal-entities/contact-center/campaigns',
      },
      {
        id: 'le-contact-stats',
        title: 'Статистика',
        path: '/legal-entities/contact-center/stats',
      },
      {
        id: 'le-contact-templates',
        title: 'Шаблоны',
        path: '/legal-entities/contact-center/templates',
      },
      {
        id: 'le-contact-analytics',
        title: 'Аналитика',
        path: '/legal-entities/contact-center/analytics',
      },
    ],
  },
  {
    id: 'le-analytics',
    title: 'Отчеты',
    children: [
      {
        id: 'le-reports-consumption',
        title: 'Отчеты по расходам',
        path: '/legal-entities/analytics/consumption',
      },
      {
        id: 'le-reports-efficiency',
        title: 'Эффективность',
        path: '/legal-entities/analytics/efficiency',
      },
    ],
  },
  {
    id: 'le-ai-assistant',
    title: 'ИИ-ассистент',
    children: [
      {
        id: 'le-ai-activity',
        title: 'Анализ активности',
        path: '/legal-entities/ai/activity-analysis',
      },
      {
        id: 'le-ai-predictions',
        title: 'Прогнозы',
        path: '/legal-entities/ai/predictions',
      },
    ],
  },
  {
    id: 'le-settings',
    title: 'Настройки ЮЛ',
    path: '/legal-entities/settings',
  },
];

export const getNavigationForWorkspace = (workspace: WorkspaceType): NavigationItem[] => {
  return workspace === 'individuals' ? individualsNavigation : legalEntitiesNavigation;
};
