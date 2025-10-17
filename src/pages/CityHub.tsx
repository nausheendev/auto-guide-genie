import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, MapPin, Star, DollarSign, ThermometerSun, CloudRain, TrendingUp, Navigation } from "lucide-react";

const CityHub = () => {
  const { categorySlug = "repairs", citySlug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // City data (would come from database in production)
  const cityData: Record<string, { name: string; state: string; mechanics: number; avgCost: string; climate: string }> = {
    "los-angeles": { name: "Los Angeles", state: "CA", mechanics: 450, avgCost: "$120-$180", climate: "Mediterranean" },
    "new-york": { name: "New York", state: "NY", mechanics: 520, avgCost: "$140-$200", climate: "Humid Continental" },
    "chicago": { name: "Chicago", state: "IL", mechanics: 380, avgCost: "$130-$190", climate: "Continental" },
    "houston": { name: "Houston", state: "TX", mechanics: 340, avgCost: "$110-$170", climate: "Humid Subtropical" },
  };

  const city = cityData[citySlug || "los-angeles"] || cityData["los-angeles"];

  const categoryConfig: Record<string, { title: string; description: string }> = {
    repairs: { title: "Auto Repair", description: "repair services" },
    maintenance: { title: "Auto Maintenance", description: "maintenance services" },
    installation: { title: "Auto Installation", description: "installation services" }
  };

  const category = categoryConfig[categorySlug] || categoryConfig.repairs;

  // Popular services in this city
  const popularServices = [
    { name: "Brake Repair", slug: "brake-repair", avgCost: "$150-$300", mechanics: 45 },
    { name: "Oil Change", slug: "oil-change", avgCost: "$40-$80", mechanics: 52 },
    { name: "Engine Diagnostics", slug: "engine-diagnostics", avgCost: "$100-$200", mechanics: 38 },
    { name: "Transmission Repair", slug: "transmission-repair", avgCost: "$400-$1200", mechanics: 28 },
    { name: "AC Repair", slug: "ac-repair", avgCost: "$150-$400", mechanics: 35 },
    { name: "Tire Replacement", slug: "tire-replacement", avgCost: "$300-$600", mechanics: 48 },
    { name: "Battery Replacement", slug: "battery-replacement", avgCost: "$100-$200", mechanics: 42 },
    { name: "Wheel Alignment", slug: "wheel-alignment", avgCost: "$75-$150", mechanics: 40 },
    { name: "Suspension Repair", slug: "suspension-repair", avgCost: "$200-$500", mechanics: 30 },
    { name: "Exhaust Repair", slug: "exhaust-repair", avgCost: "$150-$400", mechanics: 25 },
    { name: "Coolant Flush", slug: "coolant-flush", avgCost: "$80-$150", mechanics: 36 },
    { name: "Steering Repair", slug: "steering-repair", avgCost: "$200-$600", mechanics: 22 }
  ];

  // Top mechanics in the city
  const topMechanics = [
    { name: `${city.name} Auto Care`, address: "123 Main St", rating: 4.8, reviewCount: 234, priceRange: "$$" },
    { name: `Premium Auto ${city.name}`, address: "456 Oak Ave", rating: 4.6, reviewCount: 189, priceRange: "$$$" },
    { name: `Quick Fix Auto`, address: "789 Elm St", rating: 4.7, reviewCount: 156, priceRange: "$$" },
    { name: `${city.name} Car Clinic`, address: "321 Pine Rd", rating: 4.9, reviewCount: 298, priceRange: "$$" },
    { name: `Expert Auto Repair`, address: "654 Cedar Ln", rating: 4.5, reviewCount: 142, priceRange: "$" }
  ];

  // Popular vehicle makes/models in this city
  const popularVehicles = [
    { make: "Toyota", model: "Camry", slug: "toyota/camry" },
    { make: "Honda", model: "Civic", slug: "honda/civic" },
    { make: "Ford", model: "F-150", slug: "ford/f-150" },
    { make: "Chevrolet", model: "Silverado", slug: "chevrolet/silverado" }
  ];

  // Related cities
  const relatedCities = [
    { name: "San Diego", slug: "san-diego" },
    { name: "Phoenix", slug: "phoenix" },
    { name: "Las Vegas", slug: "las-vegas" }
  ];

  // City-specific FAQs
  const faqs = [
    { 
      question: `What is the average cost of auto repair in ${city.name}?`, 
      answer: `The average cost of auto repair services in ${city.name} ranges from ${city.avgCost}, depending on the type of service and vehicle make/model.` 
    },
    { 
      question: `How many certified mechanics are in ${city.name}?`, 
      answer: `There are over ${city.mechanics} certified auto mechanics and repair shops serving the ${city.name} area.` 
    },
    { 
      question: `Does ${city.name}'s climate affect my vehicle?`, 
      answer: `Yes, ${city.name}'s ${city.climate} climate can impact your vehicle's performance. Regular maintenance is essential to protect against local weather conditions.` 
    },
    { 
      question: `What are the most common auto repairs in ${city.name}?`, 
      answer: `The most common auto repairs in ${city.name} include brake services, oil changes, AC repairs, and tire replacements due to local driving conditions.` 
    },
    { 
      question: `Can I find mechanics for specific car brands in ${city.name}?`, 
      answer: `Yes, ${city.name} has specialists for all major brands including Toyota, Honda, Ford, and Chevrolet, as well as European and luxury vehicles.` 
    }
  ];

  const filteredServices = popularServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canonicalUrl = `https://autogos.com/${categorySlug}/${citySlug}`;
  const pageTitle = `${category.title} Services in ${city.name}, ${city.state} | AutoGos`;
  const pageDescription = `Find trusted ${category.description} in ${city.name}, ${city.state}. ${city.mechanics}+ certified mechanics. Compare prices, read reviews, and book appointments.`;

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
            { name: category.title, url: `/${categorySlug}` },
            { name: city.name, url: `/${categorySlug}/${citySlug}` }
          ]
        }}
      />

      <SchemaMarkup
        type="localbusiness"
        data={{
          businesses: topMechanics.map(mechanic => ({
            name: mechanic.name,
            address: mechanic.address,
            city: city.name,
            state: city.state,
            zip: "00000",
            rating: mechanic.rating,
            reviewCount: mechanic.reviewCount,
            priceRange: mechanic.priceRange
          }))
        }}
      />

      <SchemaMarkup
        type="faq"
        data={{ faqs }}
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
                  <BreadcrumbLink asChild>
                    <Link to={`/${categorySlug}`}>{category.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{city.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                  {category.title} Services in {city.name}, {city.state}
                </h1>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Connect with {city.mechanics}+ certified mechanics in {city.name}. Get transparent pricing, read verified reviews, and book trusted {category.description} near you.
                </p>

                {/* Key City Data */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Mechanics</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{city.mechanics}+</p>
                      <p className="text-sm text-muted-foreground">Certified professionals</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Avg. Cost</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{city.avgCost}</p>
                      <p className="text-sm text-muted-foreground">For standard services</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <ThermometerSun className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Climate</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{city.climate}</p>
                      <p className="text-sm text-muted-foreground">Seasonal impact</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Service Finder */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Find Your Service</h2>
                  <p className="text-muted-foreground">Browse popular auto services in {city.name}</p>
                </div>

                <div className="mb-6 max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/${categorySlug}/${citySlug}/${service.slug}`}
                      className="group"
                    >
                      <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {service.name}
                          </CardTitle>
                          <CardDescription className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.avgCost}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{service.mechanics} local mechanics</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Top Mechanics */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Top Rated Mechanics in {city.name}</h2>
                  <p className="text-muted-foreground">Trusted auto repair shops near you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topMechanics.map((mechanic, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <MapPin className="h-3 w-3" />
                              {mechanic.address}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">{mechanic.priceRange}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold">{mechanic.rating}</span>
                            <span className="text-sm text-muted-foreground">({mechanic.reviewCount} reviews)</span>
                          </div>
                          <Navigation className="h-4 w-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Popular Vehicles */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Popular Vehicles in {city.name}</h2>
                  <p className="text-muted-foreground">Find specialists for your vehicle make and model</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {popularVehicles.map((vehicle) => (
                    <Link
                      key={vehicle.slug}
                      to={`/${categorySlug}/${citySlug}/${vehicle.slug}`}
                      className="group"
                    >
                      <Card className="text-center hover:shadow-lg hover:border-primary transition-all">
                        <CardHeader>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {vehicle.make}
                          </CardTitle>
                          <CardDescription className="text-sm">{vehicle.model}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">Common questions about auto services in {city.name}</p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Cities */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Nearby Cities</h2>
                  <p className="text-muted-foreground">Explore auto services in other areas</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCities.map((relatedCity) => (
                    <Link
                      key={relatedCity.slug}
                      to={`/${categorySlug}/${relatedCity.slug}`}
                      className="group"
                    >
                      <Card className="text-center hover:shadow-lg hover:border-primary transition-all">
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {relatedCity.name}
                          </CardTitle>
                          <CardDescription>
                            View {category.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
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

export default CityHub;
