
import React from 'react';
import { CorporateInsight } from '@/types/legal-entities-ai';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Shield, Truck, X, DollarSign, FileX } from 'lucide-react';
import { useLegalEntitiesAI } from '@/contexts/LegalEntitiesAIContext';

interface CorporateInsightCardProps {
  insight: CorporateInsight;
}

const CorporateInsightCard: React.FC<CorporateInsightCardProps> = ({ insight }) => {
  const { dismissInsight, executeAction } = useLegalEntitiesAI();

  const getIcon = () => {
    switch (insight.type) {
      case 'fraud_detection':
        return <Shield className="w-4 h-4" />;
      case 'cost_optimization':
        return <DollarSign className="w-4 h-4" />;
      case 'fleet_efficiency':
        return <Truck className="w-4 h-4" />;
      case 'compliance_alert':
        return <FileX className="w-4 h-4" />;
      case 'payment_risk':
        return <AlertTriangle className="w-4 h-4" />;
      case 'contract_opportunity':
        return <TrendingDown className="w-4 h-4" />;
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
    switch (insight.type) {
      case 'fraud_detection':
        return 'Расследовать';
      case 'cost_optimization':
        return 'Создать предложение';
      case 'fleet_efficiency':
        return 'Анализ парка';
      case 'compliance_alert':
        return 'Проверить соответствие';
      case 'payment_risk':
        return 'Связаться с клиентом';
      case 'contract_opportunity':
        return 'Подготовить предложение';
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
          {insight.description}
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
            {insight.priority}
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => executeAction(insight.type, insight.id)}
          >
            {getActionLabel()}
          </Button>
        </div>

        {insight.affectedCompanies.length > 0 && (
          <div className="text-xs text-gray-500 mb-1">
            Затронуто компаний: {insight.affectedCompanies.length}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          {insight.timestamp.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CorporateInsightCard;
