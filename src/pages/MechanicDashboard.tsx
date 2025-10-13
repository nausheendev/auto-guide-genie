import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Wrench, MapPin, Clock, Star, DollarSign, Phone, Globe, Mail, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MechanicDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const { toast } = useToast();

  // Mock Google My Business suggestions
  const businessSuggestions = [
    {
      id: 1,
      name: "AutoFix Pro Shop",
      address: "123 Main St, New York, NY 10001",
      rating: 4.5,
      reviews: 128,
      phone: "(555) 123-4567",
      isVerified: true,
    },
    {
      id: 2,
      name: "Quick Auto Repair",
      address: "456 Oak Ave, New York, NY 10002",
      rating: 4.2,
      reviews: 89,
      phone: "(555) 987-6543",
      isVerified: false,
    },
  ];

  const handleBusinessSelect = (business: any) => {
    setSelectedBusiness(business);
    toast({
      title: "Business Selected",
      description: `Selected ${business.name}`,
    });
  };

  const handleSaveBusinessDetails = () => {
    toast({
      title: "Business Details Saved",
      description: "Your workshop information has been updated successfully",
    });
  };

  const handleSaveOffer = () => {
    toast({
      title: "Offer Created",
      description: "Your promotional offer has been published",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-6xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Wrench className="h-8 w-8" />
                Mechanic Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your workshop profile and connect with customers
              </p>
            </div>

            <Separator />

            <Tabs defaultValue="setup" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Workshop Setup</TabsTrigger>
                <TabsTrigger value="details">Business Details</TabsTrigger>
                <TabsTrigger value="offers">Offers & Promotions</TabsTrigger>
              </TabsList>

              {/* Workshop Setup Tab */}
              <TabsContent value="setup" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connect Your Business</CardTitle>
                    <CardDescription>
                      Search for your workshop on Google Maps or enter manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessSearch">Search Workshop Name</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="businessSearch"
                            placeholder="Enter your workshop name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button>Search</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Using Google Maps API (Demo mode with dummy key)
                      </p>
                    </div>

                    {searchQuery && (
                      <div className="space-y-3">
                        <Label>Suggested Businesses</Label>
                        {businessSuggestions.map((business) => (
                          <div
                            key={business.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedBusiness?.id === business.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => handleBusinessSelect(business)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">{business.name}</h4>
                                  {business.isVerified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {business.address}
                                </p>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {business.rating} ({business.reviews} reviews)
                                  </span>
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    {business.phone}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={selectedBusiness?.id === business.id ? "default" : "outline"}
                              >
                                {selectedBusiness?.id === business.id ? "Selected" : "Select"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Business Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workshop Information</CardTitle>
                    <CardDescription>
                      {selectedBusiness
                        ? `Editing details for ${selectedBusiness.name}`
                        : "Add or edit your workshop details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="workshopName">Workshop Name</Label>
                        <Input
                          id="workshopName"
                          defaultValue={selectedBusiness?.name}
                          placeholder="Your Workshop Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={selectedBusiness?.phone}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        defaultValue={selectedBusiness?.address}
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="workshop@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">About Your Workshop</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your services, specialties, and what makes your workshop unique..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hours">Business Hours</Label>
                      <Textarea
                        id="hours"
                        placeholder="Mon-Fri: 8:00 AM - 6:00 PM&#10;Sat: 9:00 AM - 4:00 PM&#10;Sun: Closed"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">Services Offered</Label>
                      <Textarea
                        id="services"
                        placeholder="Oil Changes, Brake Repair, Engine Diagnostics, Tire Services..."
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSaveBusinessDetails} size="lg">
                      Save Business Details
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Offers Tab */}
              <TabsContent value="offers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Special Offer</CardTitle>
                    <CardDescription>
                      Attract more customers with promotional deals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="offerTitle">Offer Title</Label>
                      <Input
                        id="offerTitle"
                        placeholder="e.g., 20% Off Oil Change Service"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="offerDescription">Description</Label>
                      <Textarea
                        id="offerDescription"
                        placeholder="Describe the offer details, terms, and conditions..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discount">Discount Percentage</Label>
                        <Input
                          id="discount"
                          type="number"
                          placeholder="20"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="validUntil">Valid Until</Label>
                        <Input
                          id="validUntil"
                          type="date"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="offerCode">Promo Code (Optional)</Label>
                      <Input
                        id="offerCode"
                        placeholder="e.g., SAVE20"
                      />
                    </div>

                    <Button onClick={handleSaveOffer} size="lg">
                      Publish Offer
                    </Button>
                  </CardContent>
                </Card>

                {/* Active Offers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Offers</CardTitle>
                    <CardDescription>Your current promotional campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">15% Off Brake Service</h4>
                            <p className="text-sm text-muted-foreground">
                              Valid until Dec 31, 2025
                            </p>
                            <Badge variant="secondary">Code: BRAKE15</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
