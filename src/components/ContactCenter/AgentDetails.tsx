
import React, { useState } from 'react';
import { Agent } from '@/types/contactCenter';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Phone, Edit } from 'lucide-react';

interface AgentDetailsProps {
  agent: Agent;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'busy':
      return 'bg-amber-500';
    case 'offline':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'online':
      return 'Онлайн';
    case 'busy':
      return 'Занят';
    case 'offline':
      return 'Оффлайн';
    default:
      return 'Неизвестно';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  const [isEditing, setIsEditing] = useState(false);

  const statusColor = getStatusColor(agent.status);
  const statusText = getStatusText(agent.status);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-4 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="mr-2 h-4 w-4" />
              Изменить
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback className="text-2xl">{getInitials(agent.name)}</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold">{agent.name}</h3>
            <div className="flex items-center justify-center mt-1">
              <span className={`w-2.5 h-2.5 ${statusColor} rounded-full mr-2`}></span>
              <span>{statusText}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">ID оператора</h4>
            <p>{agent.id}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Активные диалоги</h4>
            <p>{agent.activeDialogs}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Навыки</h4>
            <div className="flex flex-wrap gap-2">
              {agent.skills.map(skill => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-4 flex justify-between">
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Сообщение
        </Button>
        <Button variant="default" className="bg-logaz-blue">
          <Phone className="mr-2 h-4 w-4" />
          Вызов
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentDetails;
