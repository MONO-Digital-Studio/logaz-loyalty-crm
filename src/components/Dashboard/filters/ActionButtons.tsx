
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { formatTime } from '@/utils/dashboardFormatters';

const ActionButtons: React.FC = () => {
  const { lastUpdate, setLastUpdate } = useDashboardStore();

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleExport = () => {
    console.log('Экспорт данных...');
    // Здесь будет логика экспорта
  };

  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      {/* Кнопка Экспорт */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Экспорт
      </Button>

      {/* Информация об обновлении */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Обновлено: {formatTime(lastUpdate)}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
