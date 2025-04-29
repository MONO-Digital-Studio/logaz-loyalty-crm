
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const clientsData = [
  { 
    id: "1",
    name: "Иванов Иван Иванович", 
    phone: "+7 (912) 345-67-89", 
    email: "ivanov@example.com", 
    level: "Серебряный", 
    points: 284, 
    visits: 27,
    lastVisit: "15.06.2023"
  },
  { 
    id: "2",
    name: "Петрова Анна Сергеевна", 
    phone: "+7 (926) 765-43-21", 
    email: "petrova@example.com", 
    level: "Золотой", 
    points: 685, 
    visits: 42,
    lastVisit: "18.06.2023" 
  },
  { 
    id: "3",
    name: "Сидоров Алексей Петрович", 
    phone: "+7 (905) 123-45-67", 
    email: "sidorov@example.com", 
    level: "Стандарт", 
    points: 125, 
    visits: 15,
    lastVisit: "10.06.2023" 
  },
  { 
    id: "4",
    name: "Козлова Елена Владимировна", 
    phone: "+7 (909) 876-54-32", 
    email: "kozlova@example.com", 
    level: "Платиновый", 
    points: 1250, 
    visits: 78,
    lastVisit: "20.06.2023" 
  },
  { 
    id: "5",
    name: "Николаев Дмитрий Александрович", 
    phone: "+7 (916) 543-21-98", 
    email: "nikolaev@example.com", 
    level: "Серебряный", 
    points: 348, 
    visits: 32,
    lastVisit: "12.06.2023" 
  },
];

const rfmDistributionData = [
  { name: 'VIP', value: 24 },
  { name: 'Активные', value: 35 },
  { name: 'Стабильные', value: 42 },
  { name: 'Новые', value: 18 },
  { name: 'Спящие', value: 15 },
  { name: 'Ушедшие', value: 8 },
];

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState(clientsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      const filtered = clientsData.filter(client => 
        client.name.toLowerCase().includes(query) || 
        client.phone.includes(query) || 
        client.email.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clientsData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Клиенты CRM</h1>
        <Button variant="default" className="bg-logaz-blue">
          Добавить клиента
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Всего клиентов</span>
            <span className="text-2xl font-bold text-logaz-blue">2,845</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Активных за месяц</span>
            <span className="text-2xl font-bold text-logaz-blue">1,256</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Новых за месяц</span>
            <span className="text-2xl font-bold text-logaz-blue">142</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Средний чек</span>
            <span className="text-2xl font-bold text-logaz-blue">1,850 ₽</span>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Список клиентов</CardTitle>
            <div className="flex justify-between items-center">
              <CardDescription>Управление клиентами и их профилями</CardDescription>
              <div className="w-64">
                <Input 
                  placeholder="Поиск клиентов..." 
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Уровень</TableHead>
                  <TableHead>Баллы</TableHead>
                  <TableHead>Визитов</TableHead>
                  <TableHead>Последний визит</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Link 
                        to={`/crm/clients/${client.id}`} 
                        className="font-medium text-logaz-blue hover:underline"
                      >
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.level}</TableCell>
                    <TableCell>{client.points}</TableCell>
                    <TableCell>{client.visits}</TableCell>
                    <TableCell>{client.lastVisit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Показано {filteredClients.length} из {clientsData.length} клиентов
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Предыдущая</Button>
                <Button variant="outline" size="sm" disabled>Следующая</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>RFM-сегментация</CardTitle>
            <CardDescription>Распределение клиентов по сегментам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rfmDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B55A2" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Экспорт данных
              </Button>
              <Button variant="default" size="sm" className="w-full bg-logaz-blue">
                Аналитика RFM
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientsPage;
