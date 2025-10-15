import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Phone, Mail, Star, Edit, Tag, Users, Wrench } from "lucide-react";

export default function WorkshopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const workshop = {
    id: 1,
    name: "AutoFix Pro Workshop",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "contact@autofixpro.com",
    rating: 4.8,
    reviews: 142,
    status: "active",
    description: "Professional automotive repair and maintenance services with over 20 years of experience.",
    services: [
      "Oil Change",
      "Brake Repair",
      "Engine Diagnostics",
      "Transmission Service",
      "AC Repair",
      "Battery Replacement"
    ],
    activeOffers: 3,
    totalLeads: 24
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard showMechanicButton={false} />

            <Separator />

            <Tabs defaultValue="workshops" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="workshops" className="text-xs sm:text-sm">Workshop</TabsTrigger>
                <TabsTrigger value="offers" className="text-xs sm:text-sm">Offers</TabsTrigger>
                <TabsTrigger value="leads" className="text-xs sm:text-sm">Leads</TabsTrigger>
                <TabsTrigger value="gmb" className="text-xs sm:text-sm">GMB</TabsTrigger>
              </TabsList>

              <TabsContent value="workshops" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl flex items-center gap-2 flex-wrap">
                          {workshop.name}
                          <Badge variant={workshop.status === "active" ? "default" : "secondary"}>
                            {workshop.status}
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-lg">{workshop.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">
                            ({workshop.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <Button asChild>
                        <Link to={`/workshop/${id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Workshop
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <span>{workshop.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <span>{workshop.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>{workshop.email}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground">{workshop.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Services Offered</h3>
                      <div className="flex flex-wrap gap-2">
                        {workshop.services.map((service, index) => (
                          <Badge key={index} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/workshop/${id}/offers`}>
                          <Tag className="h-4 w-4 mr-2" />
                          View Offers ({workshop.activeOffers})
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/workshop/${id}/leads`}>
                          <Users className="h-4 w-4 mr-2" />
                          View Leads ({workshop.totalLeads})
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/workshop/${id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="offers" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center">View and manage offers in the Offers tab</p>
                  <div className="flex justify-center mt-4">
                    <Button asChild>
                      <Link to={`/workshop/${id}/offers`}>
                        <Tag className="h-4 w-4 mr-2" />
                        Go to Offers
                      </Link>
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="leads" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center">View and manage leads in the Leads tab</p>
                  <div className="flex justify-center mt-4">
                    <Button asChild>
                      <Link to={`/workshop/${id}/leads`}>
                        <Users className="h-4 w-4 mr-2" />
                        Go to Leads
                      </Link>
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="gmb" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center">Google My Business integration coming soon</p>
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
