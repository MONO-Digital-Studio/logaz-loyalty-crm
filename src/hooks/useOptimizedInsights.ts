
import { useMemo, useCallback } from 'react';

export interface InsightMetrics {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export const useOptimizedInsights = <T extends { priority: string; id: string }>(insights: T[]) => {
  const metrics = useMemo((): InsightMetrics => {
    return insights.reduce((acc, insight) => {
      acc.total++;
      acc[insight.priority as keyof Omit<InsightMetrics, 'total'>]++;
      return acc;
    }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });
  }, [insights]);

  const criticalInsights = useMemo(() => 
    insights.filter(insight => insight.priority === 'critical'),
    [insights]
  );

  const highPriorityInsights = useMemo(() => 
    insights.filter(insight => insight.priority === 'high'),
    [insights]
  );

  const getInsightsByPriority = useCallback((priority: string) => 
    insights.filter(insight => insight.priority === priority),
    [insights]
  );

  const getInsightById = useCallback((id: string) => 
    insights.find(insight => insight.id === id),
    [insights]
  );

  return {
    metrics,
    criticalInsights,
    highPriorityInsights,
    getInsightsByPriority,
    getInsightById,
  };
};
