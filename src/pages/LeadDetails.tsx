import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Car, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock lead data for demo (would come from backend later)
  const lead = {
    id,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    service: "Brake Pad Replacement",
    vehicle: "2020 Honda Civic",
    status: "new",
    date: "2025-01-10",
    location: "New York, NY",
    message: "Hearing a squeaking noise while braking. Need replacement soon."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Lead #{lead.id}: {lead.name}</CardTitle>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span>{lead.service} — {lead.vehicle}</span>
                  </div>
                </div>
                <Badge variant="default" className="shrink-0">{lead.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{lead.email}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{lead.phone}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Car className="h-4 w-4" />{lead.vehicle}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{lead.location}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{new Date(lead.date).toLocaleDateString()}</div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Customer Message</h3>
                <p className="p-3 rounded-md bg-muted text-sm">{lead.message}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button variant="outline" className="w-full">Call</Button>
                <Button variant="outline" className="w-full">Email</Button>
                <Button className="w-full">Mark as Converted</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
