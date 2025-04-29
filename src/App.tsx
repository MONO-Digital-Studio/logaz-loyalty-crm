
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
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
            <Route path="/crm/clients" element={<ClientsPage />} />
            <Route path="/crm/clients/:id" element={<ClientDetailsPage />} />
            <Route path="/loyalty" element={<LoyaltyProgramPage />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/editor" element={<ContentEditorPage />} />
            <Route path="/content/editor/:id" element={<ContentEditorPage />} />
            <Route path="/contact-center" element={<ContactCenterPage />} />
            <Route path="/contact-center/dialogs" element={<DialogsPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
