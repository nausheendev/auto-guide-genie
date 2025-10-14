import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MechanicLeads() {
  const navigate = useNavigate();

  const [leads] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      service: "Brake Pad Replacement",
      vehicle: "2020 Honda Civic",
      status: "new",
      date: "2025-01-10",
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 987-6543",
      service: "Oil Change",
      vehicle: "2019 Toyota Camry",
      status: "contacted",
      date: "2025-01-09",
      location: "Brooklyn, NY"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive", icon: any }> = {
      new: { variant: "default", icon: Clock },
      contacted: { variant: "secondary", icon: Mail },
      converted: { variant: "default", icon: CheckCircle2 },
      lost: { variant: "destructive", icon: XCircle }
    };

    const config = variants[status] || variants.new;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customer Leads</h2>
        <p className="text-muted-foreground mt-1">Manage and track customer inquiries</p>
      </div>

      <Separator />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All Leads</TabsTrigger>
          <TabsTrigger value="new" className="text-xs sm:text-sm">New</TabsTrigger>
          <TabsTrigger value="contacted" className="text-xs sm:text-sm">Contacted</TabsTrigger>
          <TabsTrigger value="converted" className="text-xs sm:text-sm">Converted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {lead.name}
                      {getStatusBadge(lead.status)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {lead.service} - {lead.vehicle}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate(`/leads/${lead.id}`)}>
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {lead.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {lead.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(lead.date).toLocaleDateString()}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Call Customer</span>
                    <span className="sm:hidden">Call</span>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Send Email</span>
                    <span className="sm:hidden">Email</span>
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    <span className="hidden sm:inline">Mark as Converted</span>
                    <span className="sm:hidden">Converted</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <p className="text-muted-foreground text-center py-8">New leads will appear here</p>
        </TabsContent>

        <TabsContent value="contacted" className="mt-6">
          <p className="text-muted-foreground text-center py-8">Contacted leads will appear here</p>
        </TabsContent>

        <TabsContent value="converted" className="mt-6">
          <p className="text-muted-foreground text-center py-8">Converted leads will appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
