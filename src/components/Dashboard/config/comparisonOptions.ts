
import { ComparisonType } from '@/types/dashboardComparison';

export interface ComparisonOption {
  value: ComparisonType;
  label: string;
}

export const comparisonOptions: ComparisonOption[] = [
  { value: 'D/D', label: 'День к дню' },
  { value: 'W/W', label: 'Неделя к неделе' },
  { value: 'M/M', label: 'Месяц к месяцу' },
  { value: 'Q/Q', label: 'Квартал к кварталу' },
  { value: 'Y/Y', label: 'Год к году' }
];

export const getComparisonLabel = (type: ComparisonType): string => {
  switch (type) {
    case 'D/D':
      return 'день к дню';
    case 'W/W':
      return 'неделя к неделе';
    case 'M/M':
      return 'месяц к месяцу';
    case 'Q/Q':
      return 'квартал к кварталу';
    case 'Y/Y':
      return 'год к году';
    default:
      return 'период к периоду';
  }
};
