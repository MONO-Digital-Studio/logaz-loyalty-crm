
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types/contactCenter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AgentsListProps {
  agents: Agent[];
  selectedId?: string;
  onSelectAgent: (agent: Agent) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'online':
      return <Badge variant="default" className="bg-green-600">Онлайн</Badge>;
    case 'busy':
      return <Badge variant="default" className="bg-amber-500">Занят</Badge>;
    case 'offline':
      return <Badge variant="secondary">Оффлайн</Badge>;
    default:
      return null;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const AgentsList: React.FC<AgentsListProps> = ({ agents, selectedId, onSelectAgent }) => {
  return (
    <ul className="divide-y">
      {agents.length > 0 ? (
        agents.map((agent) => (
          <li 
            key={agent.id} 
            className={`p-4 hover:bg-muted cursor-pointer transition-colors ${
              agent.id === selectedId ? 'bg-muted' : ''
            }`}
            onClick={() => onSelectAgent(agent)}
          >
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{agent.name}</div>
                  <div>{getStatusBadge(agent.status)}</div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1">
                  Активных диалогов: {agent.activeDialogs}
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {agent.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="p-6 text-center text-muted-foreground">
          Операторы не найдены
        </li>
      )}
    </ul>
  );
};

export default AgentsList;
