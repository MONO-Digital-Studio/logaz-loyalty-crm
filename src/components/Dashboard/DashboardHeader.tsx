
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, RefreshCw, Download } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { formatTime } from '@/utils/dashboardFormatters';
import { periodOptions, comparisonOptions, stationOptions } from '@/data/dashboardMockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const DashboardHeader: React.FC = () => {
  const { filters, lastUpdate, setFilters, setLastUpdate } = useDashboardStore();
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    filters.startDate ? new Date(filters.startDate) : undefined
  );

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFilters({
        startDate: date.toISOString().split('T')[0],
        endDate: date.toISOString().split('T')[0]
      });
    }
    setDatePickerOpen(false);
  };

  const handleExport = () => {
    console.log('Экспорт данных...');
    // Здесь будет логика экспорта
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        {/* Одна строка с равномерным распределением всех элементов */}
        <div className="flex items-center justify-between gap-3 w-full">
          
          {/* Левая группа - Сравнение */}
          <div className="flex-shrink-0">
            <Select value={filters.comparison} onValueChange={(value: any) => setFilters({ comparison: value })}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Сравнить с" />
              </SelectTrigger>
              <SelectContent>
                {comparisonOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Центральная группа - Период, Дата и Станция */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            {/* Период */}
            <Select value={filters.period} onValueChange={(value: any) => setFilters({ period: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Дата */}
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  locale={ru}
                />
              </PopoverContent>
            </Popover>

            {/* Станция */}
            <Select 
              value={filters.stations[0] || 'all'} 
              onValueChange={(value) => setFilters({ stations: [value] })}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Станция" />
              </SelectTrigger>
              <SelectContent>
                {stationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Правая группа - Кнопка Экспорт, Обновление */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
