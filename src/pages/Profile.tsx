import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Bookmark, Mail } from "lucide-react";

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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard />

            <Separator />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{USER_DATA.credits}</p>
                    <p className="text-sm text-muted-foreground">Credits Remaining Today</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Free Plan</Badge>
                      <span className="text-xs text-muted-foreground">Resets daily</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{USER_DATA.viewHistory.length}</p>
                    <p className="text-sm text-muted-foreground">Guides Viewed</p>
                    <p className="text-xs text-muted-foreground">
                      Total guides accessed this month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">Active</p>
                    <p className="text-sm text-muted-foreground">Account Status</p>
                    <Badge className="bg-success text-success-foreground">
                      ✓ Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Enquiries/Leads</p>
                    <p className="text-xs text-muted-foreground">
                      3 pending responses
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Saved Guides */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Bookmark className="h-5 w-5" />
                      Saved Guides
                    </h3>
                    <p className="text-sm text-muted-foreground">Your favorite repair guides</p>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
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
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Recently Viewed Guides
                    </h3>
                    <p className="text-sm text-muted-foreground">Your repair guide history</p>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
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

            {/* Upgrade CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Upgrade to Premium</h3>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    Get unlimited access to all repair guides
                  </p>
                </div>
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
                <Button variant="secondary" size="lg" className="w-full">
                  Upgrade Now - $9.99/month
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}