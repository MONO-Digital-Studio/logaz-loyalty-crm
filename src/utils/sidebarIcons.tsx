
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
  ChevronRight
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
  }
  return null;
};
