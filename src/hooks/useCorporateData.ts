
import { useState, useEffect, useCallback } from 'react';
import { dataService } from '@/services/dataService';
import { 
  CorporateActivityAnalysis,
  SuspiciousTransaction,
  CorporateInsight,
  CorporateAIPerformanceMetrics,
  FleetEfficiency,
  CostOptimization
} from '@/types/legal-entities-ai';

interface CorporateDataState {
  analysis: CorporateActivityAnalysis[];
  transactions: SuspiciousTransaction[];
  insights: CorporateInsight[];
  metrics: CorporateAIPerformanceMetrics | null;
  fleetEfficiency: FleetEfficiency[];
  costOptimization: CostOptimization[];
  chatHistory: any[];
}

interface LoadingState {
  analysis: boolean;
  transactions: boolean;
  insights: boolean;
  metrics: boolean;
  fleetEfficiency: boolean;
  costOptimization: boolean;
  chatHistory: boolean;
}

export const useCorporateData = () => {
  const [data, setData] = useState<CorporateDataState>({
    analysis: [],
    transactions: [],
    insights: [],
    metrics: null,
    fleetEfficiency: [],
    costOptimization: [],
    chatHistory: [],
  });

  const [loading, setLoading] = useState<LoadingState>({
    analysis: false,
    transactions: false,
    insights: false,
    metrics: false,
    fleetEfficiency: false,
    costOptimization: false,
    chatHistory: false,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const loadData = useCallback(async <T extends keyof CorporateDataState>(
    key: T,
    loader: () => Promise<CorporateDataState[T]>
  ) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const result = await loader();
      setData(prev => ({ ...prev, [key]: result }));
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      setErrors(prev => ({ 
        ...prev, 
        [key]: error instanceof Error ? error.message : 'Unknown error' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  const loadAnalysis = useCallback(() => 
    loadData('analysis', dataService.getCorporateAnalysis), [loadData]);

  const loadTransactions = useCallback(() => 
    loadData('transactions', dataService.getSuspiciousTransactions), [loadData]);

  const loadInsights = useCallback(() => 
    loadData('insights', dataService.getCorporateInsights), [loadData]);

  const loadMetrics = useCallback(() => 
    loadData('metrics', dataService.getCorporateMetrics), [loadData]);

  const loadFleetEfficiency = useCallback(() => 
    loadData('fleetEfficiency', dataService.getFleetEfficiency), [loadData]);

  const loadCostOptimization = useCallback(() => 
    loadData('costOptimization', dataService.getCostOptimization), [loadData]);

  const loadChatHistory = useCallback(() => 
    loadData('chatHistory', dataService.getChatHistory), [loadData]);

  const loadAll = useCallback(async () => {
    await Promise.all([
      loadAnalysis(),
      loadTransactions(),
      loadInsights(),
      loadMetrics(),
      loadFleetEfficiency(),
      loadCostOptimization(),
      loadChatHistory(),
    ]);
  }, [
    loadAnalysis,
    loadTransactions,
    loadInsights,
    loadMetrics,
    loadFleetEfficiency,
    loadCostOptimization,
    loadChatHistory,
  ]);

  const refreshData = useCallback(() => {
    dataService.clearCache();
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const isAnyLoading = Object.values(loading).some(Boolean);
  const hasErrors = Object.values(errors).some(Boolean);

  return {
    data,
    loading,
    errors,
    loadData: {
      analysis: loadAnalysis,
      transactions: loadTransactions,
      insights: loadInsights,
      metrics: loadMetrics,
      fleetEfficiency: loadFleetEfficiency,
      costOptimization: loadCostOptimization,
      chatHistory: loadChatHistory,
      all: loadAll,
    },
    refreshData,
    isAnyLoading,
    hasErrors,
  };
};
