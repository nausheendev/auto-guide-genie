import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OffersStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function OffersStep({ onNext, onBack, initialData }: OffersStepProps) {
  const [offers, setOffers] = useState(initialData || []);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: "",
    enabled: true
  });

  const handleAddOffer = () => {
    if (editingIndex !== null) {
      const updatedOffers = [...offers];
      updatedOffers[editingIndex] = formData;
      setOffers(updatedOffers);
      setEditingIndex(null);
    } else {
      setOffers([...offers, formData]);
    }
    setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(offers[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    setOffers(offers.filter((_: any, i: number) => i !== index));
  };

  const toggleOfferStatus = (index: number) => {
    const updatedOffers = [...offers];
    updatedOffers[index].enabled = !updatedOffers[index].enabled;
    setOffers(updatedOffers);
  };

  const handleContinue = () => {
    onNext(offers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Create Offers</h3>
          <p className="text-sm text-muted-foreground">Add special offers for your customers (optional)</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
        </Button>
      </div>

      {/* Add/Edit Offer Form */}
      {showForm && (
        <Card className="p-4 border-primary">
          <h4 className="font-semibold mb-4">{editingIndex !== null ? "Edit Offer" : "New Offer"}</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Offer Title</Label>
              <Input
                id="title"
                placeholder="e.g., 20% Off Oil Change"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the offer details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  placeholder="e.g., 20%"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">Enable Offer</Label>
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddOffer} disabled={!formData.title}>
                {editingIndex !== null ? "Update Offer" : "Add Offer"}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowForm(false);
                setEditingIndex(null);
                setFormData({ title: "", description: "", discount: "", validUntil: "", enabled: true });
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Offers List */}
      {offers.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">Your Offers ({offers.length})</h4>
          {offers.map((offer: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold">{offer.title}</h5>
                    <Badge variant={offer.enabled ? "default" : "secondary"}>
                      {offer.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="font-medium text-primary">{offer.discount}</span>
                    {offer.validUntil && (
                      <span className="text-muted-foreground">Valid until: {offer.validUntil}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={offer.enabled}
                    onCheckedChange={() => toggleOfferStatus(index)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(index)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {offers.length === 0 && !showForm && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No offers created yet. Add your first offer to attract customers!</p>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          <span className="hidden sm:inline">Continue to Contact Details</span>
          <span className="sm:hidden">Next Step</span>
        </Button>
      </div>
    </div>
  );
}
