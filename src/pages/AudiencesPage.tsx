
import React, { useState } from 'react';
import AudienceStats from '@/components/Audiences/AudienceStats';
import AudiencesHeader from '@/components/Audiences/AudiencesHeader';
import AudiencesTable from '@/components/Audiences/AudiencesTable';
import { audiencesData, getAudienceStats } from '@/data/audiencesData';

const AudiencesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAudiences, setFilteredAudiences] = useState(audiencesData);
  
  const today = new Date();
  const [date, setDate] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: today,
    to: today,
  });
  
  const stats = getAudienceStats();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      const filtered = audiencesData.filter(audience => 
        audience.name.toLowerCase().includes(query) || 
        audience.description.toLowerCase().includes(query)
      );
      setFilteredAudiences(filtered);
    } else {
      setFilteredAudiences(audiencesData);
    }
  };

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
