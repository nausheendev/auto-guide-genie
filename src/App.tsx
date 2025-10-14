import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import ProfileDashboard from "./pages/ProfileDashboard";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import MechanicDashboard from "./pages/MechanicDashboard";
import MechanicOnboarding from "./pages/MechanicOnboarding";
import MechanicOffers from "./pages/MechanicOffers";
import WorkshopDetails from "./pages/WorkshopDetails";
import WorkshopEdit from "./pages/WorkshopEdit";
import WorkshopOffers from "./pages/WorkshopOffers";
import WorkshopLeads from "./pages/WorkshopLeads";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide/:id" element={<Guide />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-dashboard" element={<ProfileDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/mechanic-onboarding" element={<MechanicOnboarding />} />
          <Route path="/mechanic-offers" element={<MechanicOffers />} />
          <Route path="/workshop/:id" element={<WorkshopDetails />} />
          <Route path="/workshop/:id/edit" element={<WorkshopEdit />} />
          <Route path="/workshop/:id/offers" element={<WorkshopOffers />} />
          <Route path="/workshop/:id/leads" element={<WorkshopLeads />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
