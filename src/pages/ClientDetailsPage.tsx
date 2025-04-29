
import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const purchaseHistory = [
  { id: 1, date: "2023-06-15", location: "АГЗС №5", type: "Пропан", amount: 45.2, price: 1520, points: 76 },
  { id: 2, date: "2023-06-08", location: "АГЗС №3", type: "Пропан", amount: 42.8, price: 1405, points: 70 },
  { id: 3, date: "2023-05-27", location: "АГЗС №5", type: "Пропан", amount: 35.6, price: 1180, points: 59 },
  { id: 4, date: "2023-05-12", location: "АГЗС №7", type: "Метан", amount: 15.4, price: 985, points: 49 },
  { id: 5, date: "2023-04-29", location: "АГЗС №5", type: "Пропан", amount: 48.7, price: 1640, points: 82 },
];

const pointsHistory = [
  { id: 1, date: "2023-06-15", action: "Начисление", source: "Покупка", amount: 76, balance: 284 },
  { id: 2, date: "2023-06-08", action: "Начисление", source: "Покупка", amount: 70, balance: 208 },
  { id: 3, date: "2023-06-01", action: "Списание", source: "Оплата кофе", amount: -50, balance: 138 },
  { id: 4, date: "2023-05-27", action: "Начисление", source: "Покупка", amount: 59, balance: 188 },
  { id: 5, date: "2023-05-12", action: "Начисление", source: "Покупка", amount: 49, balance: 129 },
];

const activityData = [
  { month: 'Янв', расходы: 4250, визиты: 5 },
  { month: 'Фев', расходы: 3890, визиты: 4 },
  { month: 'Мар', расходы: 4570, визиты: 5 },
  { month: 'Апр', расходы: 2630, визиты: 3 },
  { month: 'Май', расходы: 3625, визиты: 4 },
  { month: 'Июн', расходы: 5280, визиты: 6 },
];

const ClientDetailsPage = () => {
  const { id } = useParams();
  const [clientData] = useState({
    id: id || "1",
    name: "Иванов Иван Иванович",
    phone: "+7 (912) 345-67-89",
    email: "ivanov@example.com",
    birthDate: "15.05.1985",
    registrationDate: "10.01.2023",
    level: "Серебряный",
    points: 284,
    totalSpent: 24350,
    visits: 27,
    rfmScore: "А3Б2В2",
    lastVisit: "15.06.2023"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{clientData.name}</h1>
          <p className="text-gray-500">ID: {clientData.id} • Уровень: {clientData.level}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Редактировать</Button>
          <Button variant="default" className="bg-logaz-orange">Связаться</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Баланс баллов</span>
            <span className="text-2xl font-bold text-logaz-blue">{clientData.points}</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Сумма покупок</span>
            <span className="text-2xl font-bold text-logaz-blue">{clientData.totalSpent} ₽</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">Число визитов</span>
            <span className="text-2xl font-bold text-logaz-blue">{clientData.visits}</span>
          </div>
        </Card>
        <Card className="stats-card">
          <div className="flex flex-col p-4">
            <span className="text-sm text-gray-500">RFM-сегмент</span>
            <span className="text-2xl font-bold text-logaz-blue">{clientData.rfmScore}</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Информация о клиенте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Телефон</div>
              <div>{clientData.phone}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Email</div>
              <div>{clientData.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Дата рождения</div>
              <div>{clientData.birthDate}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Дата регистрации</div>
              <div>{clientData.registrationDate}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Последний визит</div>
              <div>{clientData.lastVisit}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Активность клиента</CardTitle>
            <CardDescription>Расходы и визиты за последние 6 месяцев</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="расходы" 
                  stroke="#3B55A2" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="визиты" 
                  stroke="#FB8607" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="purchases" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="purchases">История покупок</TabsTrigger>
          <TabsTrigger value="points">История баллов</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>История покупок</CardTitle>
              <CardDescription>История транзакций клиента на АЗС</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>АЗС</TableHead>
                    <TableHead>Тип топлива</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Начислено баллов</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseHistory.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{new Date(purchase.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>{purchase.location}</TableCell>
                      <TableCell>{purchase.type}</TableCell>
                      <TableCell>{purchase.amount} {purchase.type === "Пропан" ? "л" : "м³"}</TableCell>
                      <TableCell>{purchase.price} ₽</TableCell>
                      <TableCell>{purchase.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4">Показать все</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="points">
          <Card>
            <CardHeader>
              <CardTitle>История баллов</CardTitle>
              <CardDescription>История начисления и списания баллов</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Операция</TableHead>
                    <TableHead>Источник</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Баланс</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointsHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>{record.action}</TableCell>
                      <TableCell>{record.source}</TableCell>
                      <TableCell className={record.amount > 0 ? "text-green-600" : "text-red-600"}>
                        {record.amount > 0 ? `+${record.amount}` : record.amount}
                      </TableCell>
                      <TableCell>{record.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4">Показать все</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailsPage;
