
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
  Cog
} from 'lucide-react';

export const getIconForItem = (id: string) => {
  switch (id) {
    case 'dashboard':
      return <LayoutDashboard size={18} />;
    case 'crm':
      return <Users size={18} />;
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
    case 'settings':
      return <Settings size={18} />;
    case 'system':
      return <Cog size={18} />;
    default:
      return <ChevronRight size={18} />;
  }
};

export const getIconForSubItem = (parentId: string, childId: string) => {
  if (parentId === 'contact_center') {
    switch (childId) {
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
  } else if (parentId === 'locations') {
    switch (childId) {
      case 'stores':
        return <Store size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (parentId === 'settings') {
    switch (childId) {
      case 'profile':
        return <Users size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  } else if (parentId === 'system') {
    switch (childId) {
      case 'general':
        return <Settings size={14} />;
      case 'backup':
        return <FileArchive size={14} />;
      case 'logs':
        return <AlertCircle size={14} />;
      case 'maintenance':
        return <Cog size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  }
  return null;
};
