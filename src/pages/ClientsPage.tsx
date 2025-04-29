
import React, { useState } from 'react';
import { clients } from '../data/mockData';
import { Search, Filter, UserPlus, Download, Mail, MoreHorizontal } from 'lucide-react';

const ClientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredClients = clients.filter(
    client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-syncopate font-bold">Клиенты</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Mail size={16} className="mr-2" />
            Рассылка
          </button>
          <button className="btn-primary flex items-center">
            <UserPlus size={16} className="mr-2" />
            Добавить клиента
          </button>
        </div>
      </div>

      <div className="stats-card p-6 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Всего клиентов</div>
            <div className="text-xl font-bold">{clients.length}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Активных</div>
            <div className="text-xl font-bold">
              {clients.filter(c => c.status === 'active').length}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Новых за месяц</div>
            <div className="text-xl font-bold">
              {clients.filter(c => c.status === 'new').length}
            </div>
          </div>
        </div>
        <button className="btn-secondary flex items-center">
          <Download size={16} className="mr-2" />
          Экспорт
        </button>
      </div>

      <div className="stats-card p-6">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск клиентов..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button 
            className={`btn-secondary flex items-center ${showFilters ? 'bg-logaz-blue/5' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Фильтры
          </button>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Сегмент</label>
                <select className="border border-gray-300 rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent">
                  <option value="">Все сегменты</option>
                  <option value="vip">VIP</option>
                  <option value="active">Активный</option>
                  <option value="new">Новый</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Статус</label>
                <select className="border border-gray-300 rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent">
                  <option value="">Все статусы</option>
                  <option value="active">Активный</option>
                  <option value="inactive">Неактивный</option>
                  <option value="new">Новый</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Дата регистрации</label>
                <select className="border border-gray-300 rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-logaz-blue focus:border-transparent">
                  <option value="">За все время</option>
                  <option value="30days">Последние 30 дней</option>
                  <option value="90days">Последние 90 дней</option>
                  <option value="year">Этот год</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="btn-cancel">Сбросить</button>
              <button className="btn-primary">Применить</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 font-semibold">ФИО</th>
                <th className="text-left p-3 font-semibold">Телефон</th>
                <th className="text-left p-3 font-semibold">Email</th>
                <th className="text-left p-3 font-semibold">Регистрация</th>
                <th className="text-left p-3 font-semibold">Последняя покупка</th>
                <th className="text-left p-3 font-semibold">Сумма покупок</th>
                <th className="text-left p-3 font-semibold">Баллы</th>
                <th className="text-left p-3 font-semibold">Статус</th>
                <th className="text-left p-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.segment}</div>
                  </td>
                  <td className="p-3">{client.phone}</td>
                  <td className="p-3">{client.email}</td>
                  <td className="p-3">{new Date(client.registrationDate).toLocaleDateString('ru-RU')}</td>
                  <td className="p-3">{new Date(client.lastPurchaseDate).toLocaleDateString('ru-RU')}</td>
                  <td className="p-3">{client.totalPurchases} покупок</td>
                  <td className="p-3">{client.loyaltyPoints}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-green-100 text-green-800' :
                      client.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {client.status === 'active' ? 'Активный' : 
                       client.status === 'inactive' ? 'Неактивный' : 'Новый'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {filteredClients.length} из {clients.length} клиентов
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50">
              Назад
            </button>
            <button className="px-3 py-1 bg-logaz-blue text-white rounded-md hover:bg-logaz-blue/90">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              Вперед
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
