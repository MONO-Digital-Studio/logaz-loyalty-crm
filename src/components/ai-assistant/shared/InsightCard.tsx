
import React, { memo } from 'react';
import { AIInsight } from '@/types/ai';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Shield, Truck, X } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';

interface InsightCardProps {
  insight: AIInsight;
}

const InsightCard: React.FC<InsightCardProps> = memo(({ insight }) => {
  const { dismissInsight, executeAction } = useAI();

  const getIcon = () => {
    switch (insight.type) {
      case 'loyalty_analysis':
        return <TrendingDown className="w-4 h-4" />;
      case 'churn_prediction':
        return <AlertTriangle className="w-4 h-4" />;
      case 'fraud_detection':
        return <Shield className="w-4 h-4" />;
      case 'fleet_optimization':
        return <Truck className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = () => {
    switch (insight.priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getActionLabel = () => {
    switch (insight.action) {
      case 'create_retention_campaign':
        return 'Создать кампанию';
      case 'personalized_offers':
        return 'Персональные предложения';
      case 'investigate_immediately':
        return 'Расследовать';
      case 'schedule_consultation':
        return 'Запланировать консультацию';
      case 'contact_client':
        return 'Связаться с клиентом';
      default:
        return 'Выполнить действие';
    }
  };

  return (
    <Card className="relative">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className={`p-1 rounded ${getPriorityColor()}`}>
              {getIcon()}
            </div>
            <div className="ml-2 flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {insight.title}
              </h4>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => dismissInsight(insight.id)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {insight.message}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
            {insight.priority}
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => executeAction(insight.action, insight.id)}
          >
            {getActionLabel()}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {insight.timestamp.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
});

InsightCard.displayName = 'InsightCard';

export default InsightCard;
