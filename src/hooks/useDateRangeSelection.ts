
import { useState } from 'react';

export interface DateRange {
  from: Date;
  to?: Date;
}

export function useDateRangeSelection(initialDate?: DateRange) {
  const today = new Date();
  const [date, setDate] = useState<DateRange>(
    initialDate || {
      from: today,
      to: today,
    }
  );
  
  return {
    date,
    setDate,
  };
}
