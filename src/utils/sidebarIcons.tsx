import React from 'react';
import { 
  LayoutDashboard, 
  Fuel,
  Heart, 
  FileText, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  UserCheck, 
  Settings, 
  Monitor,
  Edit,
  Target,
  PhoneCall,
  Bot,
  BarChart3,
  Mail,
  List
} from 'lucide-react';

export const getIconForItem = (id: string, collapsed: boolean = false) => {
  const iconSize = collapsed ? 20 : 18;
  
  switch (id) {
    case 'dashboard':
      return <LayoutDashboard size={iconSize} />;
    case 'gas-stations':
      return <Fuel size={iconSize} />;
    case 'loyalty':
      return <Heart size={iconSize} />;
    case 'content':
      return <FileText size={iconSize} />;
    case 'crm':
      return <Users size={iconSize} />;
    case 'contact-center':
      return <MessageSquare size={iconSize} />;
    case 'products':
      return <ShoppingCart size={iconSize} />;
    case 'employees':
      return <UserCheck size={iconSize} />;
    case 'settings':
      return <Settings size={iconSize} />;
    case 'system':
      return <Monitor size={iconSize} />;
    default:
      return <LayoutDashboard size={iconSize} />;
  }
};

export const getIconForSubItem = (parentId: string, childId: string) => {
  switch (parentId) {
    case 'content':
      if (childId === 'content-list') return <List size={16} />;
      if (childId === 'content-editor') return <Edit size={16} />;
      break;
    case 'crm':
      if (childId === 'clients') return <Users size={16} />;
      if (childId === 'audiences') return <Target size={16} />;
      break;
    case 'contact-center':
      if (childId === 'dialogs') return <MessageSquare size={16} />;
      if (childId === 'agents') return <Bot size={16} />;
      if (childId === 'campaigns') return <Mail size={16} />;
      if (childId === 'stats') return <BarChart3 size={16} />;
      if (childId === 'templates') return <FileText size={16} />;
      if (childId === 'analytics') return <BarChart3 size={16} />;
      break;
    case 'employees':
      if (childId === 'employees-list') return <List size={16} />;
      if (childId === 'employees-structure') return <BarChart3 size={16} />;
      break;
  }
  return null;
};
