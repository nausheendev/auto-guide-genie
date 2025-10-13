import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, MapPin, Clock, BookOpen, Settings, LogOut, Bookmark, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  location: "New York, NY",
  credits: 3,
  joinDate: "January 2025",
  viewHistory: [
    { id: 1, title: "Brake Pad Replacement", date: "2 days ago" },
    { id: 2, title: "Oil Change", date: "1 week ago" },
    { id: 3, title: "Battery Replacement", date: "2 weeks ago" },
    { id: 4, title: "Air Filter Replacement", date: "1 month ago" }
  ],
  savedGuides: [
    { id: 3, title: "Brake Pad Replacement", category: "Brakes", date: "Saved yesterday" },
    { id: 5, title: "Engine Oil Change", category: "Maintenance", date: "Saved 3 days ago" }
  ]
};

export default function Profile() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMechanicAccount, setIsMechanicAccount] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateMechanicAccount = () => {
    setIsMechanicAccount(true);
    toast({
      title: "Mechanic Account Activated",
      description: "You now have access to workshop management features",
    });
    navigate("/mechanic-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            {/* Profile Header */}
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
                {!isMechanicAccount && (
                  <Button variant="default" onClick={handleCreateMechanicAccount}>
                    <Wrench className="h-4 w-4 mr-2" />
                    Create Mechanic Account
                  </Button>
                )}
                {isMechanicAccount && (
                  <Button variant="default" asChild>
                    <Link to="/mechanic-dashboard">
                      <Wrench className="h-4 w-4 mr-2" />
                      Mechanic Dashboard
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <Separator />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{USER_DATA.credits}</CardTitle>
                  <CardDescription>Credits Remaining Today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Free Plan</Badge>
                    <span className="text-xs text-muted-foreground">Resets daily</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{USER_DATA.viewHistory.length}</CardTitle>
                  <CardDescription>Guides Viewed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Total guides accessed this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Active</CardTitle>
                  <CardDescription>Account Status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-success text-success-foreground">
                    ✓ Verified
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Saved Guides */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bookmark className="h-5 w-5" />
                      Saved Guides
                    </CardTitle>
                    <CardDescription>Your favorite repair guides</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {USER_DATA.savedGuides.map((item) => (
                    <Link 
                      key={item.id}
                      to={`/guide/${item.id}`}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* View History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Recently Viewed Guides
                    </CardTitle>
                    <CardDescription>Your repair guide history</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {USER_DATA.viewHistory.map((item) => (
                    <Link 
                      key={item.id}
                      to={`/guide/${item.id}`}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        View Again
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates about new guides</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Location Services</h4>
                    <p className="text-sm text-muted-foreground">Find mechanics near you</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">Change your password</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Upgrade to Premium</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Get unlimited access to all repair guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Unlimited guide access
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Advanced AI features
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Downloadable PDF guides
                    </li>
                  </ul>
                  <Button variant="accent" size="lg" className="w-full">
                    Upgrade Now - $9.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
