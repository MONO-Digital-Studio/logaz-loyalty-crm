
import { useState, useCallback, useMemo } from 'react';
import { useOptimizedState } from './useOptimizedState';
import { useDebouncedCallback } from './useDebounced';
import { IndividualsLoyaltySettings, LoyaltyLevel, BonusRule, PointsRule, RedemptionRule } from '@/types/loyalty-individuals';

const defaultLevels: LoyaltyLevel[] = [
  {
    id: '1',
    name: 'Бронзовый',
    minPoints: 0,
    maxPoints: 999,
    pointsPerRuble: 0.5,
    color: '#CD7F32',
    benefits: ['Базовое начисление баллов', 'SMS уведомления'],
    isActive: true
  },
  {
    id: '2',
    name: 'Серебряный',
    minPoints: 1000,
    maxPoints: 4999,
    pointsPerRuble: 1,
    color: '#C0C0C0',
    benefits: ['Увеличенное начисление баллов', 'Приоритетная поддержка', 'Скидка в магазине 3%'],
    isActive: true
  },
  {
    id: '3',
    name: 'Золотой',
    minPoints: 5000,
    maxPoints: 19999,
    pointsPerRuble: 1.5,
    color: '#FB8607',
    benefits: ['Повышенное начисление баллов', 'VIP поддержка', 'Скидка в магазине 5%', 'Бесплатная мойка раз в месяц'],
    isActive: true
  },
  {
    id: '4',
    name: 'Платиновый',
    minPoints: 20000,
    maxPoints: null,
    pointsPerRuble: 2,
    color: '#E5E4E2',
    benefits: ['Максимальное начисление баллов', 'Персональный менеджер', 'Скидка в магазине 10%', 'Приоритетная мойка', 'Эксклюзивные акции'],
    isActive: true
  }
];

const defaultBonusRules: BonusRule[] = [
  {
    id: '1',
    name: 'День рождения',
    description: 'Двойные баллы в день рождения',
    type: 'birthday',
    multiplier: 2,
    conditions: {},
    isActive: true
  },
  {
    id: '2',
    name: 'Годовщина регистрации',
    description: 'Бонусные баллы в годовщину регистрации',
    type: 'anniversary',
    multiplier: 1.5,
    conditions: {},
    isActive: true
  },
  {
    id: '3',
    name: 'Автовозврат клиентов',
    description: 'Бонусные баллы для клиентов, которые не посещали АЗС более 30 дней',
    type: 'auto_return',
    multiplier: 1.5,
    conditions: {
      daysInactive: 30
    },
    isActive: true
  },
  {
    id: '4',
    name: 'Баллы за регистрацию',
    description: 'Приветственные баллы новым клиентам при регистрации',
    type: 'registration',
    multiplier: 0, // Фиксированное количество баллов
    conditions: {
      minAmount: 500 // 500 баллов за регистрацию
    },
    isActive: true
  },
  {
    id: '5',
    name: 'Сервисные баллы',
    description: 'Баллы на ремонт и обслуживание ГБО',
    type: 'expiration_reminder',
    multiplier: 1.2,
    conditions: {
      daysBefore: 7 // За 7 дней до сгорания
    },
    isActive: true
  }
];

const defaultPointsRules: PointsRule[] = [
  {
    id: '1',
    category: 'fuel',
    name: 'За литр топлива',
    pointsPerUnit: 1,
    unit: 'liter',
    isActive: true
  },
  {
    id: '2',
    category: 'services',
    name: 'За услуги',
    pointsPerUnit: 0.5,
    unit: 'ruble',
    isActive: true
  },
  {
    id: '3',
    category: 'shop',
    name: 'За покупки в магазине',
    pointsPerUnit: 0.3,
    unit: 'ruble',
    isActive: true
  }
];

