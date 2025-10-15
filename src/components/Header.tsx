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
      
    </header>
    </>;
};