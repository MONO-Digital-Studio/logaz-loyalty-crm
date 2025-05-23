
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRange {
  from: Date;
  to?: Date;
}

interface DateRangePickerProps {
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ date, setDate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  
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
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className={cn(
            "w-[300px] justify-start text-left font-normal",
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
  );
};

export default DateRangePicker;
