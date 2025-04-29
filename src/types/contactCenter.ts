
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

// Новые типы для шаблонов ответов
export interface ResponseTemplate {
  id: string;
  title: string;
  text: string;
  category: string;
  tags: string[];
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateCategory {
  id: string;
  name: string;
  count: number;
}

// Новые типы для аналитики
export interface AnalyticsData {
  periodStart: Date;
  periodEnd: Date;
  totalChats: number;
  avgChatDuration: number;
  satisfactionScore: number;
  responseTime: number;
}

export interface AgentStats {
  agentId: string;
  name: string;
  handledChats: number;
  avgResponseTime: number;
  satisfaction: number;
}
