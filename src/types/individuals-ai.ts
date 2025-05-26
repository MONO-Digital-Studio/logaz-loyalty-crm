export type IndividualClientAnalysisLevel = 'engaged' | 'at_risk' | 'churning' | 'dormant';
export type LoyaltyLevel = 'bronze' | 'silver' | 'gold' | 'platinum';
export type RecommendedActionType = 'personal_offer' | 'point_reminder' | 'birthday_promo' | 'winback_campaign';
export type CommunicationChannel = 'push' | 'sms' | 'email' | 'telegram';
export type ActionTiming = 'immediate' | 'within_day' | 'within_week';
export type ChurnRiskFactor = 'decreased_frequency' | 'reduced_spending' | 'no_point_redemption' | 'competitor_activity' | 'seasonal_pattern' | 'payment_issues';
export type PreventionStrategyType = 'retention_offer' | 'loyalty_boost' | 'personal_outreach' | 'special_promotion';

export interface IndividualClientAnalysis {
  clientId: string;
  customerName: string;
  phoneNumber: string;
  loyaltyLevel: LoyaltyLevel;
  analysisperiod: {
    startDate: Date;
    endDate: Date;
    totalMonths: number;
  };
  metrics: {
    activeMonths: number;
    averageVisitsPerActiveMonth: number;
    averageSpendPerActiveMonth: number;
    currentMonthActivity: {
      visits: number;
      spending: number;
      pointsEarned: number;
    };
    deviationPercent: {
      visits: number;
      spending: number;
    };
  };
  loyaltyMetrics: {
    pointsBalance: number;
    pointsEarnedPeriod: number;
    pointsRedeemedPeriod: number;
    pointsExpiringSoon: number;
  };
  recommendation: {
    level: IndividualClientAnalysisLevel;
    actions: RecommendedAction[];
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface RecommendedAction {
  type: RecommendedActionType;
  message: string;
  channel: CommunicationChannel;
  timing: ActionTiming;
}

export interface ChurnPrediction {
  clientId: string;
  churnProbability: number;
  riskFactors: ChurnRiskFactorDetail[];
  timeToChurn: number;
  preventionStrategy: PreventionStrategy;
  interventionRecommendations: Intervention[];
}

export interface ChurnRiskFactorDetail {
  factor: ChurnRiskFactor;
  impact: number;
  description: string;
}

export interface PreventionStrategy {
  strategy: PreventionStrategyType;
  expectedEffectiveness: number;
  cost: number;
  roi: number;
}

export interface Intervention {
  id: string;
  type: RecommendedActionType;
  description: string;
  channel: CommunicationChannel;
  timing: ActionTiming;
  expectedImpact: number;
}

export interface LoyaltyInsight {
  id: string;
  type: 'activity_decrease' | 'points_expiring' | 'vip_upgrade' | 'churn_risk' | 'engagement_opportunity';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  affectedClients: number;
  suggestedActions: string[];
  timestamp: Date;
  impact: {
    revenue: number;
    retention: number;
    satisfaction: number;
  };
}

export interface AIPerformanceMetrics {
  predictionAccuracy: {
    churnPrediction: number;
    campaignPerformance: number;
    personalizedOffers: number;
  };
  automationEfficiency: {
    triggersProcessed: number;
    responseTime: number;
    falsePositives: number;
  };
  businessImpact: {
    retentionImprovement: number;
    revenueIncrease: number;
    operationalEfficiency: number;
  };
}

// Updated IndividualsInsight interface with missing properties
export interface IndividualsInsight {
  id: string;
  type: 'churn_risk' | 'engagement_opportunity' | 'points_expiring' | 'loyalty_upgrade' | 'campaign_optimization';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  actionRequired: boolean;
  suggestedActions: string[];
  affectedClients: number;
  impact: {
    revenue: number;
    retention: number;
    satisfaction: number;
  };
}

export interface IndividualsPerformanceMetrics {
  businessImpact: {
    operationalEfficiency: number;
    revenueIncrease: number;
    retentionImprovement: number;
  };
  predictionAccuracy: {
    churnPrediction: number;
    campaignPerformance: number;
    personalizedOffers: number;
  };
  automationEfficiency: {
    triggersProcessed: number;
    responseTime: number;
    falsePositives: number;
  };
}

export interface IndividualsChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  count: number;
  percentage: number;
  averageSpend: number;
  averageVisits: number;
  churnRate: number;
}

export interface ProductRecommendation {
  id: string;
  productName: string;
  targetSegment: string;
  confidence: number;
  expectedUplift: number;
  reasoning: string;
}

export interface CampaignOptimization {
  id: string;
  campaignType: string;
  channel: CommunicationChannel;
  currentPerformance: number;
  optimizedPerformance: number;
  recommendation: string;
}
