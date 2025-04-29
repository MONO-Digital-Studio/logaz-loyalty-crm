
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import ClientStats from "@/components/Clients/ClientStats";
import ClientsTable from "@/components/Clients/ClientsTable";

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

const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Клиенты CRM</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <FileText size={18} />
            Экспорт данных
          </Button>
          <Button variant="default" className="bg-logaz-blue">
            Добавить клиента
          </Button>
        </div>
      </div>
      
      <ClientStats 
        totalClients={2845} 
        activeClients={1256} 
        newClients={142} 
        averageCheck={1850}
      />
      
      <div className="w-full">
        <ClientsTable clients={clientsData} />
      </div>
    </div>
  );
};

export default ClientsPage;
