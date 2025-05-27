
import { NavigationItem } from '@/types/navigation';

export const individualsNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Дашборд',
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
