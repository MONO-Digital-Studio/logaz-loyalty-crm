
import React, { useState } from 'react';
import { Bell, Search, X, Menu } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    notifications, 
    showNotifications, 
    unreadCount, 
    toggleNotifications, 
    closeNotifications 
  } = useNotifications();

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 py-2 h-12">
      <div className="flex items-center flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 mr-2 sm:mr-3 transition-colors"
        >
          <Menu size={18} />
        </button>
        
        <div className="relative hidden sm:block flex-1 max-w-md">
          <input
            type="text"
            placeholder="Поиск..."
            className="pl-8 pr-4 py-1.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Мобильный поиск */}
        <button className="p-1.5 rounded-full hover:bg-gray-100 sm:hidden">
          <Search size={18} />
        </button>

        <div className="relative">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 relative"
            onClick={toggleNotifications}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-logaz-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-sm">Уведомления</h3>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={closeNotifications}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Нет уведомлений
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm truncate flex-1">{notification.title}</h4>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-gray-200 text-center">
                <button className="text-sm text-logaz-blue hover:underline">
                  Просмотреть все
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-logaz-blue flex items-center justify-center text-white font-medium text-xs sm:text-sm">
            АД
          </div>
          <span className="ml-2 hidden md:block font-medium text-sm truncate">Администратор</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
