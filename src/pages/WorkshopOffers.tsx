import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react";

export default function WorkshopOffers() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "20% Off Oil Change",
      description: "Get 20% discount on standard oil change service",
      discount: "20%",
      validUntil: "2025-12-31",
      enabled: true
    },
    {
      id: 2,
      title: "Free Brake Inspection",
      description: "Complimentary brake system inspection with any service",
      discount: "Free",
      validUntil: "2025-11-30",
      enabled: true
    },
    {
      id: 3,
      title: "Summer AC Service Special",
      description: "AC service and recharge at special rates",
      discount: "15%",
      validUntil: "2025-08-31",
      enabled: false
    }
  ]);

  const workshopName = "AutoFix Pro Workshop";

  const toggleOfferStatus = (offerId: number) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, enabled: !offer.enabled } : offer
    ));
  };

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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Workshop Offers</h1>
              <p className="text-muted-foreground mt-1">{workshopName}</p>
            </div>
            <Button onClick={() => navigate("/mechanic-offers")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Offer
            </Button>
          </div>

          {offers.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground">No offers for this workshop yet.</p>
              <Button className="mt-4" onClick={() => navigate("/mechanic-offers")}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Offer
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{offer.title}</h3>
                          <Badge variant={offer.enabled ? "default" : "secondary"}>
                            {offer.enabled ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-2">{offer.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                          <span className="font-medium text-primary">{offer.discount}</span>
                          <span className="text-muted-foreground">
                            Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={offer.enabled}
                          onCheckedChange={() => toggleOfferStatus(offer.id)}
                        />
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
