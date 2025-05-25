
import React, { useState } from 'react';
import StatsSummary from '@/components/Dashboard/StatsSummary';
import SalesChart from '@/components/Dashboard/SalesChart';
import LoyaltyPointsChart from '@/components/Dashboard/LoyaltyPointsChart';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import CustomerDemographics from '@/components/Dashboard/CustomerDemographics';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardPage: React.FC = () => {
  const today = new Date();
  const [date, setDate] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: today,
    to: today,
  });
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Предопределенные периоды
  const predefinedPeriods = [
    { name: 'Сегодня', getValue: () => ({ from: today, to: today }) },
    { name: 'Вчера', getValue: () => ({ from: addDays(today, -1), to: addDays(today, -1) }) },
    { name: 'Последние 7 Дней', getValue: () => ({ from: addDays(today, -6), to: today }) },
    { name: 'Последние 30 Дней', getValue: () => ({ from: addDays(today, -29), to: today }) },
    { name: 'Этот месяц', getValue: () => {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: start, to: today };
    }},
    { name: 'Прошлый месяц', getValue: () => {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: start, to: end };
    }},
    { name: 'Выбрать период', getValue: () => date }
  ];
  
  const handleSelectPeriod = (periodFn: () => { from: Date; to?: Date }) => {
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

  return (
    <div className="w-full h-full">
      <div className="w-full h-full px-4 py-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-2xl lg:text-3xl font-syncopate font-bold">Аналитика</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd.MM.yyyy', { locale: ru })} - {format(date.to, 'dd.MM.yyyy', { locale: ru })}
                      </>
                    ) : (
                      format(date.from, 'dd.MM.yyyy', { locale: ru })
                    )
                  ) : (
                    <span>Выберите период</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="grid grid-cols-[1fr_2fr]">
                  <div className="border-r p-3 space-y-2">
                    {predefinedPeriods.map((period, idx) => (
                      <div
                        key={idx}
                        className={`p-2 hover:bg-gray-100 cursor-pointer rounded ${
                          period.name === 'Выбрать период' ? 'font-medium text-logaz-blue' : ''
                        }`}
                        onClick={() => handleSelectPeriod(period.getValue)}
                      >
                        {period.name}
                      </div>
                    ))}
                  </div>
                  <div>
                    <Calendar
                      mode="range"
                      locale={ru}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                      components={{
                        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                        IconRight: () => <ChevronRight className="h-4 w-4" />,
                      }}
                    />
                    <div className="flex justify-between p-3 border-t">
                      <div className="text-sm">
                        {date.from && date.to ? (
                          <>
                            {format(date.from, 'dd.MM.yyyy', { locale: ru })} - {format(date.to, 'dd.MM.yyyy', { locale: ru })}
                          </>
                        ) : null}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>Отмена</Button>
                        <Button className="bg-logaz-blue" size="sm" onClick={handleApply}>Применить</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <button className="btn-primary whitespace-nowrap">Экспорт</button>
          </div>
        </div>

        <StatsSummary />

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          <SalesChart />
          <LoyaltyPointsChart />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          <RfmAnalysis />
          <CustomerDemographics />
        </div>
        
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default DashboardPage;
