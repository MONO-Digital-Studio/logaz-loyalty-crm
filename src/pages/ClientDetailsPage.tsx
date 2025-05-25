import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientHeader from "@/components/ClientDetails/ClientHeader";
import ClientSummary from "@/components/ClientDetails/ClientSummary";
import ClientInfo from "@/components/ClientDetails/ClientInfo";
import ClientActivity from "@/components/ClientDetails/ClientActivity";
import ClientCommunicationChannels from "@/components/ClientDetails/ClientCommunicationChannels";
import PurchaseHistory from "@/components/ClientDetails/PurchaseHistory";
import PointsHistory from "@/components/ClientDetails/PointsHistory";

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

const communicationChannels = [
  { type: 'email' as const, status: 'active' as const, value: 'ivanov@example.com', lastActivity: '2 дня назад' },
  { type: 'sms' as const, status: 'active' as const, value: '+7 (912) 345-67-89', lastActivity: '1 неделю назад' },
  { type: 'telegram' as const, status: 'pending' as const, value: '@ivanov_user', lastActivity: 'Не подключен' },
  { type: 'push' as const, status: 'blocked' as const, value: 'Мобильное приложение', lastActivity: '1 месяц назад' },
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
      <ClientHeader 
        name={clientData.name} 
        id={clientData.id} 
        level={clientData.level} 
      />

      <ClientSummary 
        points={clientData.points}
        totalSpent={clientData.totalSpent}
        visits={clientData.visits}
        rfmScore={clientData.rfmScore}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClientInfo 
          phone={clientData.phone}
          email={clientData.email}
          birthDate={clientData.birthDate}
          registrationDate={clientData.registrationDate}
          lastVisit={clientData.lastVisit}
        />

        <ClientActivity data={activityData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientCommunicationChannels channels={communicationChannels} />
        <div></div>
      </div>

      <Tabs defaultValue="purchases" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="purchases">История покупок</TabsTrigger>
          <TabsTrigger value="points">История баллов</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <PurchaseHistory purchases={purchaseHistory} />
        </TabsContent>

        <TabsContent value="points">
          <PointsHistory points={pointsHistory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailsPage;
