
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Maximize2, Minimize2, X, RefreshCw, TrendingUp } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import InsightCard from './InsightCard';
import ChatInterface from './ChatInterface';

const AIPanel: React.FC = memo(() => {
  const { currentWorkspace } = useWorkspace();
  const {
    isPanelOpen,
    isMinimized,
    isLoading,
    insights,
    recommendations,
    metrics,
    closePanel,
    toggleMinimize,
    refreshInsights,
  } = useAI();

  if (!isPanelOpen) return null;

  const workspaceLabel = currentWorkspace === 'individuals' ? 'ФЛ' : 'ЮЛ';
  const criticalInsights = insights.filter(i => i.priority === 'critical');
  const highInsights = insights.filter(i => i.priority === 'high');

  return (
    <div className={`
      fixed bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700
      transition-all duration-300 z-50 flex flex-col
      ${isMinimized ? 'w-80 h-16' : 'w-144 h-[600px]'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            ИИ-Ассистент {workspaceLabel}
          </h3>
          {metrics.criticalAlerts > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {metrics.criticalAlerts}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshInsights}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMinimize}
            className="h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={closePanel}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Metrics Bar */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-400">Эффективность:</span>
                  <span className="font-medium ml-1">{metrics.efficiency}%</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Инсайтов:</span>
                  <span className="font-medium ml-1">{metrics.totalInsights}</span>
                </div>
              </div>
              <div className="text-gray-500">
                {metrics.lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Critical Insights */}
          {criticalInsights.length > 0 && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Критичные уведомления
              </h4>
              <div className="space-y-2 max-h-24 overflow-y-auto">
                {criticalInsights.map(insight => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          )}

          {/* Insights Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Инсайты и рекомендации
              </h4>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : insights.length > 0 ? (
                  insights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                    Нет новых инсайтов
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Section */}
          <div className="h-48 border-t border-gray-200 dark:border-gray-700">
            <ChatInterface workspace={currentWorkspace} />
          </div>
        </div>
      )}
    </div>
  );
});

AIPanel.displayName = 'AIPanel';

export default AIPanel;
