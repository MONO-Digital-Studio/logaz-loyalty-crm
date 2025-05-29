
import { useState, useMemo } from 'react';
import { gasStationsData } from '@/data/gasStationsData';
import { GasStationData, GasStationFilters } from '@/types/gasStations';

export const useGasStationsData = () => {
  const [filters, setFilters] = useState<GasStationFilters>({ search: '' });
  const [loading, setLoading] = useState(false);

  const filteredData = useMemo(() => {
    let result = [...gasStationsData];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(station =>
        station.name.toLowerCase().includes(searchLower)
      );
    }

    if (filters.region && filters.region !== 'all') {
      // В реальном приложении здесь была бы фильтрация по региону
    }

    if (filters.status && filters.status !== 'all') {
      // В реальном приложении здесь была бы фильтрация по статусу
    }

    return result;
  }, [filters]);

  const updateFilter = (key: keyof GasStationFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '' });
  };

  // Агрегированные показатели
  const totals = useMemo(() => {
    return filteredData.reduce((acc, station) => ({
      operations: acc.operations + station.operations,
      volume: acc.volume + station.volume.total,
      sales: acc.sales + station.sales.total,
      pointsEarned: acc.pointsEarned + station.pointsEarned,
      pointsSpent: acc.pointsSpent + station.pointsSpent,
      giftsGiven: acc.giftsGiven + station.giftsGiven,
      uniqueCustomers: acc.uniqueCustomers + station.uniqueCustomers,
    }), {
      operations: 0,
      volume: 0,
      sales: 0,
      pointsEarned: 0,
      pointsSpent: 0,
      giftsGiven: 0,
      uniqueCustomers: 0,
    });
  }, [filteredData]);

  return {
    data: filteredData,
    totals,
    filters,
    loading,
    updateFilter,
    clearFilters,
  };
};
