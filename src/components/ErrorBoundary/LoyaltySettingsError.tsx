
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface LoyaltySettingsErrorProps {
  error?: Error;
  resetError?: () => void;
}

const LoyaltySettingsError: React.FC<LoyaltySettingsErrorProps> = ({ 
  error, 
  resetError 
}) => {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <CardTitle className="text-red-800">
            Ошибка загрузки настроек программы лояльности
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-red-700">
          Произошла ошибка при загрузке или обработке настроек программы лояльности. 
          Пожалуйста, попробуйте обновить страницу или обратитесь к администратору.
        </p>
        
        {error && (
          <details className="text-sm text-red-600">
            <summary className="cursor-pointer font-medium">
              Техническая информация
            </summary>
            <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="flex space-x-2">
          {resetError && (
            <Button 
              variant="outline" 
              onClick={resetError}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Попробовать снова
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            Обновить страницу
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltySettingsError;
