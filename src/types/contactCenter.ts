
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

export interface ContactStats {
  totalDialogs: number;
  avgResponseTime: string;
  avgResolutionTime: string;
  satisfaction: number;
}

export interface ChannelDistribution {
  channel: string;
  percentage: number;
}

export interface AgentPerformance {
  agentName: string;
  responseTime: number;
  resolutionTime: number;
  satisfaction: number;
}

export interface TopicDistribution {
  topic: string;
  percentage: number;
}
