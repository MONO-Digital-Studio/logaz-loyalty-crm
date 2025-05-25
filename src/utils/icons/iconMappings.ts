
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
  Mail,
  Building2,
  CreditCard,
  Receipt,
  Activity,
  Phone,
  TrendingUp,
  Fuel,
  BadgeRussianRuble,
  UserRound,
  Cog,
  ShieldCheck,
  User,
  Link,
  FileArchive,
  AlertCircle
} from 'lucide-react';

export const mainIconMap = {
  'dashboard': LayoutDashboard,
  'le-dashboard': LayoutDashboard,
  'crm': Users,
  'le-clients': Building2,
  'le-fuel-cards': CreditCard,
  'le-transactions': Activity,
  'le-payments': Receipt,
  'le-communications': Mail,
  'le-support': HeadphonesIcon,
  'le-analytics': TrendingUp,
  'le-ai-assistant': MessageSquare,
  'le-settings': Settings,
  'products': ShoppingBag,
  'content': FileText,
  'contact_center': HeadphonesIcon,
  'loyalty': Heart,
  'analytics': BarChart,
  'locations': Map,
  'campaigns': Mail,
  'employees': UserRound,
  'settings': Settings,
  'system': Cog
} as const;

export const subIconMappings = {
  'le-clients': {
    'le-clients-list': Building2,
    'le-clients-create': Building2
  },
  'le-fuel-cards': {
    'le-cards-list': CreditCard,
    'le-cards-create': CreditCard,
    'le-cards-blocked': CreditCard
  },
  'le-payments': {
    'le-payments-invoices': Receipt,
    'le-payments-history': BadgeRussianRuble
  },
  'le-communications': {
    'le-comm-email': Mail,
    'le-comm-telegram': MessageSquare,
    'le-comm-sms': Phone
  },
  'le-support': {
    'le-support-tickets': HeadphonesIcon,
    'le-support-create': HeadphonesIcon
  },
  'le-analytics': {
    'le-reports-consumption': Fuel,
    'le-reports-efficiency': TrendingUp
  },
  'le-ai-assistant': {
    'le-ai-activity': Activity,
    'le-ai-predictions': TrendingUp
  },
  'contact_center': {
    'dialogs': MessageSquare,
    'agents': UserCheck,
    'stats': LineChart,
    'templates': FileCheck,
    'analytics': BarChart
  },
  'locations': {
    'stores': Store
  },
  'employees': {
    'list': Users,
    'structure': UserCheck
  },
  'settings': {
    'profile': User,
    'access': ShieldCheck
  },
  'settings.access': {
    'users': Users,
    'roles': ShieldCheck
  },
  'system': {
    'general': Settings,
    'backup': FileArchive,
    'logs': AlertCircle,
    'maintenance': Cog,
    'integrations': Link,
    'locations': Store
  }
} as const;

export const defaultIcon = ChevronRight;
