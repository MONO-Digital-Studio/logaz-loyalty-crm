
export interface LegalEntity {
  id: string;
  companyName: string;
  inn: string;
  kpp: string;
  address: string;
  contacts: Contact[];
  balance: number;
  overdraft: number;
  status: 'active' | 'suspended' | 'blocked';
  createdAt: Date;
  contractNumber?: string;
  email: string;
  phone: string;
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface FuelCard {
  id: string;
  cardNumber: string;
  driverId: string;
  driverName: string;
  vehicleNumber: string;
  vehicleModel?: string;
  status: 'active' | 'suspended' | 'blocked';
  dailyLimit: number;
  monthlyLimit: number;
  balance: number;
  legalEntityId: string;
  issueDate: Date;
  expiryDate?: Date;
  fuelTypes: string[];
}

export interface Transaction {
  id: string;
  cardNumber: string;
  driverName: string;
  vehicleNumber: string;
  amount: number;
  volume: number;
  fuelType: string;
  stationName: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  legalEntityId: string;
}

export interface Payment {
  id: string;
  legalEntityId: string;
  invoiceNumber: string;
  amount: number;
  status: 'issued' | 'paid' | 'overdue' | 'cancelled';
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  description: string;
  contractNumber: string;
}

export interface SupportTicket {
  id: string;
  legalEntityId: string;
  title: string;
  description: string;
  category: 'cards' | 'payment' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
}

export type WorkspaceType = 'individuals' | 'legal-entities';

export interface DashboardMetrics {
  totalBalance: number;
  activeCards: number;
  totalFuelVolume: number;
  monthlyExpenses: number;
  transactionsToday: number;
  blockedCards: number;
}
