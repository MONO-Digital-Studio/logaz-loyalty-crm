
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Brain, Users, X } from 'lucide-react';
import { LoyaltyInsight } from '@/types/individuals-ai';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';

interface InsightCardProps {
  insight: LoyaltyInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const { dismissInsight } = useIndividualsAI();

  const getIcon = () => {
    switch (insight.type) {
      case 'churn_risk':
        return <AlertTriangle className="w-4 h-4" />;
      case 'points_expiring':
        return <TrendingDown className="w-4 h-4" />;
      case 'engagement_opportunity':
        return <Brain className="w-4 h-4" />;
      case 'vip_upgrade':
        return <Users className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = () => {
    switch (insight.priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  const getImpactColor = (value: number) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <Card className="relative border-l-4 border-l-logaz-orange">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getPriorityColor()}`}>
              {getIcon()}
            </div>
            <div className="ml-3 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {insight.title}
              </h4>
              <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
                {insight.priority === 'critical' ? 'Критично' : 
                 insight.priority === 'high' ? 'Высокий' :
                 insight.priority === 'medium' ? 'Средний' : 'Низкий'}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => dismissInsight(insight.id)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {insight.description}
        </p>
        
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Затронуто клиентов: <span className="font-medium">{insight.affectedClients}</span>
            </span>
          </div>
        </div>

        {/* Влияние на бизнес */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
          <div className="text-center">
            <div className={`font-medium ${getImpactColor(insight.impact.revenue)}`}>
              {insight.impact.revenue > 0 ? '+' : ''}{insight.impact.revenue.toLocaleString()}₽
            </div>
            <div className="text-gray-500 text-xs">Выручка</div>
          </div>
          <div className="text-center">
            <div className={`font-medium ${getImpactColor(insight.impact.retention)}`}>
              {insight.impact.retention > 0 ? '+' : ''}{insight.impact.retention}%
            </div>
            <div className="text-gray-500 text-xs">Удержание</div>
          </div>
          <div className="text-center">
            <div className={`font-medium ${getImpactColor(insight.impact.satisfaction)}`}>
              {insight.impact.satisfaction > 0 ? '+' : ''}{insight.impact.satisfaction}%
            </div>
            <div className="text-gray-500 text-xs">Лояльность</div>
          </div>
        </div>

        {/* Рекомендуемые действия */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Рекомендации:</div>
          {insight.suggestedActions.slice(0, 2).map((action, index) => (
            <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
              <span className="w-1 h-1 bg-logaz-orange rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
              {action}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="h-7 text-xs px-3 flex-1">
            Подробнее
          </Button>
          <Button size="sm" className="h-7 text-xs px-3 bg-logaz-orange hover:bg-logaz-orange/90">
            Выполнить
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 text-right">
          {insight.timestamp.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
