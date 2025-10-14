import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, Mail, Clock, Car } from "lucide-react";

export default function WorkshopLeads() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const leads = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      service: "Brake Pad Replacement",
      vehicle: "2020 Honda Civic",
      contactNumber: "+1 (555) 234-5678",
      email: "sarah.j@email.com",
      date: "2025-01-15",
      status: "new",
      message: "Need brake pads replaced soon, hearing squeaking noise"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      service: "Oil Change",
      vehicle: "2019 Toyota Camry",
      contactNumber: "+1 (555) 345-6789",
      email: "mike.chen@email.com",
      date: "2025-01-14",
      status: "contacted",
      message: "Regular oil change needed"
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      service: "Engine Diagnostics",
      vehicle: "2021 Ford F-150",
      contactNumber: "+1 (555) 456-7890",
      email: "emily.r@email.com",
      date: "2025-01-13",
      status: "converted",
      message: "Check engine light is on"
    }
  ];

  const workshopName = "AutoFix Pro Workshop";

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline", label: string }> = {
      new: { variant: "default", label: "New" },
      contacted: { variant: "secondary", label: "Contacted" },
      converted: { variant: "outline", label: "Converted" }
    };
    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filterLeads = (status?: string) => {
    if (!status) return leads;
    return leads.filter(lead => lead.status === status);
  };

  const LeadCard = ({ lead }: { lead: typeof leads[0] }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{lead.customerName}</h3>
                {getStatusBadge(lead.status)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{lead.service}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              {lead.vehicle}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {lead.contactNumber}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              {lead.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {new Date(lead.date).toLocaleDateString()}
            </div>
          </div>

          {lead.message && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{lead.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <Button variant="default" size="sm" className="w-full">
              <span className="hidden sm:inline">Contact Customer</span>
              <span className="sm:hidden">Contact</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <span className="hidden sm:inline">Mark as Converted</span>
              <span className="sm:hidden">Converted</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold">Workshop Leads</h1>
            <p className="text-muted-foreground mt-1">{workshopName}</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All ({leads.length})</TabsTrigger>
              <TabsTrigger value="new" className="text-xs sm:text-sm">New ({filterLeads('new').length})</TabsTrigger>
              <TabsTrigger value="contacted" className="text-xs sm:text-sm">Contacted ({filterLeads('contacted').length})</TabsTrigger>
              <TabsTrigger value="converted" className="text-xs sm:text-sm">Converted ({filterLeads('converted').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-4">
              {leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
            </TabsContent>

            <TabsContent value="new" className="mt-6 space-y-4">
              {filterLeads('new').map(lead => <LeadCard key={lead.id} lead={lead} />)}
            </TabsContent>

            <TabsContent value="contacted" className="mt-6 space-y-4">
              {filterLeads('contacted').map(lead => <LeadCard key={lead.id} lead={lead} />)}
            </TabsContent>

            <TabsContent value="converted" className="mt-6 space-y-4">
              {filterLeads('converted').map(lead => <LeadCard key={lead.id} lead={lead} />)}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
