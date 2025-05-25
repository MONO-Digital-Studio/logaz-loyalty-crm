
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Bell } from "lucide-react";

// Client data type
interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  level: string;
  points: number;
  visits: number;
  lastVisit: string;
  communicationChannels?: {
    email: boolean;
    sms: boolean;
    telegram: boolean;
    push: boolean;
  };
}

interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      const filtered = clients.filter(client => 
        client.name.toLowerCase().includes(query) || 
        client.phone.includes(query) || 
        client.email.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  };

  const renderCommunicationChannels = (channels?: Client['communicationChannels']) => {
    if (!channels) return <span className="text-gray-400">Нет данных</span>;
    
    return (
      <div className="flex space-x-1">
        {channels.email && (
          <Badge variant="outline" className="p-1">
            <Mail className="h-3 w-3" />
          </Badge>
        )}
        {channels.sms && (
          <Badge variant="outline" className="p-1">
            <Phone className="h-3 w-3" />
          </Badge>
        )}
        {channels.telegram && (
          <Badge variant="outline" className="p-1">
            <MessageSquare className="h-3 w-3" />
          </Badge>
        )}
        {channels.push && (
          <Badge variant="outline" className="p-1">
            <Bell className="h-3 w-3" />
          </Badge>
        )}
      </div>
    );
  };

  return (
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
              <TableHead>ID</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Уровень</TableHead>
              <TableHead>Баллы</TableHead>
              <TableHead>Визитов</TableHead>
              <TableHead>Каналы связи</TableHead>
              <TableHead>Последний визит</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {client.id}
                </TableCell>
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
                <TableCell>
                  {renderCommunicationChannels(client.communicationChannels)}
                </TableCell>
                <TableCell>{client.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Показано {filteredClients.length} из {clients.length} клиентов
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Предыдущая</Button>
            <Button variant="outline" size="sm" disabled>Следующая</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsTable;
