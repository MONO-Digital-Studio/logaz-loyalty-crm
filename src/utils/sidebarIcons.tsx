
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  HeadphonesIcon, 
  Settings, 
  Heart,
  BarChart,
  MessageSquare,
  UserCheck,
  LineChart,
  FileCheck,
  ChevronRight,
  Map,
  Store,
  Send,
  Mail,
  Database,
  FileArchive,
  AlertCircle,
  Cog,
  ShieldCheck,
  User,
  Link,
  UserRound,
  Building2,
  CreditCard,
  Receipt,
  Activity,
  Phone,
  Bot,
  TrendingUp,
  Fuel,
  DollarSign
} from 'lucide-react';

export const getIconForItem = (id: string) => {
  switch (id) {
    case 'dashboard':
    case 'le-dashboard':
      return <LayoutDashboard size={18} />;
    case 'crm':
      return <Users size={18} />;
    case 'le-clients':
      return <Building2 size={18} />;
    case 'le-fuel-cards':
      return <CreditCard size={18} />;
    case 'le-transactions':
      return <Activity size={18} />;
    case 'le-payments':
      return <Receipt size={18} />;
    case 'le-communications':
      return <Mail size={18} />;
    case 'le-support':
      return <HeadphonesIcon size={18} />;
    case 'le-analytics':
      return <TrendingUp size={18} />;
    case 'le-ai-assistant':
      return <Bot size={18} />;
    case 'le-settings':
      return <Settings size={18} />;
    case 'products':
      return <ShoppingBag size={18} />;
    case 'content':
      return <FileText size={18} />;
    case 'contact_center':
      return <HeadphonesIcon size={18} />;
    case 'loyalty':
      return <Heart size={18} />;
    case 'analytics':
      return <BarChart size={18} />;
    case 'locations':
      return <Map size={18} />;
    case 'campaigns':
      return <Mail size={18} />;
    case 'employees':
      return <UserRound size={18} />;
    case 'settings':
      return <Settings size={18} />;
    case 'system':
      return <Cog size={18} />;
    default:
      return <ChevronRight size={18} />;
  }
};

export const getIconForSubItem = (parentId: string, childId: string) => {
  const actualParentId = parentId.split('.')[0];
  const actualChildId = childId.split('.')[0];
  
  if (actualParentId === 'le-clients') {
    switch (actualChildId) {
      case 'le-clients-list':
        return <Building2 size={14} />;
      case 'le-clients-create':
        return <Building2 size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-fuel-cards') {
    switch (actualChildId) {
      case 'le-cards-list':
        return <CreditCard size={14} />;
      case 'le-cards-create':
        return <CreditCard size={14} />;
      case 'le-cards-blocked':
        return <CreditCard size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-payments') {
    switch (actualChildId) {
      case 'le-payments-invoices':
        return <Receipt size={14} />;
      case 'le-payments-history':
        return <DollarSign size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-communications') {
    switch (actualChildId) {
      case 'le-comm-email':
        return <Mail size={14} />;
      case 'le-comm-telegram':
        return <MessageSquare size={14} />;
      case 'le-comm-sms':
        return <Phone size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-support') {
    switch (actualChildId) {
      case 'le-support-tickets':
        return <HeadphonesIcon size={14} />;
      case 'le-support-create':
        return <HeadphonesIcon size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-analytics') {
    switch (actualChildId) {
      case 'le-reports-consumption':
        return <Fuel size={14} />;
      case 'le-reports-efficiency':
        return <TrendingUp size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'le-ai-assistant') {
    switch (actualChildId) {
      case 'le-ai-activity':
        return <Activity size={14} />;
      case 'le-ai-predictions':
        return <TrendingUp size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'contact_center') {
    switch (actualChildId) {
      case 'dialogs':
        return <MessageSquare size={14} />;
      case 'agents':
        return <UserCheck size={14} />;
      case 'stats':
        return <LineChart size={14} />;
      case 'templates':
        return <FileCheck size={14} />;
      case 'analytics':
        return <BarChart size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'locations') {
    switch (actualChildId) {
      case 'stores':
        return <Store size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'employees') {
    switch (actualChildId) {
      case 'list':
        return <Users size={14} />;
      case 'structure':
        return <UserCheck size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'settings') {
    switch (actualChildId) {
      case 'profile':
        return <User size={14} />;
      case 'access':
        return <ShieldCheck size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'settings.access') {
    switch (actualChildId) {
      case 'users':
        return <Users size={14} />;
      case 'roles':
        return <ShieldCheck size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (actualParentId === 'system') {
    switch (actualChildId) {
      case 'general':
        return <Settings size={14} />;
      case 'backup':
        return <FileArchive size={14} />;
      case 'logs':
        return <AlertCircle size={14} />;
      case 'maintenance':
        return <Cog size={14} />;
      case 'integrations':
        return <Link size={14} />;
      case 'locations':
        return <Store size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  }
  return null;
};
