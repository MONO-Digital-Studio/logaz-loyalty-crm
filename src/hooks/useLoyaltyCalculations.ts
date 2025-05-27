
import { useMemo } from 'react';
import { LoyaltyLevel, LoyaltyCalculation, IndividualsLoyaltySettings } from '@/types/loyalty-individuals';

export const useLoyaltyCalculations = (
  settings: IndividualsLoyaltySettings,
  customerPoints: number = 0,
  purchaseAmount: number = 0
) => {
  const currentLevel = useMemo(() => {
    return settings.levels.find(level => 
      customerPoints >= level.minPoints && 
      (level.maxPoints === null || customerPoints <= level.maxPoints)
    ) || settings.levels[0];
  }, [settings.levels, customerPoints]);

  const nextLevel = useMemo(() => {
    return settings.levels.find(level => 
      level.minPoints > customerPoints
    );
  }, [settings.levels, customerPoints]);

  const pointsToNextLevel = useMemo(() => {
    if (!nextLevel) return null;
    return nextLevel.minPoints - customerPoints;
  }, [nextLevel, customerPoints]);

  const earnedPoints = useMemo(() => {
    if (!currentLevel || purchaseAmount <= 0) return 0;
    return Math.floor(purchaseAmount * currentLevel.pointsPerRuble);
  }, [currentLevel, purchaseAmount]);

  const availableRedemptions = useMemo(() => {
    return settings.redemptionRules.filter(rule => 
      rule.isActive && customerPoints >= rule.pointsCost
    );
  }, [settings.redemptionRules, customerPoints]);

  const levelProgress = useMemo(() => {
    if (!currentLevel) return 0;
    
    const levelStart = currentLevel.minPoints;
    const levelEnd = currentLevel.maxPoints || (nextLevel?.minPoints || customerPoints);
    const levelRange = levelEnd - levelStart;
    const currentProgress = customerPoints - levelStart;
    
    return levelRange > 0 ? (currentProgress / levelRange) * 100 : 100;
  }, [currentLevel, nextLevel, customerPoints]);

  const bonusMultiplier = useMemo(() => {
    let multiplier = 1;
    const today = new Date();
    
    settings.bonusRules.forEach(rule => {
      if (!rule.isActive) return;
      
      switch (rule.type) {
        case 'birthday':
          // Assuming we have customer birthday data
          // This would be provided from customer context
          multiplier = Math.max(multiplier, rule.multiplier);
          break;
        case 'seasonal':
          if (rule.conditions.dateRange) {
            const start = new Date(rule.conditions.dateRange.start);
            const end = new Date(rule.conditions.dateRange.end);
            if (today >= start && today <= end) {
              multiplier = Math.max(multiplier, rule.multiplier);
            }
          }
          break;
        case 'volume':
          if (rule.conditions.minAmount && purchaseAmount >= rule.conditions.minAmount) {
            multiplier = Math.max(multiplier, rule.multiplier);
          }
          break;
      }
    });
    
    return multiplier;
  }, [settings.bonusRules, purchaseAmount]);

  const finalEarnedPoints = useMemo(() => {
    return Math.floor(earnedPoints * bonusMultiplier);
  }, [earnedPoints, bonusMultiplier]);

  const calculation: LoyaltyCalculation = useMemo(() => ({
    level: currentLevel,
    pointsEarned: finalEarnedPoints,
    potentialDiscount: availableRedemptions.reduce((max, rule) => 
      Math.max(max, rule.discountValue), 0
    ),
    nextLevelPoints: pointsToNextLevel
  }), [currentLevel, finalEarnedPoints, availableRedemptions, pointsToNextLevel]);

  return {
    currentLevel,
    nextLevel,
    pointsToNextLevel,
    earnedPoints,
    finalEarnedPoints,
    bonusMultiplier,
    availableRedemptions,
    levelProgress,
    calculation
  };
};
