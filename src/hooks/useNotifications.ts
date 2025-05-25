
import { useState } from 'react';
import { notifications } from '../data/mockData';

export const useNotifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList] = useState(notifications);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const closeNotifications = () => setShowNotifications(false);

  return {
    notifications: notificationsList,
    showNotifications,
    unreadCount,
    toggleNotifications,
    closeNotifications,
  };
};
