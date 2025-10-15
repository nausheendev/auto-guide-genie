import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Gauge, DollarSign, ExternalLink } from "lucide-react";

interface UsedCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image?: string;
  dealerName: string;
  condition: string;
}

interface UsedCarsSectionProps {
  city: string;
  cars?: UsedCar[];
}

export const UsedCarsSection = ({ city, cars }: UsedCarsSectionProps) => {
  // Mock data - in production, fetch from database/API
  const mockCars: UsedCar[] = cars || [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      price: 24999,
      mileage: 35000,
      location: city,
      dealerName: `${city} Auto Sales`,
      condition: "Excellent"
    },
    {
      id: "2",
      make: "Honda",
      model: "Accord",
      year: 2019,
      price: 22500,
      mileage: 42000,
      location: city,
      dealerName: `Premium Motors ${city}`,
      condition: "Very Good"
    },
    {
      id: "3",
      make: "Ford",
      model: "F-150",
      year: 2021,
      price: 32000,
      mileage: 28000,
      location: city,
      dealerName: `${city} Truck Center`,
      condition: "Excellent"
    },
    {
      id: "4",
      make: "Chevrolet",
      model: "Silverado",
      year: 2020,
      price: 29999,
      mileage: 38000,
      location: city,
      dealerName: `AutoHub ${city}`,
      condition: "Good"
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Used Cars for Sale in {city}</h2>
          <p className="text-muted-foreground">
            Browse quality pre-owned vehicles available in {city}. All vehicles inspected and ready to drive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <Badge className="absolute top-2 right-2 bg-primary">
                  {car.condition}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <CardDescription className="text-2xl font-bold text-primary">
                  ${car.price.toLocaleString()}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span>{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{car.dealerName}</span>
                </div>

                <Button className="w-full" variant="default">
                  View Details
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All {city} Used Cars
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
