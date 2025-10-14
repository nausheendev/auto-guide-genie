import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function MechanicLeads() {
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
        <p className="text-muted-foreground mt-1">
          Manage and track customer inquiries
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="converted">Converted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {lead.name}
                      {getStatusBadge(lead.status)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {lead.service} - {lead.vehicle}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Mark as Converted
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <p className="text-muted-foreground text-center py-8">
            New leads will appear here
          </p>
        </TabsContent>

        <TabsContent value="contacted" className="mt-6">
          <p className="text-muted-foreground text-center py-8">
            Contacted leads will appear here
          </p>
        </TabsContent>

        <TabsContent value="converted" className="mt-6">
          <p className="text-muted-foreground text-center py-8">
            Converted leads will appear here
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}