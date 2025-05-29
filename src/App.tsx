
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { AIProvider } from "@/contexts/AIContext";
import { IndividualsAIProvider } from "@/contexts/IndividualsAIContext";
import { LegalEntitiesAIProvider } from "@/contexts/LegalEntitiesAIContext";
import { LegalEntitiesProvider } from "@/contexts/LegalEntitiesContext";

// Individual pages
import Index from '@/pages/Index';
import DashboardPageRefactored from '@/pages/DashboardPageRefactored';
import LoyaltyProgramPage from '@/pages/LoyaltyProgramPage';
import ContentPage from '@/pages/ContentPage';
import ContentEditorPage from '@/pages/ContentEditorPage';
import CrmPage from '@/pages/CrmPage';
import ClientsPage from '@/pages/ClientsPage';
import ClientDetailsPage from '@/pages/ClientDetailsPage';
import AudiencesPage from '@/pages/AudiencesPage';
import ContactCenterPage from '@/pages/ContactCenterPage';
import DialogsPage from '@/pages/ContactCenter/DialogsPage';
import AgentsPage from '@/pages/ContactCenter/AgentsPage';
import StatsPage from '@/pages/ContactCenter/StatsPage';
import TemplatesPage from '@/pages/ContactCenter/TemplatesPage';
import AnalyticsPage from '@/pages/ContactCenter/AnalyticsPage';
import EmailCampaignsPage from '@/pages/EmailCampaignsPage';
import CampaignEditorPage from '@/pages/CampaignEditorPage';
import ProductsPage from '@/pages/ProductsPage';
import EmployeesPage from '@/pages/EmployeesPage';
import SettingsPage from '@/pages/SettingsPage';
import SystemPage from '@/pages/SystemPage';
import NotFound from '@/pages/NotFound';

// Legal entities pages
import LegalEntitiesDashboard from '@/pages/legal-entities/LegalEntitiesDashboard';
import LegalEntitiesClientsPage from '@/pages/legal-entities/LegalEntitiesClientsPage';

// Legal entities contact center pages
import LegalEntitiesContactCenterPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesContactCenterPage';
import LegalEntitiesDialogsPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesDialogsPage';
import LegalEntitiesAgentsPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesAgentsPage';
import LegalEntitiesStatsPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesStatsPage';
import LegalEntitiesTemplatesPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesTemplatesPage';
import LegalEntitiesAnalyticsPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesAnalyticsPage';
import LegalEntitiesEmailCampaignsPage from '@/pages/legal-entities/ContactCenter/LegalEntitiesEmailCampaignsPage';

import HandbookPage from "@/pages/HandbookPage";

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Router>
            <WorkspaceProvider>
              <AIProvider>
                <IndividualsAIProvider>
                  <LegalEntitiesAIProvider>
                    <LegalEntitiesProvider>
                      <div className="min-h-screen bg-gray-50">
                        <Routes>
                          {/* Individual workspace routes */}
                          <Route path="/" element={<Index />} />
                          <Route path="/dashboard" element={<DashboardPageRefactored />} />
                          <Route path="/loyalty" element={<LoyaltyProgramPage />} />
                          <Route path="/content" element={<ContentPage />} />
                          <Route path="/content/editor" element={<ContentEditorPage />} />
                          <Route path="/content/editor/:id" element={<ContentEditorPage />} />
                          <Route path="/crm" element={<CrmPage />} />
                          <Route path="/crm/clients" element={<ClientsPage />} />
                          <Route path="/crm/clients/:id" element={<ClientDetailsPage />} />
                          <Route path="/crm/audiences" element={<AudiencesPage />} />
                          
                          {/* Contact Center routes */}
                          <Route path="/contact-center" element={<ContactCenterPage />} />
                          <Route path="/contact-center/dialogs" element={<DialogsPage />} />
                          <Route path="/contact-center/agents" element={<AgentsPage />} />
                          <Route path="/contact-center/campaigns" element={<EmailCampaignsPage />} />
                          <Route path="/contact-center/campaigns/editor" element={<CampaignEditorPage />} />
                          <Route path="/contact-center/campaigns/editor/:id" element={<CampaignEditorPage />} />
                          <Route path="/contact-center/stats" element={<StatsPage />} />
                          <Route path="/contact-center/templates" element={<TemplatesPage />} />
                          <Route path="/contact-center/analytics" element={<AnalyticsPage />} />
                          
                          <Route path="/products" element={<ProductsPage />} />
                          <Route path="/employees/list" element={<EmployeesPage />} />
                          <Route path="/employees/structure" element={<EmployeesPage />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/system" element={<SystemPage />} />

                          {/* Legal entities routes */}
                          <Route path="/legal-entities" element={<LegalEntitiesDashboard />} />
                          <Route path="/legal-entities/clients" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/clients/create" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/fuel-cards" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/fuel-cards/create" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/fuel-cards/blocked" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/transactions" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/payments/invoices" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/payments/history" element={<LegalEntitiesClientsPage />} />
                          
                          {/* Legal entities contact center routes */}
                          <Route path="/legal-entities/contact-center" element={<LegalEntitiesContactCenterPage />} />
                          <Route path="/legal-entities/contact-center/dialogs" element={<LegalEntitiesDialogsPage />} />
                          <Route path="/legal-entities/contact-center/agents" element={<LegalEntitiesAgentsPage />} />
                          <Route path="/legal-entities/contact-center/campaigns" element={<LegalEntitiesEmailCampaignsPage />} />
                          <Route path="/legal-entities/contact-center/campaigns/email" element={<LegalEntitiesEmailCampaignsPage />} />
                          <Route path="/legal-entities/contact-center/campaigns/telegram" element={<LegalEntitiesEmailCampaignsPage />} />
                          <Route path="/legal-entities/contact-center/campaigns/sms" element={<LegalEntitiesEmailCampaignsPage />} />
                          <Route path="/legal-entities/contact-center/campaigns/editor" element={<CampaignEditorPage />} />
                          <Route path="/legal-entities/contact-center/campaigns/editor/:id" element={<CampaignEditorPage />} />
                          <Route path="/legal-entities/contact-center/stats" element={<LegalEntitiesStatsPage />} />
                          <Route path="/legal-entities/contact-center/templates" element={<LegalEntitiesTemplatesPage />} />
                          <Route path="/legal-entities/contact-center/analytics" element={<LegalEntitiesAnalyticsPage />} />
                          
                          <Route path="/legal-entities/analytics/consumption" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/analytics/efficiency" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/ai/activity-analysis" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/ai/predictions" element={<LegalEntitiesClientsPage />} />
                          <Route path="/legal-entities/settings" element={<LegalEntitiesClientsPage />} />

                          <Route path="/handbook" element={<HandbookPage />} />

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                      <Toaster />
                    </LegalEntitiesProvider>
                  </LegalEntitiesAIProvider>
                </IndividualsAIProvider>
              </AIProvider>
            </WorkspaceProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
