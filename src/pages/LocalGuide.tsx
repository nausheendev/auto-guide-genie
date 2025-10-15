import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { UsedCarsSection } from "@/components/UsedCarsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  MapPin, Clock, DollarSign, CheckCircle2, AlertTriangle, 
  Wrench, Phone, Star, Navigation, TrendingUp, Calendar,
  ThermometerSun, CloudRain, Mountain, Users
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function LocalGuide() {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // In production, fetch this data from database/API
  const city = citySlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Los Angeles';
  const service = serviceSlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Brake Repair';
  const state = 'California'; // Would come from DB
  
  // Mock local data - in production, generate with AI
  const localData = {
    avgCost: { min: 250, max: 450 },
    mechanicCount: 47,
    avgWaitDays: 2,
    climate: "Mediterranean climate with mild, wet winters and hot, dry summers",
    trafficImpact: "Heavy stop-and-go traffic on I-405 and I-10 causes 30% faster brake wear",
    neighborhoods: [
      { name: "Santa Monica", mechanics: 8, avgCost: 320 },
      { name: "Hollywood", mechanics: 12, avgCost: 290 },
      { name: "Downtown LA", mechanics: 15, avgCost: 310 },
      { name: "Venice", mechanics: 6, avgCost: 335 },
      { name: "Pasadena", mechanics: 6, avgCost: 275 }
    ],
    seasonalTip: "Summer heat increases brake fluid evaporation - check levels monthly",
    commonIssue: "Dust and smog accelerate brake pad deterioration in LA County"
  };

  const guideSteps = [
    {
      title: "Prepare Your Vehicle",
      description: "Park on level ground and engage parking brake. Gather all necessary tools.",
      image: "/placeholder.svg",
      duration: "10 min",
      difficulty: "Easy"
    },
    {
      title: "Remove the Wheel",
      description: "Loosen lug nuts, jack up the vehicle, and remove the wheel to access brake components.",
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Medium"
    },
    {
      title: "Remove Old Brake Pads",
      description: "Remove caliper bolts and slide out the old brake pads. Inspect for uneven wear.",
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium"
    },
    {
      title: "Install New Brake Pads",
      description: "Compress the caliper piston, insert new pads, and reassemble the caliper.",
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium"
    },
    {
      title: "Test and Verify",
      description: "Reinstall wheel, lower vehicle, and test brakes in a safe area before normal driving.",
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Easy"
    }
  ];

  const localMechanics = [
    {
      name: "Precision Auto Repair",
      address: "1234 Main St",
      city,
      state,
      zip: "90001",
      phone: "(323) 555-0100",
      rating: 4.8,
      reviewCount: 234,
      distance: "2.3 mi",
      priceRange: "$$",
      specialties: ["Brakes", "Suspension"]
    },
    {
      name: `${city} Brake Masters`,
      address: "5678 Ocean Ave",
      city,
      state,
      zip: "90002",
      phone: "(323) 555-0200",
      rating: 4.6,
      reviewCount: 189,
      distance: "3.1 mi",
      priceRange: "$$$",
      specialties: ["Brakes", "Diagnostics"]
    },
    {
      name: "Quick Fix Auto Service",
      address: "9101 Sunset Blvd",
      city,
      state,
      zip: "90003",
      phone: "(323) 555-0300",
      rating: 4.7,
      reviewCount: 156,
      distance: "1.8 mi",
      priceRange: "$",
      specialties: ["Brakes", "Oil Change"]
    }
  ];

  const localFAQs = [
    {
      question: `Do I need an appointment for brake repair in ${city}?`,
      answer: `Most brake repair shops in ${city} accept walk-ins, but appointments are recommended during peak hours (8-10 AM). Average wait time is ${localData.avgWaitDays} days for scheduled service.`
    },
    {
      question: `What are ${city}'s emissions requirements for brake work?`,
      answer: `${city} follows California's strict emissions standards. Any brake work must not interfere with the ABS system, which is part of the emissions inspection. All shops must be STAR certified.`
    },
    {
      question: `Are there mobile brake repair services in ${city}?`,
      answer: `Yes, several mobile mechanics serve ${city} and can perform brake pad replacement at your location. Expect to pay 10-20% more for mobile service convenience.`
    },
    {
      question: `How does ${city}'s weather affect brake maintenance?`,
      answer: `${localData.climate} means brake components can dry out quickly in summer. The frequent temperature changes between seasons can cause brake fluid to absorb moisture, requiring more frequent flushes.`
    },
    {
      question: `What's the average cost for ${service.toLowerCase()} in ${city}?`,
      answer: `Based on local shop data, ${service.toLowerCase()} costs between $${localData.avgCost.min}-$${localData.avgCost.max} in ${city}, slightly above the national average due to higher labor costs and stricter regulations.`
    }
  ];

  const toggleStepComplete = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const progress = (completedSteps.length / guideSteps.length) * 100;

  return (
    <>
      <Helmet>
        <title>{service} in {city} - Expert DIY Guide & Local Mechanics | AutoGos</title>
        <meta 
          name="description" 
          content={`Complete ${service.toLowerCase()} guide for ${city} drivers. Local cost $${localData.avgCost.min}-$${localData.avgCost.max}. Find ${localData.mechanicCount} certified mechanics, step-by-step instructions.`}
        />
        <meta property="og:title" content={`${service} in ${city} - Local Guide`} />
        <meta property="og:description" content={`Expert ${service.toLowerCase()} guide for ${city}. Find local mechanics, costs, and DIY instructions.`} />
        <link rel="canonical" href={`https://autogos.com/repairs/${citySlug}/${serviceSlug}`} />
      </Helmet>

      {/* All Schema Markups */}
      <SchemaMarkup
        type="breadcrumb"
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Repairs", url: "/repairs" },
            { name: city, url: `/repairs/${citySlug}` },
            { name: service, url: `/repairs/${citySlug}/${serviceSlug}` }
          ]
        }}
      />
      
      <SchemaMarkup
        type="howto"
        data={{
          name: `How to Perform ${service} in ${city}`,
          description: `Complete step-by-step guide for ${service.toLowerCase()} tailored for ${city} drivers, including local considerations and mechanic recommendations.`,
          estimatedCost: localData.avgCost,
          totalTime: "PT1H20M",
          tools: ["Jack and jack stands", "Lug wrench", "C-clamp or brake piston tool", "Socket set"],
          supplies: ["New brake pads", "Brake cleaner", "High-temperature grease"],
          steps: guideSteps.map(step => ({
            name: step.title,
            text: step.description,
            image: step.image,
            url: `${window.location.href}#step-${guideSteps.indexOf(step) + 1}`
          }))
        }}
      />

      <SchemaMarkup
        type="localbusiness"
        data={{ businesses: localMechanics }}
      />

      <SchemaMarkup
        type="faq"
        data={{ faqs: localFAQs }}
      />

      <SchemaMarkup
        type="service"
        data={{
          serviceType: service,
          city,
          state,
          areaServed: `${city}, ${state}`,
          provider: "AutoGos"
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Breadcrumb Navigation */}
          <div className="bg-muted/30 border-b">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/repairs">Repairs</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/repairs/${citySlug}`}>{city}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{service}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Hero Section - Location-Specific */}
          <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">{city}, {state}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {service} in {city}
                </h1>
                
                <p className="text-xl mb-6 text-primary-foreground/90">
                  Complete DIY guide and local mechanic directory for {city} drivers. 
                  Save money or find trusted professionals near you.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-background/10 border-primary-foreground/20">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-2xl font-bold">${localData.avgCost.min}-${localData.avgCost.max}</div>
                      <div className="text-sm text-primary-foreground/80">Local Avg Cost</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/10 border-primary-foreground/20">
                    <CardContent className="p-4 text-center">
                      <Wrench className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{localData.mechanicCount}</div>
                      <div className="text-sm text-primary-foreground/80">Local Mechanics</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/10 border-primary-foreground/20">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{localData.avgWaitDays} days</div>
                      <div className="text-sm text-primary-foreground/80">Avg Wait Time</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/10 border-primary-foreground/20">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-2xl font-bold">80 min</div>
                      <div className="text-sm text-primary-foreground/80">DIY Time</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Local Context Section - AI Generated */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Why {service} Matters in {city}</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ThermometerSun className="h-5 w-5 text-accent" />
                        Climate Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{localData.climate}</p>
                      <p className="mt-3 font-medium">{localData.seasonalTip}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        Traffic Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{localData.trafficImpact}</p>
                      <p className="mt-3 font-medium">{localData.commonIssue}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="prose max-w-none">
                  <p className="text-lg text-muted-foreground">
                    Living in {city} means your vehicle faces unique challenges. The combination of heavy traffic, 
                    diverse terrain, and climate variations requires more frequent brake maintenance compared to 
                    the national average. This guide is specifically tailored for {city} drivers, accounting for 
                    local driving conditions, costs, and regulations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Neighborhood Coverage Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Serving All {city} Neighborhoods</h2>
                <p className="text-muted-foreground mb-6">
                  Find {service.toLowerCase()} services in your area
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localData.neighborhoods.map((neighborhood) => (
                    <Card key={neighborhood.name} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {neighborhood.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mechanics:</span>
                          <span className="font-medium">{neighborhood.mechanics} shops</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg Cost:</span>
                          <span className="font-medium">${neighborhood.avgCost}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Progress Section */}
          <section className="py-8 bg-background border-y">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Your Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps.length} of {guideSteps.length} steps completed
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </section>

          {/* Main Guide Steps with Images */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Step-by-Step Guide</h2>
                <p className="text-muted-foreground mb-8">
                  Follow these detailed instructions to complete your {service.toLowerCase()}
                </p>

                <div className="space-y-6">
                  {guideSteps.map((step, index) => (
                    <Card 
                      key={index}
                      id={`step-${index + 1}`}
                      className={completedSteps.includes(index) ? "border-success" : ""}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                                {index + 1}
                              </div>
                              <CardTitle>{step.title}</CardTitle>
                            </div>
                            <div className="flex gap-3 ml-11">
                              <Badge variant="outline" className="gap-1">
                                <Clock className="h-3 w-3" />
                                {step.duration}
                              </Badge>
                              <Badge variant="outline">{step.difficulty}</Badge>
                            </div>
                          </div>
                          <Button
                            variant={completedSteps.includes(index) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleStepComplete(index)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            {completedSteps.includes(index) ? "Done" : "Mark Complete"}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Local Mechanics Directory */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Certified Mechanics in {city}</h2>
                <p className="text-muted-foreground mb-8">
                  Can't DIY? Find trusted professionals specializing in {service.toLowerCase()}
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localMechanics.map((mechanic, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-medium text-foreground">{mechanic.rating}</span>
                            <span className="text-sm">({mechanic.reviewCount} reviews)</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <div>{mechanic.address}</div>
                              <div className="text-muted-foreground">{mechanic.distance} away</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${mechanic.phone}`} className="text-primary hover:underline">
                              {mechanic.phone}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{mechanic.priceRange}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {mechanic.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="default" size="sm" className="w-full">
                            <Navigation className="h-3 w-3 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    View All {localData.mechanicCount} Mechanics in {city}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Local FAQ Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-8">
                  Common questions from {city} drivers about {service.toLowerCase()}
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  {localFAQs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-left font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Seasonal Content Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="border-accent/20 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      Seasonal Tip for {city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      <strong>Current Month:</strong> {localData.seasonalTip}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {city}'s unique climate means seasonal brake maintenance is crucial for safety and longevity.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Used Cars Section */}
          <UsedCarsSection city={city} />

          {/* Safety Warning */}
          <section className="py-8 bg-warning/10 border-y border-warning/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Important Safety Notice</h3>
                    <p className="text-muted-foreground">
                      Brake repairs are safety-critical. If you're unsure about any step or lack proper tools, 
                      please consult a certified mechanic in {city}. Improper brake work can lead to brake failure 
                      and serious accidents. Always test brakes in a safe area before normal driving.
                    </p>
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
}
