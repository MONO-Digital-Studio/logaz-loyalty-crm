
export interface LoyaltyLevel {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number | null;
  pointsPerRuble: number;
  color: string;
  benefits: string[];
  isActive: boolean;
}

export interface BonusRule {
  id: string;
  name: string;
  description: string;
  type: 'birthday' | 'anniversary' | 'seasonal' | 'volume' | 'frequency' | 'auto_return' | 'registration' | 'expiration_reminder';
  multiplier: number;
  conditions: {
    minAmount?: number;
    minFrequency?: number;
    daysBefore?: number;
    daysInactive?: number;
    dateRange?: {
      start: string;
      end: string;
    };
  };
  isActive: boolean;
}

export interface PointsRule {
  id: string;
  category: 'fuel' | 'services' | 'shop' | 'carwash';
  name: string;
  pointsPerUnit: number;
  unit: 'liter' | 'ruble' | 'visit';
  isActive: boolean;
}

export interface RedemptionRule {
  id: string;
  name: string;
  pointsCost: number;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  category: 'fuel' | 'services' | 'shop' | 'carwash';
  minPurchaseAmount?: number;
  isActive: boolean;
}

export interface IndividualsLoyaltySettings {
  isActive: boolean;
  programName: string;
  programDescription: string;
  levels: LoyaltyLevel[];
  bonusRules: BonusRule[];
  pointsRules: PointsRule[];
  redemptionRules: RedemptionRule[];
  pointsExpirationDays: number;
  lastModified: Date;
}

export interface LoyaltyCalculation {
  level: LoyaltyLevel;
  pointsEarned: number;
  potentialDiscount: number;
  nextLevelPoints: number | null;
}
