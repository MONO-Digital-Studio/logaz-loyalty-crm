
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LegalEntity, FuelCard, Transaction, Payment, SupportTicket, DashboardMetrics } from '@/types/legal-entities';

interface LegalEntitiesContextType {
  legalEntities: LegalEntity[];
  fuelCards: FuelCard[];
  transactions: Transaction[];
  payments: Payment[];
  supportTickets: SupportTicket[];
  dashboardMetrics: DashboardMetrics;
  isLoading: boolean;
  addLegalEntity: (entity: Omit<LegalEntity, 'id' | 'createdAt'>) => void;
  updateLegalEntity: (id: string, updates: Partial<LegalEntity>) => void;
  deleteLegalEntity: (id: string) => void;
  addFuelCard: (card: Omit<FuelCard, 'id' | 'issueDate'>) => void;
  updateFuelCard: (id: string, updates: Partial<FuelCard>) => void;
  blockFuelCard: (id: string) => void;
  unblockFuelCard: (id: string) => void;
}

const LegalEntitiesContext = createContext<LegalEntitiesContextType | undefined>(undefined);

export const useLegalEntities = () => {
  const context = useContext(LegalEntitiesContext);
  if (!context) {
    throw new Error('useLegalEntities must be used within a LegalEntitiesProvider');
  }
  return context;
};

// Mock данные для демонстрации
const mockLegalEntities: LegalEntity[] = [
  {
    id: '1',
    companyName: 'ООО "Транспортная компания Логистик"',
    inn: '7707123456',
    kpp: '770701001',
    address: 'г. Москва, ул. Транспортная, д. 15',
    contacts: [
      {
        id: '1',
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор',
        email: 'ivanov@logistic.ru',
        phone: '+7 (495) 123-45-67',
        isPrimary: true,
      },
    ],
    balance: 250000,
    overdraft: 50000,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    contractNumber: 'ДГ-2024-001',
    email: 'info@logistic.ru',
    phone: '+7 (495) 123-45-67',
  },
  {
    id: '2',
    companyName: 'АО "Грузовые перевозки Север"',
    inn: '7807234567',
    kpp: '780701001',
    address: 'г. Санкт-Петербург, пр. Промышленный, д. 42',
    contacts: [
      {
        id: '2',
        name: 'Петров Петр Петрович',
        position: 'Директор по закупкам',
        email: 'petrov@sever-cargo.ru',
        phone: '+7 (812) 234-56-78',
        isPrimary: true,
      },
    ],
    balance: 180000,
    overdraft: 30000,
    status: 'active',
    createdAt: new Date('2024-02-20'),
    contractNumber: 'ДГ-2024-002',
    email: 'info@sever-cargo.ru',
    phone: '+7 (812) 234-56-78',
  },
];

const mockFuelCards: FuelCard[] = [
  {
    id: '1',
    cardNumber: '4001234567890123',
    driverId: 'DRV001',
    driverName: 'Сидоров Алексей Владимирович',
    vehicleNumber: 'А123БВ777',
    vehicleModel: 'КАМАЗ-5490',
    status: 'active',
    dailyLimit: 5000,
    monthlyLimit: 150000,
    balance: 45000,
    legalEntityId: '1',
    issueDate: new Date('2024-01-20'),
    fuelTypes: ['ДТ', 'АИ-92', 'АИ-95'],
  },
  {
    id: '2',
    cardNumber: '4001234567890124',
    driverId: 'DRV002',
    driverName: 'Козлов Дмитрий Сергеевич',
    vehicleNumber: 'В456ГД199',
    vehicleModel: 'MAN TGX',
    status: 'active',
    dailyLimit: 6000,
    monthlyLimit: 180000,
    balance: 52000,
    legalEntityId: '1',
    issueDate: new Date('2024-01-25'),
    fuelTypes: ['ДТ'],
  },
];

interface LegalEntitiesProviderProps {
  children: React.ReactNode;
}

export const LegalEntitiesProvider: React.FC<LegalEntitiesProviderProps> = ({ children }) => {
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>(mockLegalEntities);
  const [fuelCards, setFuelCards] = useState<FuelCard[]>(mockFuelCards);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dashboardMetrics: DashboardMetrics = {
    totalBalance: legalEntities.reduce((sum, entity) => sum + entity.balance, 0),
    activeCards: fuelCards.filter(card => card.status === 'active').length,
    totalFuelVolume: 125000, // mock данные
    monthlyExpenses: 485000,
    transactionsToday: 23,
    blockedCards: fuelCards.filter(card => card.status === 'blocked').length,
  };

  const addLegalEntity = (entityData: Omit<LegalEntity, 'id' | 'createdAt'>) => {
    const newEntity: LegalEntity = {
      ...entityData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setLegalEntities(prev => [...prev, newEntity]);
  };

  const updateLegalEntity = (id: string, updates: Partial<LegalEntity>) => {
    setLegalEntities(prev =>
      prev.map(entity => (entity.id === id ? { ...entity, ...updates } : entity))
    );
  };

  const deleteLegalEntity = (id: string) => {
    setLegalEntities(prev => prev.filter(entity => entity.id !== id));
  };

  const addFuelCard = (cardData: Omit<FuelCard, 'id' | 'issueDate'>) => {
    const newCard: FuelCard = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9),
      issueDate: new Date(),
    };
    setFuelCards(prev => [...prev, newCard]);
  };

  const updateFuelCard = (id: string, updates: Partial<FuelCard>) => {
    setFuelCards(prev =>
      prev.map(card => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const blockFuelCard = (id: string) => {
    updateFuelCard(id, { status: 'blocked' });
  };

  const unblockFuelCard = (id: string) => {
    updateFuelCard(id, { status: 'active' });
  };

  return (
    <LegalEntitiesContext.Provider
      value={{
        legalEntities,
        fuelCards,
        transactions,
        payments,
        supportTickets,
        dashboardMetrics,
        isLoading,
        addLegalEntity,
        updateLegalEntity,
        deleteLegalEntity,
        addFuelCard,
        updateFuelCard,
        blockFuelCard,
        unblockFuelCard,
      }}
    >
      {children}
    </LegalEntitiesContext.Provider>
  );
};
