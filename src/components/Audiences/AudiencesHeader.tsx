
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

interface DateRange {
  from: Date;
  to?: Date;
}

interface AudiencesHeaderProps {
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

const AudiencesHeader: React.FC<AudiencesHeaderProps> = ({ date, setDate }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Аудитории</h1>
      <div className="flex gap-2">
        <DateRangePicker date={date} setDate={setDate} />
        <Button className="bg-logaz-blue">
          <Plus className="mr-2 h-4 w-4" />
          Создать аудиторию
        </Button>
      </div>
    </div>
  );
};

export default AudiencesHeader;
