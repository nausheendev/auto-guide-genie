import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "@/components/LocationSelector";
import { AuthModal } from "@/components/AuthModal";
import { Wrench, User, LogIn, Home } from "lucide-react";

export const Header = () => {
  const [location, setLocation] = useState("New York, NY");
  const [showAuthModal, setShowAuthModal] = useState(false);

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
          <Button variant="outline" size="sm" asChild className="md:hidden">
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
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
