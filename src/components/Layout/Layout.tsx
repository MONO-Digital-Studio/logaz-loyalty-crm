
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AIPanel from '../ai-assistant/shared/AIPanel';
import AIAssistantPanel from '../individuals/ai-assistant/AIAssistantPanel';
import LegalEntitiesAIPanel from '../legal-entities/ai-assistant/LegalEntitiesAIPanel';
import { 
  SidebarProvider, 
  SidebarInset
} from '@/components/ui/sidebar';
import { AIProvider } from '@/contexts/AIContext';
import { IndividualsAIProvider } from '@/contexts/IndividualsAIContext';
import { LegalEntitiesAIProvider } from '@/contexts/LegalEntitiesAIContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AIProvider>
        <IndividualsAIProvider>
          <LegalEntitiesAIProvider>
            <div className="flex h-screen w-full bg-logaz-light-gray">
              <Sidebar isOpen={sidebarOpen} />
              <SidebarInset className="flex flex-col flex-1 overflow-hidden w-full">
                <TopBar toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                  {children}
                </main>
              </SidebarInset>
              <AIPanel />
              <AIAssistantPanel />
              <LegalEntitiesAIPanel />
            </div>
          </LegalEntitiesAIProvider>
        </IndividualsAIProvider>
      </AIProvider>
    </SidebarProvider>
  );
};

export default Layout;
