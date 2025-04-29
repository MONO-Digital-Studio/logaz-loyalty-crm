
export interface Message {
  id: string;
  sender: 'client' | 'agent' | 'system';
  text: string;
  time: Date;
}

export interface Dialog {
  id: string;
  clientName: string;
  clientId: string;
  channel: string;
  status: 'active' | 'pending' | 'closed';
  startTime: Date;
  lastActivity: Date;
  assignedTo: string | null;
  messages: Message[];
}

export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  activeDialogs: number;
  skills: string[];
}
