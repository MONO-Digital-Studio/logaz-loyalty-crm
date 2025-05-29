import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, ChevronRight, CalendarIcon, ChevronLeft } from 'lucide-react';
import RfmAnalysis from '@/components/Dashboard/RfmAnalysis';
import ClientStats from '@/components/Clients/ClientStats';
import { BarChart } from '@/components/ui/charts';
import CustomerSegments from '@/components/Clients/CustomerSegments';
import ClientRetention from '@/components/Clients/ClientRetention';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const CrmPage: React.FC = () => {
  const navigate = useNavigate();
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

  const segmentData = [
    { name: 'VIP', value: 15 },
    { name: 'Активные', value: 42 },
    { name: 'Случайные', value: 28 },
    { name: 'Спящие', value: 15 }
  ];

  const retentionData = [
    { month: 'Янв', retention: 89 },
    { month: 'Фев', retention: 92 },
    { month: 'Мар', retention: 87 },
    { month: 'Апр', retention: 91 },
    { month: 'Май', retention: 84 },
    { month: 'Июн', retention: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <div className="flex gap-2">
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
          <Button className="bg-logaz-blue" onClick={() => navigate('/crm/clients')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Добавить клиента
          </Button>
        </div>
      </div>

      <ClientStats 
        totalClients={2845} 
        activeClients={1256} 
        newClients={142} 
        averageCheck={1850}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RfmAnalysis />
        <CustomerSegments data={segmentData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClientRetention data={retentionData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Частота покупок</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart 
              data={[
                { name: '1 раз', purchases: 35 },
                { name: '2-5 раз', purchases: 42 },
                { name: '6-10 раз', purchases: 18 },
                { name: '11+ раз', purchases: 5 }
              ]}
              index="name"
              categories={["purchases"]}
              colors={["#3B55A2"]}
              valueFormatter={(value) => `${value}%`}
              showXAxis={true}
              showYAxis={true}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="hover:bg-accent/50 transition-colors cursor-pointer" 
            onClick={() => navigate('/crm/clients')}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Управление клиентами</CardTitle>
          <Users className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Управление базой клиентов, история заказов и коммуникаций
          </p>
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrmPage;
