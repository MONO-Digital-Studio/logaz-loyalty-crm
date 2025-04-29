
import React from 'react';
import { Users, Target, ListFilter, LineChart } from 'lucide-react';
import StatsCard from '@/components/UI/StatsCard';

interface AudienceStatsProps {
  totalAudiences: number;
  totalContacts: number;
  activeAudiences: number;
  averageSize: number;
}

const AudienceStats: React.FC<AudienceStatsProps> = ({
  totalAudiences,
  totalContacts,
  activeAudiences,
  averageSize,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Всего аудиторий"
        value={totalAudiences}
        icon={<ListFilter className="h-5 w-5 text-logaz-blue" />}
        color="bg-logaz-blue"
      />
      <StatsCard
        title="Всего контактов"
        value={totalContacts}
        change={8}
        changeText="за 30 дней"
        icon={<Users className="h-5 w-5 text-green-600" />}
        color="bg-green-600"
      />
      <StatsCard
        title="Активные аудитории"
        value={activeAudiences}
        icon={<Target className="h-5 w-5 text-orange-500" />}
        color="bg-orange-500"
      />
      <StatsCard
        title="Средний размер"
        value={averageSize}
        change={-3}
        changeText="за 30 дней"
        icon={<LineChart className="h-5 w-5 text-purple-600" />}
        color="bg-purple-600"
      />
    </div>
  );
};

export default AudienceStats;
