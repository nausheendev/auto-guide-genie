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
import UserSettings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import Reports from "./pages/admin/Reports";
import UserManagement from "./pages/admin/UserManagement";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import EditStaff from "./pages/admin/EditStaff";
import ManageModel from "./pages/admin/ManageModel";
import AIConfiguration from "./pages/admin/AIConfiguration";
import CreditSystem from "./pages/admin/CreditSystem";
import MaintenanceMode from "./pages/admin/MaintenanceMode";
import AdminSettings from "./pages/admin/Settings";
import MechanicDashboard from "./pages/MechanicDashboard";
import MechanicOnboarding from "./pages/MechanicOnboarding";
import MechanicOffers from "./pages/MechanicOffers";
import WorkshopDetails from "./pages/WorkshopDetails";
import WorkshopEdit from "./pages/WorkshopEdit";
import WorkshopOffers from "./pages/WorkshopOffers";
import AddWorkshopOffer from "./pages/AddWorkshopOffer";
import WorkshopLeads from "./pages/WorkshopLeads";
import Notifications from "./pages/Notifications";
import LeadDetails from "./pages/LeadDetails";
import LocalGuide from "./pages/LocalGuide";
import NotFound from "./pages/NotFound";
import CategoryHub from "./pages/CategoryHub";
import CityHub from "./pages/CityHub";
import BlogPost from "./pages/BlogPost";

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
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/edit/:id" element={<EditUser />} />
          <Route path="/admin/staff/:id" element={<EditStaff />} />
          <Route path="/admin/model/add" element={<ManageModel />} />
          <Route path="/admin/model/:id" element={<ManageModel />} />
          <Route path="/admin/ai-config" element={<AIConfiguration />} />
          <Route path="/admin/credit-system" element={<CreditSystem />} />
          <Route path="/admin/maintenance" element={<MaintenanceMode />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/mechanic-onboarding" element={<MechanicOnboarding />} />
          <Route path="/mechanic-offers" element={<MechanicOffers />} />
          <Route path="/workshop/:id" element={<WorkshopDetails />} />
          <Route path="/workshop/:id/edit" element={<WorkshopEdit />} />
          <Route path="/workshop/:id/offers" element={<WorkshopOffers />} />
          <Route path="/workshop/:id/offers/new" element={<AddWorkshopOffer />} />
          <Route path="/workshop/:id/leads" element={<WorkshopLeads />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Blog Pages */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Vehicle-specific local guide routes with year */}
          <Route path="/:categorySlug/:citySlug/:make/:model/:year/:serviceSlug" element={<LocalGuide />} />
          {/* General local guide routes (no vehicle) */}
          <Route path="/:categorySlug/:citySlug/:serviceSlug" element={<LocalGuide />} />
          {/* City Hub Page */}
          <Route path="/:categorySlug/:citySlug" element={<CityHub />} />
          {/* Category Hub Page */}
          <Route path="/:categorySlug" element={<CategoryHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
