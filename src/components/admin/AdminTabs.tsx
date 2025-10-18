import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, TrendingUp, Users, UserPlus, Car, AlertCircle, Mail, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/admin") return "overview";
    if (path === "/admin/reports") return "reports";
    if (path === "/admin/users") return "users";
    if (path === "/admin/staff") return "staff";
    if (path === "/admin/models") return "models";
    if (path === "/admin/maintenance") return "maintenance";
    if (path === "/admin/email-templates") return "email-templates";
    if (path === "/admin/settings") return "settings";
    return "overview";
  };

  const handleTabChange = (value: string) => {
    const routes: Record<string, string> = {
      overview: "/admin",
      reports: "/admin/reports",
      users: "/admin/users",
      staff: "/admin/staff",
      models: "/admin/models",
      maintenance: "/admin/maintenance",
      "email-templates": "/admin/email-templates",
      settings: "/admin/settings",
    };
    navigate(routes[value] || "/admin");
  };

  return (
    <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
      <TabsList className="flex-nowrap gap-1 w-full">
        <TabsTrigger value="overview">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="reports">
          <TrendingUp className="h-4 w-4 mr-2" />
          Reports
        </TabsTrigger>
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="staff">
          <UserPlus className="h-4 w-4 mr-2" />
          Staff
        </TabsTrigger>
        <TabsTrigger value="models">
          <Car className="h-4 w-4 mr-2" />
          Models
        </TabsTrigger>
        <TabsTrigger value="maintenance">
          <AlertCircle className="h-4 w-4 mr-2" />
          Maintenance
        </TabsTrigger>
        <TabsTrigger value="email-templates">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
