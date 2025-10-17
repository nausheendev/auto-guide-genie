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
  const notifications = [{
    id: 1,
    type: "lead",
    title: "New lead received",
    message: "John wants brake service",
    time: "5 min ago",
    icon: Mail
  }, {
    id: 2,
    type: "booking",
    title: "Booking confirmed",
    message: "Oil change scheduled for tomorrow",
    time: "1 hour ago",
    icon: Calendar
  }, {
    id: 3,
    type: "alert",
    title: "Review received",
    message: "New 5-star review on your workshop",
    time: "2 hours ago",
    icon: AlertCircle
  }];
  return <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AutoGos</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/repairs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Repairs
          </Link>
          <Link to="/maintenance" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Maintenance
          </Link>
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4 inline mr-1" />
            Search
          </Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4 inline mr-1" />
            Blog
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LocationSelector currentLocation={location} onLocationChange={setLocation} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map(notification => {
                const Icon = notification.icon;
                return <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
                    <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>;
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/notifications" className="w-full text-center text-sm text-primary cursor-pointer">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => setShowAuthModal(true)} size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-6">
              <LocationSelector currentLocation={location} onLocationChange={setLocation} />
              
              <nav className="flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link to="/repairs" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Wrench className="h-4 w-4" />
                  Repairs
                </Link>
                <Link to="/maintenance" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Wrench className="h-4 w-4" />
                  Maintenance
                </Link>
                <Link to="/search" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                  Search
                </Link>
                <Link to="/blog" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Blog
                </Link>
                <Link to="/notifications" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notifications.length > 0 && <span className="ml-auto h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                      {notifications.length}
                    </span>}
                </Link>
              </nav>

              <Button onClick={() => setShowAuthModal(true)} className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
    </>;
};