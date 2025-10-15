import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Tag, Users, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddWorkshopOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Offer Created",
      description: "Your offer has been created successfully.",
    });
    navigate(`/workshop/${id}/offers`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard showMechanicButton={false} />

            <Separator />

            <Tabs defaultValue="offers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="workshops" className="text-xs sm:text-sm">Workshop</TabsTrigger>
                <TabsTrigger value="offers" className="text-xs sm:text-sm">Offers</TabsTrigger>
                <TabsTrigger value="leads" className="text-xs sm:text-sm">Leads</TabsTrigger>
                <TabsTrigger value="gmb" className="text-xs sm:text-sm">GMB</TabsTrigger>
              </TabsList>

              <TabsContent value="workshops" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center">View workshop details</p>
                  <div className="flex justify-center mt-4">
                    <Button asChild>
                      <Link to={`/workshop/${id}`}>
                        <Wrench className="h-4 w-4 mr-2" />
                        Go to Workshop
                      </Link>
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="offers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Add New Offer</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Offer Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g., 20% Off Oil Change"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          placeholder="Describe your offer in detail"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discount">Discount</Label>
                          <Input
                            id="discount"
                            value={formData.discount}
                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                            placeholder="e.g., 20% or $50"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="validUntil">Valid Until</Label>
                          <Input
                            id="validUntil"
                            type="date"
                            value={formData.validUntil}
                            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => navigate(`/workshop/${id}/offers`)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Create Offer
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leads" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center">View and manage leads</p>
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
