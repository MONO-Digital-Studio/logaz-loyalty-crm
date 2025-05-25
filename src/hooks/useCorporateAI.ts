
import { useState, useCallback } from 'react';
import { CorporateInsight, CorporateAIPerformanceMetrics } from '@/types/legal-entities-ai';
import { useBaseAI } from './useBaseAI';

const initialMetrics: CorporateAIPerformanceMetrics = {
  fraudDetectionAccuracy: 94.2,
  falsePositiveRate: 2.1,
  automatedProcesses: 127,
  timeToResolution: 18.5,
  complianceScore: 98.7,
  retentionImprovement: 12.3,
  revenueIncrease: 8.7,
  operationalEfficiency: 91.4,
  criticalAlerts: 3,
  totalInsights: 45,
  efficiency: 91.4,
  lastUpdate: new Date(),
};

export const useCorporateAI = () => {
  const baseAI = useBaseAI(initialMetrics);
  const [insights, setInsights] = useState<CorporateInsight[]>([]);

  const addInsight = useCallback((insight: Omit<CorporateInsight, 'id' | 'timestamp'>) => {
    const newInsight: CorporateInsight = {
      ...insight,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setInsights(prev => [newInsight, ...prev]);
  }, []);

  const clearInsights = useCallback(() => {
    setInsights([]);
  }, []);

  return {
    ...baseAI,
    insights,
    addInsight,
    clearInsights,
  };
};
