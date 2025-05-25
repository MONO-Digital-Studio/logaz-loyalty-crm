
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
            <div className={`flex-shrink-0 ${isMobile && !sidebarOpen ? 'hidden' : 'block'}`}>
              <Sidebar isOpen={sidebarOpen} />
            </div>
            
            {/* Main content area - takes all remaining space */}
            <div className="flex-1 flex flex-col min-w-0">
              <TopBar toggleSidebar={toggleSidebar} />
              
              <main className="flex-1 overflow-auto bg-gray-50/50">
                <div className="w-full h-full">
                  {children}
                </div>
              </main>
            </div>
            
            {/* AI панели только на очень больших экранах и когда они действительно нужны */}
            {!isMobile && (
              <div className="hidden 2xl:block flex-shrink-0">
                <AIPanelsContainer />
              </div>
            )}
          </div>
        </LegalEntitiesAIProvider>
      </IndividualsAIProvider>
    </AIProvider>
  );
};

export default Layout;
