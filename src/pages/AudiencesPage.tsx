
import React from 'react';
import AudienceStats from '@/components/Audiences/AudienceStats';
import AudiencesHeader from '@/components/Audiences/AudiencesHeader';
import AudiencesTable from '@/components/Audiences/AudiencesTable';
import { getAudienceStats } from '@/data/audiencesData';
import { useAudienceSearch } from '@/hooks/useAudienceSearch';
import { useDateRangeSelection } from '@/hooks/useDateRangeSelection';

const AudiencesPage: React.FC = () => {
  const { date, setDate } = useDateRangeSelection();
  const { searchQuery, filteredAudiences, handleSearch } = useAudienceSearch();
  const stats = getAudienceStats();

  return (
    <div className="space-y-6">
      <AudiencesHeader date={date} setDate={setDate} />

      <AudienceStats 
        totalAudiences={stats.totalAudiences} 
        totalContacts={stats.totalContacts} 
        activeAudiences={stats.activeAudiences} 
        averageSize={stats.averageSize}
      />

      <div className="grid grid-cols-1 gap-6">
        <AudiencesTable 
          audiences={filteredAudiences}
          searchQuery={searchQuery} 
          onSearchChange={handleSearch} 
        />
      </div>
    </div>
  );
};

export default AudiencesPage;
