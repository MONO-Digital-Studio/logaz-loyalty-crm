
import { useState, useEffect } from 'react';
import { Audience, audiencesData } from '@/data/audiencesData';

export function useAudienceSearch(initialQuery: string = '') {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredAudiences, setFilteredAudiences] = useState<Audience[]>(audiencesData);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = audiencesData.filter(audience => 
        audience.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        audience.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAudiences(filtered);
    } else {
      setFilteredAudiences(audiencesData);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return {
    searchQuery,
    filteredAudiences,
    handleSearch,
  };
}
