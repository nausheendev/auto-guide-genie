import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState(currentLocation);
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In production, you'd reverse geocode these coordinates
            // For now, we'll use a mock location
            const mockLocation = "Current Location";
            setManualLocation(mockLocation);
            onLocationChange(mockLocation);
            setIsDetecting(false);
            setIsOpen(false);
            toast({
              title: "Location detected",
              description: "Your current location has been set",
            });
          } catch (error) {
            setIsDetecting(false);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to get location details",
            });
          }
        },
        (error) => {
          setIsDetecting(false);
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please enable location services or enter manually",
          });
        }
      );
    } else {
      setIsDetecting(false);
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
      });
    }
  };

  const handleManualSubmit = () => {
    if (manualLocation.trim()) {
      onLocationChange(manualLocation);
      setIsOpen(false);
      toast({
        title: "Location updated",
        description: `Set to ${manualLocation}`,
      });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocation}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Set Your Location</h4>
            <p className="text-sm text-muted-foreground">
              Enter your city or use current location
            </p>
          </div>
          
          <div className="space-y-2">
            <Input
              placeholder="Enter city name..."
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
            />
            <Button 
              onClick={handleManualSubmit} 
              className="w-full"
              variant="default"
            >
              Set Location
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-popover px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button 
            onClick={detectCurrentLocation} 
            className="w-full"
            variant="outline"
            disabled={isDetecting}
          >
            {isDetecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-2" />
                Use Current Location
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};