
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AIPanelsContainer from './AIPanelsContainer';
import { AIProvider } from '@/contexts/AIContext';
import { IndividualsAIProvider } from '@/contexts/IndividualsAIContext';
import { LegalEntitiesAIProvider } from '@/contexts/LegalEntitiesAIContext';
import { useSidebarState } from '@/hooks/useSidebarState';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebarState(true);
  const isMobile = useIsMobile();

  return (
    <AIProvider>
      <IndividualsAIProvider>
        <LegalEntitiesAIProvider>
          <div className="h-screen w-screen overflow-hidden bg-logaz-light-gray flex">
            {/* Sidebar */}
            {(!isMobile || sidebarOpen) && (
              <div className="flex-shrink-0">
                <Sidebar isOpen={sidebarOpen} />
              </div>
            )}
            
            {/* Main content area - takes all remaining space */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar toggleSidebar={toggleSidebar} />
              
              <main className="flex-1 overflow-auto bg-gray-50/50">
                {children}
              </main>
            </div>
            
            {/* AI панели только на очень больших экранах */}
            {!isMobile && (
              <AIPanelsContainer />
            )}
          </div>
        </LegalEntitiesAIProvider>
      </IndividualsAIProvider>
    </AIProvider>
  );
};

export default Layout;
