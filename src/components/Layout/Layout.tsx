
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
            <div className="min-h-screen flex w-full bg-logaz-light-gray">
              <Sidebar isOpen={sidebarOpen} />
              <SidebarInset className="flex-1 flex flex-col w-full">
                <TopBar toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                  {children}
                </main>
              </SidebarInset>
              <AIPanelsContainer />
            </div>
          </LegalEntitiesAIProvider>
        </IndividualsAIProvider>
      </AIProvider>
    </SidebarProvider>
  );
};

export default Layout;
