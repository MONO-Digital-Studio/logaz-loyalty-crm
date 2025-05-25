
export type WorkspaceType = 'individuals' | 'legal-entities';

export type AIInsightType = 
  | 'loyalty_analysis' 
  | 'churn_prediction' 
  | 'fraud_detection' 
  | 'fleet_optimization'
  | 'risk_assessment'
  | 'personalization';

export type AIPriority = 'low' | 'medium' | 'high' | 'critical';

export type AIActionType = 
  | 'create_retention_campaign'
  | 'personalized_offers'
  | 'investigate_immediately'
  | 'schedule_consultation'
  | 'contact_client'
  | 'optimize_routes';

export interface AIInsight {
  id: string;
  type: AIInsightType;
  title: string;
  message: string;
  priority: AIPriority;
  action: AIActionType;
  timestamp: Date;
  workspace: WorkspaceType;
  metadata?: Record<string, any>;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  category: string;
  workspace: WorkspaceType;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  workspace: WorkspaceType;
}

export interface AIMetrics {
  totalInsights: number;
  criticalAlerts: number;
  automatedActions: number;
  efficiency: number;
  lastUpdate: Date;
}
