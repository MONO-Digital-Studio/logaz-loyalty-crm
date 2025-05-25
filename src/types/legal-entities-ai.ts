
export type CorporateActivityLevel = 'thriving' | 'stable' | 'concerning' | 'critical' | 'churning';
export type CorporateRiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type CorporateRecommendationType = 'account_review' | 'credit_adjustment' | 'service_call' | 'contract_renewal' | 'fleet_optimization' | 'payment_terms_review' | 'upsell_opportunity';
export type CorporateChannel = 'phone' | 'email' | 'personal_visit' | 'telegram';
export type CorporateActionTiming = 'immediate' | 'within_day' | 'within_week' | 'next_review_cycle';
export type FraudIndicatorType = 'unusual_location' | 'unusual_time' | 'excessive_volume' | 'rapid_succession' | 'geographic_impossibility' | 'pattern_deviation';
export type CorporateInsightType = 'fraud_detection' | 'cost_optimization' | 'fleet_efficiency' | 'compliance_alert' | 'payment_risk' | 'contract_opportunity';

export interface CorporateActivityAnalysis {
  companyId: string;
  companyName: string;
  inn: string;
  contractDetails: {
    contractNumber: string;
    startDate: Date;
    creditLimit: number;
    paymentTerms: number;
  };
  analysisperiod: {
    startDate: Date;
    endDate: Date;
    totalMonths: number;
  };
  fleetMetrics: {
    totalCards: number;
    activeCards: number;
    suspendedCards: number;
    averageCardsUsedPerMonth: number;
    cardUtilizationRate: number;
  };
  consumptionMetrics: {
    activeMonths: number;
    averageVolumePerActiveMonth: number;
    averageTransactionsPerActiveMonth: number;
    currentMonthMetrics: {
      volume: number;
      transactions: number;
      spending: number;
      uniqueDrivers: number;
    };
    deviationPercent: {
      volume: number;
      transactions: number;
      spending: number;
    };
  };
  businessHealthIndicators: {
    paymentHealthScore: number;
    seasonalStability: number;
    growthTrend: 'declining' | 'stable' | 'growing';
    riskLevel: CorporateRiskLevel;
  };
  recommendation: {
    level: CorporateActivityLevel;
    actions: CorporateRecommendedAction[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    estimatedRevenueLoss: number;
  };
}

export interface CorporateRecommendedAction {
  type: CorporateRecommendationType;
  message: string;
  channel: CorporateChannel;
  timing: CorporateActionTiming;
  expectedImpact: {
    revenueProtection: number;
    relationshipScore: number;
    churnReduction: number;
  };
}

export interface SuspiciousTransaction {
  transactionId: string;
  cardNumber: string;
  companyName: string;
  timestamp: Date;
  location: string;
  amount: number;
  volume: number;
  suspicionReasons: FraudIndicator[];
  riskScore: number;
  recommendedAction: 'monitor' | 'flag' | 'block_card' | 'investigate';
}

export interface FraudIndicator {
  type: FraudIndicatorType;
  confidence: number;
  description: string;
}

export interface CorporateInsight {
  id: string;
  type: CorporateInsightType;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  affectedCompanies: string[];
  suggestedActions: string[];
  timestamp: Date;
  impact: {
    revenue: number;
    risk: number;
    efficiency: number;
  };
}

export interface CorporateAIPerformanceMetrics {
  fraudDetectionAccuracy: number;
  falsePositiveRate: number;
  automatedProcesses: number;
  timeToResolution: number;
  complianceScore: number;
  retentionImprovement: number;
  revenueIncrease: number;
  operationalEfficiency: number;
  criticalAlerts: number;
  totalInsights: number;
  efficiency: number;
  lastUpdate: Date;
}

export interface CorporateChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface FleetEfficiency {
  companyId: string;
  companyName: string;
  totalVehicles: number;
  averageEfficiency: number;
  potentialSavings: number;
  riskLevel: CorporateRiskLevel;
  recommendations: string[];
}

export interface CostOptimization {
  companyId: string;
  companyName: string;
  currentMonthlyCost: number;
  potentialSavings: number;
  optimizationOpportunities: string[];
  implementationComplexity: 'low' | 'medium' | 'high';
  paybackPeriod: number;
}
