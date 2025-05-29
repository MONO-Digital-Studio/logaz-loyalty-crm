
import React from 'react';

const DashboardPageRefactored: React.FC = () => {
  console.log('DashboardPageRefactored rendering - simplified version');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Debug</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Тестовый компонент</h2>
          <p className="text-gray-700">
            Если вы видите этот текст, значит страница дашборда работает.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Текущий роут: /dashboard
          </p>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            Проверьте консоль браузера на наличие ошибок JavaScript.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRefactored;
