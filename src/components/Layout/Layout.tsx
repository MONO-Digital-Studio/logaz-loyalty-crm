
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AIPanelsContainer from './AIPanelsContainer';
import { 
  SidebarProvider, 
  SidebarInset
} from '@/components/ui/sidebar';
import { AIProvider } from '@/contexts/AIContext';
import { IndividualsAIProvider } from '@/contexts/IndividualsAIContext';
import { LegalEntitiesAIProvider } from '@/contexts/LegalEntitiesAIContext';
import { useSidebarState } from '@/hooks/useSidebarState';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebarState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <AIProvider>
        <IndividualsAIProvider>
          <LegalEntitiesAIProvider>
            <div className="min-h-screen bg-logaz-light-gray flex">
              <Sidebar isOpen={sidebarOpen} />
              <div className="flex flex-col flex-1 min-h-screen">
                <TopBar toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6 overflow-auto bg-gray-50/50">
                  <div className="max-w-full mx-auto">
                    {children}
                  </div>
                </main>
              </div>
              <AIPanelsContainer />
            </div>
          </LegalEntitiesAIProvider>
        </IndividualsAIProvider>
      </AIProvider>
    </SidebarProvider>
  );
};

export default Layout;
