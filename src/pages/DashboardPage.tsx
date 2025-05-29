import React, { useState } from 'react';
import { OptimizedSalesChart, VolumeChart } from '@/components/Dashboard/charts';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';
import KPIOverview from '@/components/Dashboard/KPIOverview';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardPeriodComparison from '@/components/Dashboard/DashboardPeriodComparison';

const DashboardPage: React.FC = () => {
  const {
    loading,
    refreshData
  } = useDashboardData();
  const today = new Date();
  const [date, setDate] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: today,
    to: today
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Предопределенные периоды
  const predefinedPeriods = [{
    name: 'Сегодня',
    getValue: () => ({
      from: today,
      to: today
    })
  }, {
    name: 'Вчера',
    getValue: () => ({
      from: addDays(today, -1),
      to: addDays(today, -1)
    })
  }, {
    name: 'Последние 7 Дней',
    getValue: () => ({
      from: addDays(today, -6),
      to: today
    })
  }, {
    name: 'Последние 30 Дней',
    getValue: () => ({
      from: addDays(today, -29),
      to: today
    })
  }, {
    name: 'Этот месяц',
    getValue: () => {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        from: start,
        to: today
      };
    }
  }, {
    name: 'Прошлый месяц',
    getValue: () => {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return {
        from: start,
        to: end
      };
    }
  }, {
    name: 'Выбрать период',
    getValue: () => date
  }];
  const handleSelectPeriod = (periodFn: () => {
    from: Date;
    to?: Date;
  }) => {
    const newDate = periodFn();
    setDate(newDate);
    setIsCalendarOpen(false);
  };
  const handleApply = () => {
    setIsCalendarOpen(false);
  };
  const handleCancel = () => {
    setIsCalendarOpen(false);
  };
  if (loading) {
    return <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Загрузка данных...</span>
        </div>
      </div>;
  }
  return <div className="h-full overflow-auto">
      <div className="p-4 lg:p-6 space-y-6 min-h-full">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl lg:text-3xl font-syncopate font-bold">Розничные клиенты</h1>
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-3">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full sm:w-[280px] lg:w-[300px] justify-start text-left font-normal text-sm", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from ? date.to ? <>
                        {format(date.from, 'dd.MM.yyyy', {
                    locale: ru
                  })} - {format(date.to, 'dd.MM.yyyy', {
                    locale: ru
                  })}
                      </> : format(date.from, 'dd.MM.yyyy', {
                  locale: ru
                }) : <span>Выберите период</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                  <div className="border-r p-3 space-y-2">
                    {predefinedPeriods.map((period, idx) => <div key={idx} className={`p-2 hover:bg-gray-100 cursor-pointer rounded text-sm ${period.name === 'Выбрать период' ? 'font-medium text-logaz-blue' : ''}`} onClick={() => handleSelectPeriod(period.getValue)}>
                        {period.name}
                      </div>)}
                  </div>
                  <div>
                    <Calendar mode="range" locale={ru} selected={date} onSelect={setDate} numberOfMonths={window.innerWidth >= 1024 ? 2 : 1} className="pointer-events-auto" components={{
                    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                    IconRight: () => <ChevronRight className="h-4 w-4" />
                  }} />
                    <div className="flex flex-col sm:flex-row sm:justify-between p-3 border-t gap-2">
                      <div className="text-xs sm:text-sm">
                        {date.from && date.to ? <>
                            {format(date.from, 'dd.MM.yyyy', {
                          locale: ru
                        })} - {format(date.to, 'dd.MM.yyyy', {
                          locale: ru
                        })}
                          </> : null}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel} className="text-xs">Отмена</Button>
                        <Button className="bg-logaz-blue text-xs" size="sm" onClick={handleApply}>Применить</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <button className="btn-primary whitespace-nowrap text-sm px-3 py-2 flex items-center gap-2" onClick={refreshData}>
              <RefreshCw className="w-4 h-4" />
              Обновить
            </button>
            <button className="btn-primary whitespace-nowrap text-sm px-3 py-2">Экспорт</button>
          </div>
        </div>

        <KPIOverview />

        <OptimizedSalesChart />

        <PerformanceMetrics />

        <DashboardPeriodComparison />

        {/* Volume Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeChart />
          <div>
            {/* Placeholder for VolumeTable - will be added when component is imported */}
          </div>
        </div>

        <RfmAnalysis />
      </div>
    </div>;
};
export default DashboardPage;
