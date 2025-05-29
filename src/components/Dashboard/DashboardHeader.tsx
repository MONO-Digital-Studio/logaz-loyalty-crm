import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, RefreshCw } from 'lucide-react';
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

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Логотип и заголовок */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-logaz-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">Л</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900"></h1>
                <p className="text-sm text-gray-500">CRM Dashboard</p>
              </div>
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Период */}
            <Select value={filters.period} onValueChange={(value: any) => setFilters({ period: value })}>
              <SelectTrigger className="w-full sm:w-32">
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
                    "w-full sm:w-[140px] justify-start text-left font-normal",
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

            {/* Сравнение */}
            <Select value={filters.comparison} onValueChange={(value: any) => setFilters({ comparison: value })}>
              <SelectTrigger className="w-full sm:w-44">
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

            {/* Станции */}
            <Select 
              value={filters.stations[0] || 'all'} 
              onValueChange={(value) => setFilters({ stations: [value] })}
            >
              <SelectTrigger className="w-full sm:w-36">
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

            {/* Обновление */}
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
