import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, ExternalLink, MapPin, Star, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WorkshopSearchStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function WorkshopSearchStep({ onNext, initialData }: WorkshopSearchStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [gmbLink, setGmbLink] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(initialData || null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: "AutoFix Pro Workshop",
      address: "123 Main Street, New York, NY 10001",
      rating: 4.8,
      reviews: 127,
      verified: true,
      services: ["Oil Change", "Brake Service", "Engine Repair", "Tire Rotation", "AC Service"]
    },
    {
      id: 2,
      name: "Quick Auto Service Center",
      address: "456 Park Avenue, New York, NY 10002",
      rating: 4.6,
      reviews: 89,
      verified: true,
      services: ["General Maintenance", "Diagnostics", "Electrical Work", "Suspension"]
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} workshops matching "${searchQuery}"`,
      });
    }, 1000);
  };

  const handleFetchFromLink = () => {
    if (!gmbLink) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setSelectedWorkshop(mockResults[0]);
      setIsSearching(false);
      toast({
        title: "Workshop Fetched",
        description: "Successfully fetched workshop details from GMB link",
      });
    }, 1000);
  };

  const handleSelectWorkshop = (workshop: any) => {
    setSelectedWorkshop(workshop);
    toast({
      title: "Workshop Selected",
      description: `Selected ${workshop.name}`,
    });
  };

  const handleContinue = () => {
    if (!selectedWorkshop) {
      toast({
        title: "No Workshop Selected",
        description: "Please select a workshop to continue",
        variant: "destructive",
      });
      return;
    }
    onNext(selectedWorkshop);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="search">Search Workshop by Name</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="search"
              placeholder="Enter workshop name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div>
          <Label htmlFor="gmb-link">Enter Google My Business Profile Link</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="gmb-link"
              placeholder="https://maps.google.com/..."
              value={gmbLink}
              onChange={(e) => setGmbLink(e.target.value)}
            />
            <Button onClick={handleFetchFromLink} disabled={isSearching || !gmbLink}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Fetch
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && !selectedWorkshop && (
        <div className="space-y-3">
          <h3 className="font-semibold">Search Results</h3>
          {mockResults.map((workshop) => (
            <Card 
              key={workshop.id} 
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSelectWorkshop(workshop)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    {workshop.name}
                    {workshop.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{workshop.rating}</span>
                    <span className="text-sm text-muted-foreground">({workshop.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {workshop.address}
                  </div>
                </div>
                <Button size="sm" variant="outline">Select</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Selected Workshop */}
      {selectedWorkshop && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Selected Workshop</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedWorkshop(null)}>
              Change
            </Button>
          </div>
          <Card className="p-4 border-primary">
            <h4 className="font-semibold flex items-center gap-2">
              {selectedWorkshop.name}
              <Badge variant="secondary" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Selected
              </Badge>
            </h4>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{selectedWorkshop.rating}</span>
              <span className="text-sm text-muted-foreground">({selectedWorkshop.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {selectedWorkshop.address}
            </div>
            
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Services Offered</h5>
              <div className="flex flex-wrap gap-2">
                {selectedWorkshop.services.map((service: string, index: number) => (
                  <Badge key={index} variant="outline">{service}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} size="lg" disabled={!selectedWorkshop}>
          Continue to Offers
        </Button>
      </div>
    </div>
  );
}
