
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { stationOptions } from '@/data/dashboardMockData';
import { useDashboardStore } from '@/stores/dashboardStore';

const StationFilter: React.FC = () => {
  const { filters, setFilters } = useDashboardStore();

  const handleStationChange = (stationValue: string, checked: boolean) => {
    const currentStations = filters.stations || [];
    
    if (stationValue === 'all') {
      if (checked) {
        setFilters({ stations: ['all'] });
      } else {
        setFilters({ stations: [] });
      }
    } else {
      let newStations;
      if (checked) {
        // Убираем "all" если выбираем конкретную станцию
        newStations = currentStations.filter(s => s !== 'all').concat(stationValue);
      } else {
        newStations = currentStations.filter(s => s !== stationValue);
      }
      setFilters({ stations: newStations });
    }
  };

  const getSelectedStationsLabel = () => {
    const selectedStations = filters.stations || [];
    if (selectedStations.includes('all') || selectedStations.length === 0) {
      return 'Все станции';
    }
    if (selectedStations.length === 1) {
      const station = stationOptions.find(opt => opt.value === selectedStations[0]);
      return station?.label || 'Станция';
    }
    return `Выбрано: ${selectedStations.length}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-36 justify-between">
          {getSelectedStationsLabel()}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        {stationOptions.map(option => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={
              option.value === 'all' 
                ? filters.stations.includes('all') || filters.stations.length === 0
                : filters.stations.includes(option.value)
            }
            onCheckedChange={(checked) => handleStationChange(option.value, checked)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StationFilter;
