
export interface Audience {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
  lastUpdated: string;
}

// Тестовые данные для аудиторий
export const audiencesData: Audience[] = [
  { 
    id: "1", 
    name: "VIP клиенты", 
    description: "Клиенты с высоким LTV", 
    count: 145,
    createdAt: "12.03.2023",
    lastUpdated: "28.06.2023" 
  },
  { 
    id: "2", 
    name: "Новые клиенты", 
    description: "Клиенты, присоединившиеся за последние 30 дней", 
    count: 278,
    createdAt: "05.05.2023",
    lastUpdated: "27.06.2023" 
  },
  { 
    id: "3", 
    name: "Спящие клиенты", 
    description: "Не совершали покупки более 90 дней", 
    count: 342,
    createdAt: "18.01.2023",
    lastUpdated: "15.06.2023" 
  },
  { 
    id: "4", 
    name: "Активные пользователи", 
    description: "Совершили более 3 покупок за 60 дней", 
    count: 203,
    createdAt: "22.04.2023",
    lastUpdated: "25.06.2023" 
  },
  { 
    id: "5", 
    name: "Потенциальные лояльные", 
    description: "Совершили 2 покупки за последние 45 дней", 
    count: 167,
    createdAt: "30.05.2023",
    lastUpdated: "20.06.2023" 
  }
];

export const getAudienceStats = () => {
  return {
    totalAudiences: audiencesData.length,
    totalContacts: audiencesData.reduce((total, audience) => total + audience.count, 0),
    activeAudiences: 3,
    averageSize: Math.round(audiencesData.reduce((total, audience) => total + audience.count, 0) / audiencesData.length)
  };
};
