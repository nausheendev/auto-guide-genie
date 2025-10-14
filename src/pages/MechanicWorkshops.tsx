import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, MapPin, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MechanicWorkshops() {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      name: "AutoFix Pro Workshop",
      address: "123 Main Street, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      status: "active"
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const handleAddWorkshop = () => {
    toast({
      title: "Workshop Added",
      description: "New workshop has been added successfully",
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workshop Listings</h2>
          <p className="text-muted-foreground mt-1">
            Manage your workshop locations and details
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Workshop
        </Button>
      </div>

      <Separator />

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Workshop</CardTitle>
            <CardDescription>Enter your workshop details or search from Google</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-workshop">Search Workshop on Google Maps</Label>
              <div className="flex gap-2">
                <Input
                  id="search-workshop"
                  placeholder="Enter workshop name..."
                />
                <Button variant="outline">Search</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Using Google Maps API (demo mode)
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workshop-name">Workshop Name</Label>
                <Input id="workshop-name" placeholder="e.g., AutoFix Pro" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-address">Address</Label>
                <Textarea id="workshop-address" placeholder="Full address..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workshop-phone">Phone</Label>
                  <Input id="workshop-phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-email">Email</Label>
                  <Input id="workshop-email" type="email" placeholder="contact@workshop.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-desc">Description</Label>
                <Textarea id="workshop-desc" placeholder="Brief description of your workshop..." rows={3} />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddWorkshop}>
                Add Workshop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {workshops.map((workshop) => (
          <Card key={workshop.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {workshop.name}
                    <Badge variant={workshop.status === "active" ? "default" : "secondary"}>
                      {workshop.status}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{workshop.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {workshop.address}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Plus className="h-4 w-4" />
                  {workshop.phone}
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage Offers
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Leads
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}