const defaultRedemptionRules: RedemptionRule[] = [
  {
    id: '1',
    name: 'Скидка на топливо',
    pointsCost: 100,
    discountValue: 10,
    discountType: 'fixed',
    category: 'fuel',
    isActive: true
  },
  {
    id: '2',
    name: 'Скидка в магазине',
    pointsCost: 50,
    discountValue: 5,
    discountType: 'percentage',
    category: 'shop',
    minPurchaseAmount: 500,
    isActive: true
  }
];

const defaultSettings: IndividualsLoyaltySettings = {
  isActive: true,
  programName: 'Программа лояльности ЛОГАЗ',
  programDescription: 'Накапливайте баллы за каждую покупку и получайте скидки',
  levels: defaultLevels,
  bonusRules: defaultBonusRules,
  pointsRules: defaultPointsRules,
  redemptionRules: defaultRedemptionRules,
  pointsExpirationDays: 365,
  lastModified: new Date()
};

export const useLoyaltySettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const loyaltySettings = useOptimizedState({
    initialValue: defaultSettings,
    validator: (value: IndividualsLoyaltySettings) => {
      return value.levels.length > 0 && value.programName.trim().length > 0;
    },
    onChange: () => {
      setHasChanges(true);
    }
  });

  const saveLoyaltySettings = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      loyaltySettings.setValue(prev => ({
        ...prev,
        lastModified: new Date()
      }));
      setHasChanges(false);
      console.log('Настройки программы лояльности сохранены');
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loyaltySettings]);

  const debouncedSave = useDebouncedCallback(saveLoyaltySettings, 300);

  const updateLevel = useCallback((levelId: string, updates: Partial<LoyaltyLevel>) => {
    loyaltySettings.setValue(prev => ({
      ...prev,
      levels: prev.levels.map(level => 
        level.id === levelId ? { ...level, ...updates } : level
      )
    }));
  }, [loyaltySettings]);

  const addLevel = useCallback((level: Omit<LoyaltyLevel, 'id'>) => {
    const newLevel: LoyaltyLevel = {
      ...level,
      id: Date.now().toString()
    };
    loyaltySettings.setValue(prev => ({
      ...prev,
      levels: [...prev.levels, newLevel]
    }));
  }, [loyaltySettings]);

  const removeLevel = useCallback((levelId: string) => {
    loyaltySettings.setValue(prev => ({
      ...prev,
      levels: prev.levels.filter(level => level.id !== levelId)
    }));
  }, [loyaltySettings]);

  const updateBonusRule = useCallback((ruleId: string, updates: Partial<BonusRule>) => {
    loyaltySettings.setValue(prev => ({
      ...prev,
      bonusRules: prev.bonusRules.map(rule => 
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }));
  }, [loyaltySettings]);

  const addBonusRule = useCallback((rule: Omit<BonusRule, 'id'>) => {
    const newRule: BonusRule = {
      ...rule,
      id: Date.now().toString()
    };
    loyaltySettings.setValue(prev => ({
      ...prev,
      bonusRules: [...prev.bonusRules, newRule]
    }));
  }, [loyaltySettings]);

  const removeBonusRule = useCallback((ruleId: string) => {
    loyaltySettings.setValue(prev => ({
      ...prev,
      bonusRules: prev.bonusRules.filter(rule => rule.id !== ruleId)
    }));
  }, [loyaltySettings]);

  const levelValidation = useMemo(() => {
    const levels = loyaltySettings.value.levels;
    const errors: string[] = [];
    
    // Check for overlapping ranges
    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i];
      const next = levels[i + 1];
      if (current.maxPoints && next.minPoints <= current.maxPoints) {
        errors.push(`Уровни "${current.name}" и "${next.name}" пересекаются по баллам`);
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }, [loyaltySettings.value.levels]);

  return {
    loyaltySettings: loyaltySettings.value,
    setLoyaltySettings: loyaltySettings.setValue,
    isLoading,
    hasChanges,
    levelValidation,
    saveLoyaltySettings,
    debouncedSave,
    updateLevel,
    addLevel,
    removeLevel,
    updateBonusRule,
    addBonusRule,
    removeBonusRule,
    resetSettings: loyaltySettings.reset
  };
};
