
import { NavigationItem } from '@/types/navigation';

export const legalEntitiesNavigation: NavigationItem[] = [
  {
    id: 'le-dashboard',
    title: 'Дашборд',
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
        children: [
          {
            id: 'le-comm-email',
            title: 'Email рассылки',
            path: '/legal-entities/contact-center/campaigns/email',
          },
          {
            id: 'le-comm-telegram',
            title: 'Telegram',
            path: '/legal-entities/contact-center/campaigns/telegram',
          },
          {
            id: 'le-comm-sms',
            title: 'SMS',
            path: '/legal-entities/contact-center/campaigns/sms',
          },
        ],
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
    id: 'le-settings',
    title: 'Настройки ЮЛ',
    path: '/legal-entities/settings',
  },
];
