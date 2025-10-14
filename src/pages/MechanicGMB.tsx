import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, MapPin, Star, Phone, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MechanicGMB() {
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleConnectGMB = () => {
    setIsConnected(true);
    toast({
      title: "Google My Business Connected",
      description: "Successfully connected to your GMB account",
    });
  };

  const mockBusinessData = {
    name: "AutoFix Pro Workshop",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    reviews: 127,
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    verified: true
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Google My Business</h2>
        <p className="text-muted-foreground mt-1">
          Connect and manage your Google My Business listings
        </p>
      </div>

      <Separator />

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Google My Business</CardTitle>
            <CardDescription>
              Link your GMB account to import business details, ratings, and reviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 rounded-lg border-2 border-dashed text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect Your Account</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Authorize AutoGos to access your Google My Business data
                </p>
              </div>
              <Button size="lg" onClick={handleConnectGMB}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect with Google
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What you'll get:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Automatic import of business information
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Display your ratings and reviews
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Sync business hours and contact details
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Manage multiple locations
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Connected Account
                    <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </CardTitle>
                  <CardDescription>Your GMB account is successfully linked</CardDescription>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Listings</CardTitle>
              <CardDescription>Manage your connected business locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search your businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline">Search</Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {mockBusinessData.name}
                        {mockBusinessData.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mockBusinessData.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({mockBusinessData.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {mockBusinessData.address}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {mockBusinessData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {mockBusinessData.hours}
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Reviews
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Insights
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}