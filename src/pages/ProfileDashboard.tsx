import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, TrendingUp, Users, DollarSign } from "lucide-react";

export default function ProfileDashboard() {
  const stats = [
    {
      title: "Total Guides Viewed",
      value: "24",
      change: "+12%",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Saved Guides",
      value: "8",
      change: "+3",
      icon: Users,
      trend: "up"
    },
    {
      title: "Credits Used",
      value: "47",
      change: "This month",
      icon: DollarSign,
      trend: "neutral"
    },
    {
      title: "Active Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard />

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Viewed guide", title: "Brake Pad Replacement", time: "2 hours ago" },
                      { action: "Saved guide", title: "Oil Change", time: "5 hours ago" },
                      { action: "Viewed guide", title: "Battery Replacement", time: "1 day ago" }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.title}</p>
                        </div>
                        <Badge variant="secondary">{activity.time}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm font-medium">Most viewed category</span>
                      <Badge>Brakes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm font-medium">Favorite guides</span>
                      <Badge>8 saved</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm font-medium">Account age</span>
                      <Badge>2 months</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}