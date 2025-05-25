import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import ClientStats from "@/components/Clients/ClientStats";
import ClientsTable from "@/components/Clients/ClientsTable";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
const clientsData = [{
  id: "1",
  name: "Иванов Иван Иванович",
  phone: "+7 (912) 345-67-89",
  email: "ivanov@example.com",
  level: "Серебряный",
  points: 284,
  visits: 27,
  lastVisit: "15.06.2023",
  communicationChannels: {
    email: true,
    sms: true,
    telegram: false,
    push: false
  }
}, {
  id: "2",
  name: "Петрова Анна Сергеевна",
  phone: "+7 (926) 765-43-21",
  email: "petrova@example.com",
  level: "Золотой",
  points: 685,
  visits: 42,
  lastVisit: "18.06.2023",
  communicationChannels: {
    email: true,
    sms: true,
    telegram: true,
    push: true
  }
}, {
  id: "3",
  name: "Сидоров Алексей Петрович",
  phone: "+7 (905) 123-45-67",
  email: "sidorov@example.com",
  level: "Стандарт",
  points: 125,
  visits: 15,
  lastVisit: "10.06.2023",
  communicationChannels: {
    email: true,
    sms: false,
    telegram: false,
    push: false
  }
}, {
  id: "4",
  name: "Козлова Елена Владимировна",
  phone: "+7 (909) 876-54-32",
  email: "kozlova@example.com",
  level: "Платиновый",
  points: 1250,
  visits: 78,
  lastVisit: "20.06.2023",
  communicationChannels: {
    email: true,
    sms: true,
    telegram: true,
    push: false
  }
}, {
  id: "5",
  name: "Николаев Дмитрий Александрович",
  phone: "+7 (916) 543-21-98",
  email: "nikolaev@example.com",
  level: "Серебряный",
  points: 348,
  visits: 32,
  lastVisit: "12.06.2023",
  communicationChannels: {
    email: true,
    sms: true,
    telegram: false,
    push: true
  }
}];
const ClientsPage = () => {
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
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Клиенты</h1>
        <div className="flex gap-2">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
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
              <div className="grid grid-cols-[1fr_2fr]">
                <div className="border-r p-3 space-y-2">
                  {predefinedPeriods.map((period, idx) => <div key={idx} className={`p-2 hover:bg-gray-100 cursor-pointer rounded ${period.name === 'Выбрать период' ? 'font-medium text-logaz-blue' : ''}`} onClick={() => handleSelectPeriod(period.getValue)}>
                      {period.name}
                    </div>)}
                </div>
                <div>
                  <Calendar mode="range" locale={ru} selected={date} onSelect={setDate} numberOfMonths={2} className="pointer-events-auto" components={{
                  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                  IconRight: () => <ChevronRight className="h-4 w-4" />
                }} />
                  <div className="flex justify-between p-3 border-t">
                    <div className="text-sm">
                      {date.from && date.to ? <>
                          {format(date.from, 'dd.MM.yyyy', {
                        locale: ru
                      })} - {format(date.to, 'dd.MM.yyyy', {
                        locale: ru
                      })}
                        </> : null}
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
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <FileText size={18} />
            Экспорт данных
          </Button>
          <Button variant="default" className="bg-logaz-blue">
            Добавить клиента
          </Button>
        </div>
      </div>
      
      <ClientStats totalClients={2845} activeClients={1256} newClients={142} averageCheck={1850} />
      
      <div className="w-full">
        <ClientsTable clients={clientsData} />
      </div>
    </div>;
};
export default ClientsPage;
