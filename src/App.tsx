
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import CrmPage from "./pages/CrmPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import LoyaltyProgramPage from "./pages/LoyaltyProgramPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";
import ContentPage from "./pages/ContentPage";
import ContentEditorPage from "./pages/ContentEditorPage";
import NotFound from "./pages/NotFound";
import ContactCenterPage from "./pages/ContactCenterPage";
import DialogsPage from "./pages/ContactCenter/DialogsPage";
import AgentsPage from "./pages/ContactCenter/AgentsPage";
import StatsPage from "./pages/ContactCenter/StatsPage";
import TemplatesPage from "./pages/ContactCenter/TemplatesPage";
import AnalyticsPage from "./pages/ContactCenter/AnalyticsPage";
import AudiencesPage from "./pages/AudiencesPage";
import EmailCampaignsPage from "./pages/EmailCampaignsPage";
import CampaignEditorPage from "./pages/CampaignEditorPage";
import SystemPage from "./pages/SystemPage";
import EmployeesPage from "./pages/EmployeesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/crm/clients" element={<ClientsPage />} />
            <Route path="/crm/clients/:id" element={<ClientDetailsPage />} />
            <Route path="/crm/audiences" element={<AudiencesPage />} />
            <Route path="/loyalty" element={<LoyaltyProgramPage />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/editor" element={<ContentEditorPage />} />
            <Route path="/content/editor/:id" element={<ContentEditorPage />} />
            <Route path="/campaigns" element={<EmailCampaignsPage />} />
            <Route path="/campaigns/editor" element={<CampaignEditorPage />} />
            <Route path="/campaigns/editor/:id" element={<CampaignEditorPage />} />
            <Route path="/contact-center" element={<ContactCenterPage />} />
            <Route path="/contact-center/dialogs" element={<DialogsPage />} />
            <Route path="/contact-center/agents" element={<AgentsPage />} />
            <Route path="/contact-center/stats" element={<StatsPage />} />
            <Route path="/contact-center/templates" element={<TemplatesPage />} />
            <Route path="/contact-center/analytics" element={<AnalyticsPage />} />
            
            {/* Updated employee routes */}
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/:tab" element={<EmployeesPage />} />
            <Route path="/employees/list" element={<EmployeesPage />} />
            <Route path="/employees/structure" element={<EmployeesPage />} />
            
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/:tab" element={<SettingsPage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/system/:tab" element={<SystemPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
