import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, MapPin, Wrench, Clock, CheckCircle2, TrendingUp } from "lucide-react";

const CategoryHub = () => {
  const { categorySlug = "repairs" } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Category configuration
  const categoryConfig: Record<string, { title: string; description: string; serviceType: string }> = {
    repairs: {
      title: "Auto Repair Services",
      description: "Find trusted auto repair services in your city. From brake repairs to engine diagnostics, connect with certified mechanics nationwide.",
      serviceType: "Auto Repair Services"
    },
    maintenance: {
      title: "Auto Maintenance Services",
      description: "Keep your vehicle running smoothly with professional maintenance services. Oil changes, tire rotations, and preventive care from local experts.",
      serviceType: "Auto Maintenance Services"
    },
    installation: {
      title: "Auto Installation Services",
      description: "Professional installation services for all vehicle components. Expert mechanics for parts installation, upgrades, and replacements.",
      serviceType: "Auto Installation Services"
    }
  };

  const category = categoryConfig[categorySlug] || categoryConfig.repairs;

  // Popular cities
  const popularCities = [
    { name: "Los Angeles", slug: "los-angeles", state: "CA", mechanics: 450 },
    { name: "New York", slug: "new-york", state: "NY", mechanics: 520 },
    { name: "Chicago", slug: "chicago", state: "IL", mechanics: 380 },
    { name: "Houston", slug: "houston", state: "TX", mechanics: 340 },
    { name: "Phoenix", slug: "phoenix", state: "AZ", mechanics: 280 },
    { name: "Philadelphia", slug: "philadelphia", state: "PA", mechanics: 290 },
    { name: "San Antonio", slug: "san-antonio", state: "TX", mechanics: 220 },
    { name: "San Diego", slug: "san-diego", state: "CA", mechanics: 310 },
    { name: "Dallas", slug: "dallas", state: "TX", mechanics: 330 },
    { name: "San Jose", slug: "san-jose", state: "CA", mechanics: 250 },
    { name: "Austin", slug: "austin", state: "TX", mechanics: 260 },
    { name: "Jacksonville", slug: "jacksonville", state: "FL", mechanics: 180 }
  ];

  // Popular services
  const popularServices = [
    { name: "Brake Repair", slug: "brake-repair", icon: "🛑", count: "12,450+" },
    { name: "Oil Change", slug: "oil-change", icon: "🛢️", count: "18,200+" },
    { name: "Engine Diagnostics", slug: "engine-diagnostics", icon: "🔧", count: "9,800+" },
    { name: "Transmission Repair", slug: "transmission-repair", icon: "⚙️", count: "7,300+" },
    { name: "AC Repair", slug: "ac-repair", icon: "❄️", count: "8,900+" },
    { name: "Tire Replacement", slug: "tire-replacement", icon: "🚗", count: "15,600+" },
    { name: "Battery Replacement", slug: "battery-replacement", icon: "🔋", count: "11,200+" },
    { name: "Wheel Alignment", slug: "wheel-alignment", icon: "🎯", count: "10,400+" },
    { name: "Suspension Repair", slug: "suspension-repair", icon: "🔩", count: "6,700+" },
    { name: "Exhaust Repair", slug: "exhaust-repair", icon: "💨", count: "5,900+" },
    { name: "Coolant Flush", slug: "coolant-flush", icon: "🌡️", count: "7,800+" },
    { name: "Steering Repair", slug: "steering-repair", icon: "🚘", count: "5,200+" }
  ];

  const filteredCities = popularCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canonicalUrl = `https://autogos.com/${categorySlug}`;
  const pageTitle = `${category.title} | Find Local Mechanics - AutoGos`;
  const pageDescription = category.description;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <SchemaMarkup
        type="breadcrumb"
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: category.title, url: `/${categorySlug}` }
          ]
        }}
      />

      <SchemaMarkup
        type="service"
        data={{
          serviceType: category.serviceType,
          provider: "AutoGos",
          areaServed: "United States"
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {category.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">5,000+ Certified Mechanics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-medium">150,000+ Services Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* City Selector */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Select Your City</h2>
                  <p className="text-muted-foreground">Find trusted mechanics in your area</p>
                </div>

                <div className="mb-6 max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for your city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/${categorySlug}/${city.slug}`}
                      className="group"
                    >
                      <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {city.name}
                              </CardTitle>
                              <CardDescription className="text-sm">{city.state}</CardDescription>
                            </div>
                            <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Wrench className="h-4 w-4" />
                            <span>{city.mechanics} mechanics</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Popular Services */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Popular Services</h2>
                  <p className="text-muted-foreground">Browse our most requested auto services</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {popularServices.map((service) => (
                    <Card key={service.slug} className="group hover:shadow-lg transition-all hover:border-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{service.icon}</span>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {service.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          {service.count} completed
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Select a city above to view service-specific pages and find local mechanics
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">How It Works</h2>
                  <p className="text-muted-foreground">Get your vehicle serviced in three simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Choose Your City</h3>
                    <p className="text-muted-foreground">
                      Select your location to find certified mechanics near you
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Select Service</h3>
                    <p className="text-muted-foreground">
                      Browse available services and compare local mechanics
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Get It Done</h3>
                    <p className="text-muted-foreground">
                      Book your appointment and get your vehicle serviced
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="py-12 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                    <p className="text-muted-foreground">Certified Mechanics</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">150,000+</div>
                    <p className="text-muted-foreground">Services Completed</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <p className="text-muted-foreground">Cities Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryHub;
