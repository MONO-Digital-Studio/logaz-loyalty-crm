
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, RefreshCw, Minimize2, Maximize2, X, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';
import InsightCard from './insights/InsightCard';
import ChatInterface from './chat/ChatInterface';

const AIAssistantPanel: React.FC = () => {
  const {
    insights,
    performance,
    isLoading,
    isPanelOpen,
    isMinimized,
    closePanel,
    toggleMinimize,
    refreshData
  } = useIndividualsAI();

  if (!isPanelOpen) return null;

  const criticalInsights = insights.filter(i => i.priority === 'critical');
  const highPriorityInsights = insights.filter(i => i.priority === 'high');

  return <div className={`
      fixed top-0 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700
      transition-all duration-300 z-50 flex flex-col
      ${isMinimized ? 'w-80 h-16 top-6' : 'w-144 h-screen'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-logaz-orange to-orange-500 rounded-t-lg text-white">
        <div className="flex items-center">
          <Brain className="w-5 h-5 mr-3" />
          <div>
            <h3 className="font-semibold text-sm">ИИ-Ассистент</h3>
          </div>
          <Badge variant="secondary" className="ml-3 text-xs bg-white/20 text-white border-white/30">
            Beta
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={refreshData} disabled={isLoading} className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleMinimize} className="h-8 w-8 p-0 text-white hover:bg-white/20">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={closePanel} className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && <div className="flex flex-col flex-1 overflow-hidden">
          {/* Быстрые метрики */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                  <span className="font-semibold text-red-600">{criticalInsights.length}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">Критично</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="font-semibold text-green-600">{performance.predictionAccuracy.churnPrediction.toFixed(1)}%</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">Точность</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="font-semibold text-blue-600">{insights.reduce((sum, i) => sum + i.affectedClients, 0)}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">Клиентов</div>
              </div>
            </div>
          </div>

          {/* Критичные уведомления */}
          {criticalInsights.length > 0 && <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Требует немедленного внимания
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {criticalInsights.map(insight => <div key={insight.id} className="text-xs text-red-700 dark:text-red-300 bg-white/50 dark:bg-black/20 rounded p-2">
                    <div className="font-medium">{insight.title}</div>
                    <div className="opacity-75">{insight.affectedClients} клиентов затронуто</div>
                  </div>)}
              </div>
            </div>}

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Инсайты и рекомендации ({insights.length})
              </h4>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {isLoading ? <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">Анализируем данные...</span>
                  </div> : insights.length > 0 ? insights.map(insight => <InsightCard key={insight.id} insight={insight} />) : <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <div>Нет новых инсайтов</div>
                    <div className="text-xs mt-1">Все процессы работают стабильно</div>
                  </div>}
              </div>
            </ScrollArea>
          </div>

          <div className="h-64 border-t border-gray-200 dark:border-gray-700">
            <ChatInterface />
          </div>
        </div>}
    </div>;
};

export default AIAssistantPanel;
