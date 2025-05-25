
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AIPanelsContainer from './AIPanelsContainer';
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
    <AIProvider>
      <IndividualsAIProvider>
        <LegalEntitiesAIProvider>
          <div className="h-screen w-screen overflow-hidden bg-logaz-light-gray">
            <div 
              className="grid h-full transition-all duration-300"
              style={{
                gridTemplateColumns: sidebarOpen ? '256px 1fr' : '80px 1fr',
                gridTemplateRows: 'auto 1fr'
              }}
            >
              <Sidebar isOpen={sidebarOpen} />
              <TopBar toggleSidebar={toggleSidebar} />
              <div></div>
              <main className="overflow-auto bg-gray-50/50 min-w-0">
                {children}
              </main>
            </div>
            <AIPanelsContainer />
          </div>
        </LegalEntitiesAIProvider>
      </IndividualsAIProvider>
    </AIProvider>
  );
};

export default Layout;
