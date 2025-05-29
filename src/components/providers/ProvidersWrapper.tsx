
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { AIProvider } from "@/contexts/AIContext";
import { IndividualsAIProvider } from "@/contexts/IndividualsAIContext";
import { LegalEntitiesAIProvider } from "@/contexts/LegalEntitiesAIContext";
import { LegalEntitiesProvider } from "@/contexts/LegalEntitiesContext";
import GlobalErrorBoundary from "@/components/ErrorBoundary/GlobalErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

interface ProvidersWrapperProps {
  children: React.ReactNode;
}

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <WorkspaceProvider>
              <AIProvider>
                <IndividualsAIProvider>
                  <LegalEntitiesAIProvider>
                    <LegalEntitiesProvider>
                      {children}
                      <Toaster />
                    </LegalEntitiesProvider>
                  </LegalEntitiesAIProvider>
                </IndividualsAIProvider>
              </AIProvider>
            </WorkspaceProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
};

export default ProvidersWrapper;
