import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit2, Trash2, Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MechanicOffers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingOffer, setEditingOffer] = useState<any>(null);
  const { toast } = useToast();

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "20% Off Oil Change",
      description: "Get 20% discount on all oil change services this month",
      discount: "20%",
      validUntil: "2025-11-30",
      enabled: true,
      workshop: "AutoFix Pro Workshop"
    },
    {
      id: 2,
      title: "Free Brake Inspection",
      description: "Complimentary brake system inspection with any service",
      discount: "Free",
      validUntil: "2025-12-15",
      enabled: true,
      workshop: "AutoFix Pro Workshop"
    },
    {
      id: 3,
      title: "Winter Service Package",
      description: "Complete winter maintenance package at special price",
      discount: "$50 off",
      validUntil: "2025-11-15",
      enabled: false,
      workshop: "Quick Auto Service"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: "",
    enabled: true
  });

  const handleAddOffer = () => {
    const newOffer = {
      id: offers.length + 1,
      ...formData,
      workshop: "AutoFix Pro Workshop"
    };
    setOffers([...offers, newOffer]);
    setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
    setShowAddForm(false);
    toast({
      title: "Offer Created",
      description: "Your offer has been successfully created",
    });
  };

  const handleUpdateOffer = () => {
    setOffers(offers.map(offer => 
      offer.id === editingOffer.id ? { ...editingOffer, ...formData } : offer
    ));
    setEditingOffer(null);
    setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
    setShowAddForm(false);
    toast({
      title: "Offer Updated",
      description: "Your offer has been successfully updated",
    });
  };

  const handleEdit = (offer: any) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      validUntil: offer.validUntil,
      enabled: offer.enabled
    });
    setShowAddForm(true);
  };

  const handleDelete = (offerId: number) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
    toast({
      title: "Offer Deleted",
      description: "The offer has been removed",
    });
  };

  const toggleOfferStatus = (offerId: number) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, enabled: !offer.enabled } : offer
    ));
  };

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Manage Offers</h2>
                <p className="text-muted-foreground mt-1">
                  Create and manage special offers for your workshops
                </p>
              </div>
              <Button onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingOffer(null);
                setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Offer</span>
                <span className="sm:inline">Add</span>
              </Button>
            </div>

            <Separator />

            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingOffer ? "Edit Offer" : "Create New Offer"}</CardTitle>
                  <CardDescription>
                    {editingOffer ? "Update the offer details" : "Add a special offer to attract customers"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Offer Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 20% Off Oil Change"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the offer details..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="discount">Discount *</Label>
                      <Input
                        id="discount"
                        placeholder="e.g., 20% or $50 off"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="validUntil">Valid Until *</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={formData.validUntil}
                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="enabled">Enable Offer</Label>
                    <Switch
                      id="enabled"
                      checked={formData.enabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={editingOffer ? handleUpdateOffer : handleAddOffer}
                      disabled={!formData.title || !formData.description || !formData.discount}
                    >
                      {editingOffer ? "Update Offer" : "Create Offer"}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setShowAddForm(false);
                      setEditingOffer(null);
                      setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
                    }}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>All Offers ({filteredOffers.length})</CardTitle>
                <CardDescription>View and manage your active and inactive offers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search offers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredOffers.map((offer) => (
                    <Card key={offer.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{offer.title}</h3>
                            <Badge variant={offer.enabled ? "default" : "secondary"}>
                              {offer.enabled ? "Active" : "Inactive"}
                            </Badge>
                            <span className="font-medium text-primary">{offer.discount}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{offer.workshop}</span>
                            {offer.validUntil && (
                              <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex w-full flex-wrap items-center justify-between gap-2">
                          <Switch
                            checked={offer.enabled}
                            onCheckedChange={() => toggleOfferStatus(offer.id)}
                          />
                          <div className="flex gap-2 shrink-0">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(offer)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(offer.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {filteredOffers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No offers found. Create your first offer to attract customers!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
