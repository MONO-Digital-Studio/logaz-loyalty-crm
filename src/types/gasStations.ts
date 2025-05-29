
export interface GasStationData {
  id: string;
  name: string;
  operations: number;
  volume: {
    total: number;
    ai92: number;
    ai95: number;
    ai98: number;
    diesel: number;
  };
  sales: {
    total: number;
    fuel: {
      total: number;
      ai92: number;
      ai95: number;
      ai98: number;
      diesel: number;
    };
    market: number;
  };
  averageCheck: {
    total: number;
    fuel: {
      total: number;
      ai92: number;
      ai95: number;
      ai98: number;
      diesel: number;
    };
    market: number;
  };
  pointsEarned: number;
  pointsSpent: number;
  giftsGiven: number;
  uniqueCustomers: number;
}

export interface GasStationFilters {
  search: string;
  region?: string;
  status?: string;
}
