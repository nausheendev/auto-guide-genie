import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, AlertCircle, MessageSquare, CheckCircle, Clock } from "lucide-react";

export default function Notifications() {
  const allNotifications = [
    { id: 1, type: "lead", title: "New lead received", message: "John wants brake service for Toyota Camry 2020", time: "5 min ago", read: false, icon: Mail },
    { id: 2, type: "booking", title: "Booking confirmed", message: "Oil change scheduled for tomorrow at 10:00 AM", time: "1 hour ago", read: false, icon: Calendar },
    { id: 3, type: "review", title: "Review received", message: "New 5-star review on your workshop from Sarah", time: "2 hours ago", read: false, icon: AlertCircle },
    { id: 4, type: "message", title: "New message", message: "Customer inquiry about pricing for transmission service", time: "3 hours ago", read: true, icon: MessageSquare },
    { id: 5, type: "lead", title: "Lead update", message: "Michael responded to your quote for engine repair", time: "5 hours ago", read: true, icon: Mail },
    { id: 6, type: "booking", title: "Booking reminder", message: "Upcoming appointment with Emma tomorrow at 2:00 PM", time: "1 day ago", read: true, icon: Calendar },
    { id: 7, type: "system", title: "Account verified", message: "Your mechanic account has been successfully verified", time: "2 days ago", read: true, icon: CheckCircle },
    { id: 8, type: "lead", title: "New lead received", message: "Anna needs air conditioning repair for Honda Civic", time: "3 days ago", read: true, icon: Mail },
  ];

  const getIconComponent = (notification: typeof allNotifications[0]) => {
    const Icon = notification.icon;
    return (
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
        notification.read ? 'bg-muted' : 'bg-primary/10'
      }`}>
        <Icon className={`h-6 w-6 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
      </div>
    );
  };

  const unreadNotifications = allNotifications.filter(n => !n.read);
  const readNotifications = allNotifications.filter(n => n.read);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard />

            <Separator />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Stay updated with your latest activity
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All ({allNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="read">
                  Read ({readNotifications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-3">
                  {allNotifications.map((notification) => (
                    <Card key={notification.id} className={notification.read ? 'opacity-75' : ''}>
                      <CardContent className="p-4">
                        <div className="flex gap-3 sm:gap-4">
                          {getIconComponent(notification)}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-3">
                              <div className="flex-1">
                                <h3 className="font-semibold flex items-center gap-2 flex-wrap">
                                  {notification.title}
                                  {!notification.read && (
                                    <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 break-words">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                                  <Badge variant="secondary" className="text-xs">{notification.type}</Badge>
                                </div>
                              </div>
                              {!notification.read && (
                                <Button variant="default" size="sm" className="w-full sm:w-auto sm:self-start">
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="mt-6">
                <div className="space-y-3">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <Card key={notification.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3 sm:gap-4">
                            {getIconComponent(notification)}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col gap-3">
                                <div className="flex-1">
                                  <h3 className="font-semibold flex items-center gap-2 flex-wrap">
                                    {notification.title}
                                    <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1 break-words">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                                    <Badge variant="secondary" className="text-xs">{notification.type}</Badge>
                                  </div>
                                </div>
                                <Button variant="default" size="sm" className="w-full sm:w-auto sm:self-start">
                                  Mark as read
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No unread notifications</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="read" className="mt-6">
                <div className="space-y-3">
                  {readNotifications.length > 0 ? (
                    readNotifications.map((notification) => (
                      <Card key={notification.id} className="opacity-75">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {getIconComponent(notification)}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                                <Badge variant="secondary" className="text-xs">{notification.type}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No read notifications</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
