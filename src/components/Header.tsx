import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "@/components/LocationSelector";
import { AuthModal } from "@/components/AuthModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Wrench, User, LogIn, Home, Bell, Mail, Calendar, AlertCircle, Menu, Search, BookOpen } from "lucide-react";

export const Header = () => {
  const [location, setLocation] = useState("New York, NY");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const notifications = [
    { id: 1, type: "lead", title: "New lead received", message: "John wants brake service", time: "5 min ago", icon: Mail },
    { id: 2, type: "booking", title: "Booking confirmed", message: "Oil change scheduled for tomorrow", time: "1 hour ago", icon: Calendar },
    { id: 3, type: "alert", title: "Review received", message: "New 5-star review on your workshop", time: "2 hours ago", icon: AlertCircle }
  ];

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AutoGos</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Search Guides
          </Link>
          <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocationSelector currentLocation={location} onLocationChange={setLocation} />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Home</span>
                </Link>
                <Link 
                  to="/search" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Search Guides</span>
                </Link>
                <Link 
                  to="/blogs" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Blogs</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card z-50">
              <div className="px-4 py-3 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-xs text-muted-foreground">You have 3 unread notifications</p>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <DropdownMenuItem key={notification.id} className="px-4 py-3 cursor-pointer focus:bg-muted">
                      <div className="flex gap-3 w-full">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted">
                <Link to="/notifications" className="w-full text-center py-2 font-medium text-primary">
                  View All Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Login</span>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/profile">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
    </>
  );
};
