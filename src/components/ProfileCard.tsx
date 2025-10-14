import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Mail, MapPin, Clock, Settings, LogOut, Wrench, LayoutDashboard, CreditCard, ChevronDown, Menu, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthModal } from "@/components/AuthModal";

const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  location: "New York, NY",
  joinDate: "January 2025",
};

interface ProfileCardProps {
  showMechanicButton?: boolean;
}

export function ProfileCard({ showMechanicButton = true }: ProfileCardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMechanicAccount, setIsMechanicAccount] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateMechanicAccount = () => {
    navigate("/mechanic-onboarding");
  };

  const handleLogout = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {USER_DATA.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl font-bold">{USER_DATA.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {USER_DATA.email}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {USER_DATA.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Joined {USER_DATA.joinDate}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {showMechanicButton && !isMechanicAccount && (
                <Button variant="default" onClick={handleCreateMechanicAccount}>
                  <Wrench className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Create Mechanic Account</span>
                  <span className="sm:hidden">Mechanic</span>
                </Button>
              )}
              {isMechanicAccount && (
                <Button variant="default" asChild>
                  <Link to="/mechanic-dashboard">
                    <Wrench className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Mechanic Dashboard</span>
                    <span className="sm:hidden">Dashboard</span>
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Menu className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Menu</span>
                    <ChevronDown className="h-4 w-4 ml-2 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/profile-dashboard" className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscription" className="cursor-pointer">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Subscription & Billing
                    </Link>
                  </DropdownMenuItem>
                  {isMechanicAccount && (
                    <DropdownMenuItem asChild>
                      <Link to="/mechanic-offers" className="cursor-pointer">
                        <Tag className="h-4 w-4 mr-2" />
                        Manage Offers
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
