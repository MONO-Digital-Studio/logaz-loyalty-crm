
import { useQuery } from '@tanstack/react-query';
import { AIInsight, WorkspaceType } from '@/types/ai';
import { mockIndividualInsights, mockCorporateInsights } from '@/data/mockAIData';

export const useAIInsights = (workspace: WorkspaceType) => {
  return useQuery({
    queryKey: ['ai-insights', workspace],
    queryFn: async (): Promise<AIInsight[]> => {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (workspace === 'individuals') {
        return mockIndividualInsights;
      } else {
        return mockCorporateInsights;
      }
    },
    refetchInterval: 30000, // Обновление каждые 30 секунд
    enabled: true,
  });
};

export const useAIRecommendations = (workspace: WorkspaceType) => {
  return useQuery({
    queryKey: ['ai-recommendations', workspace],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Здесь будет логика генерации рекомендаций
      return [];
    },
    enabled: true,
  });
};
