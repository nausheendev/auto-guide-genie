import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { UsedCarsSection } from "@/components/UsedCarsSection";
import { PopularSearches } from "@/components/PopularSearches";
import { GuideFeedback } from "@/components/GuideFeedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  MapPin, Clock, DollarSign, CheckCircle2, AlertTriangle, 
  Wrench, Phone, Star, Navigation, TrendingUp, Calendar,
  ThermometerSun, CloudRain, Mountain, Users, Printer, Share2, Heart
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function LocalGuide() {
  const { citySlug, serviceSlug, make, model } = useParams<{ 
    citySlug: string; 
    serviceSlug: string;
    make?: string;
    model?: string;
  }>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // In production, fetch this data from database/API
  const city = citySlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Los Angeles';
  const service = serviceSlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Brake Repair';
  const state = 'California'; // Would come from DB
  
  // Vehicle-specific data
  const vehicleMake = make?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const vehicleModel = model?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const isVehicleSpecific = !!vehicleMake && !!vehicleModel;
  
  // Build page title and description
  const pageTitle = isVehicleSpecific 
    ? `${vehicleMake} ${vehicleModel} ${service} in ${city}`
    : `${service} in ${city}`;
  
  const pageDescription = isVehicleSpecific
    ? `Complete ${vehicleMake} ${vehicleModel} ${service.toLowerCase()} guide for ${city}. Model-specific instructions, torque specs, common issues. Local cost $${29}0-$${45}0.`
    : `Complete ${service.toLowerCase()} guide for ${city} drivers. Local cost $${25}0-$${45}0. Find ${47} certified mechanics, step-by-step instructions.`;
  
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

  // Vehicle-specific instructions (in production, generate with AI based on make/model)
  const guideSteps = isVehicleSpecific ? [
    {
      title: "Prepare Your Vehicle",
      description: `Park your ${vehicleMake} ${vehicleModel} on level ground and engage parking brake. For this model, ensure transmission is in Park. Gather all necessary tools including ${vehicleMake}-specific socket sizes.`,
      image: "/placeholder.svg",
      duration: "10 min",
      difficulty: "Easy",
      vehicleNote: `${vehicleMake} ${vehicleModel} specific: Check owner's manual for jacking points location.`,
      caution: "Never work under a vehicle supported only by a jack"
    },
    {
      title: "Remove the Wheel",
      description: `Loosen lug nuts (typically 19mm for ${vehicleMake} ${vehicleModel}), jack up the vehicle at designated points, and remove the wheel to access brake components.`,
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Medium",
      vehicleNote: `Torque spec for ${vehicleMake} ${vehicleModel} lug nuts: 80 ft-lbs`,
      caution: "Ensure jack stands are on solid, level ground"
    },
    {
      title: "Remove Old Brake Pads",
      description: `Remove caliper bolts (12mm hex on most ${vehicleMake} models) and slide out the old brake pads. Common on ${vehicleModel}: check for uneven inner pad wear.`,
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium",
      vehicleNote: `${vehicleMake} ${vehicleModel} caliper bolt torque: 26 ft-lbs`,
      caution: "Dispose of old brake pads properly - they may contain hazardous materials."
    },
    {
      title: "Install New Brake Pads",
      description: `Compress the caliper piston using a C-clamp. ${vehicleMake} ${vehicleModel} may require opening bleeder valve if piston is stubborn. Insert new pads with anti-squeal shims.`,
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium",
      vehicleNote: `Use ${vehicleMake} OEM or equivalent ceramic pads for best performance`,
      caution: "Brake fluid is corrosive. Avoid skin contact and clean spills immediately."
    },
    {
      title: "Test and Verify",
      description: `Reinstall wheel, torque to spec, lower vehicle. Pump brake pedal 3-4 times before starting. Test in safe area - ${vehicleMake} ${vehicleModel} ABS will activate if done correctly.`,
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Easy",
      vehicleNote: `${vehicleMake} ${vehicleModel}: Check brake fluid reservoir level before first drive`,
      caution: "Brakes may feel soft at first - pump pedal until firm"
    }
  ] : [
    {
      title: "Prepare Your Vehicle",
      description: "Park on level ground and engage parking brake. Gather all necessary tools.",
      image: "/placeholder.svg",
      duration: "10 min",
      difficulty: "Easy",
      caution: "Never work under a vehicle supported only by a jack"
    },
    {
      title: "Remove the Wheel",
      description: "Loosen lug nuts, jack up the vehicle, and remove the wheel to access brake components.",
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Medium",
      caution: "Ensure jack stands are on solid, level ground"
    },
    {
      title: "Remove Old Brake Pads",
      description: "Remove caliper bolts and slide out the old brake pads. Inspect for uneven wear.",
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium",
      caution: "Dispose of old brake pads properly - they may contain hazardous materials."
    },
    {
      title: "Install New Brake Pads",
      description: "Compress the caliper piston, insert new pads, and reassemble the caliper.",
      image: "/placeholder.svg",
      duration: "20 min",
      difficulty: "Medium",
      caution: "Brake fluid is corrosive. Avoid skin contact and clean spills immediately."
    },
    {
      title: "Test and Verify",
      description: "Reinstall wheel, lower vehicle, and test brakes in a safe area before normal driving.",
      image: "/placeholder.svg",
      duration: "15 min",
      difficulty: "Easy",
      caution: "Brakes may feel soft at first - pump pedal until firm"
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
        <title>{pageTitle} - Expert DIY Guide & Local Mechanics | AutoGos</title>
        <meta 
          name="description" 
          content={pageDescription}
        />
        <meta property="og:title" content={`${pageTitle} - Local Guide`} />
        <meta property="og:description" content={pageDescription} />
        <link rel="canonical" href={isVehicleSpecific 
          ? `https://autogos.com/repairs/${citySlug}/${make}/${model}/${serviceSlug}`
          : `https://autogos.com/repairs/${citySlug}/${serviceSlug}`} />
      </Helmet>

      {/* All Schema Markups */}
      <SchemaMarkup
        type="breadcrumb"
        data={{
          breadcrumbs: isVehicleSpecific ? [
            { name: "Home", url: "/" },
            { name: "Repairs", url: "/repairs" },
            { name: city, url: `/repairs/${citySlug}` },
            { name: vehicleMake!, url: `/repairs/${citySlug}/${make}` },
            { name: vehicleModel!, url: `/repairs/${citySlug}/${make}/${model}` },
            { name: service, url: `/repairs/${citySlug}/${make}/${model}/${serviceSlug}` }
          ] : [
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
          name: isVehicleSpecific 
            ? `How to Perform ${service} on ${vehicleMake} ${vehicleModel} in ${city}`
            : `How to Perform ${service} in ${city}`,
          description: isVehicleSpecific
            ? `Complete step-by-step ${vehicleMake} ${vehicleModel} ${service.toLowerCase()} guide for ${city} drivers with model-specific torque specs, common issues, and local mechanic recommendations.`
            : `Complete step-by-step guide for ${service.toLowerCase()} tailored for ${city} drivers, including local considerations and mechanic recommendations.`,
          estimatedCost: localData.avgCost,
          totalTime: "PT2H",
          aggregateRating: { ratingValue: 4.7, reviewCount: 324 },
          tools: isVehicleSpecific
            ? [`Jack and jack stands`, `Lug wrench (19mm for ${vehicleMake})`, `C-clamp or brake piston tool`, `Socket set (12mm hex)`]
            : ["Jack and jack stands", "Lug wrench", "C-clamp or brake piston tool", "Socket set"],
          supplies: isVehicleSpecific
            ? [`${vehicleMake} OEM or equivalent brake pads`, "Brake cleaner", "High-temperature grease", "Anti-squeal shims"]
            : ["New brake pads", "Brake cleaner", "High-temperature grease"],
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
                  {isVehicleSpecific && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={`/repairs/${citySlug}/${make}`}>{vehicleMake}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={`/repairs/${citySlug}/${make}/${model}`}>{vehicleModel}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{service}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Hero Section - Location-Specific */}
          <section className="bg-primary text-primary-foreground py-8">
            <div className="container">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    {isVehicleSpecific && (
                      <>
                        <span>{vehicleMake}</span>
                        <span>•</span>
                        <span>{vehicleModel}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{city}, {state}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {isVehicleSpecific ? `${vehicleMake} ${vehicleModel} ${service}` : service} in {city}
                  </h1>
                  <p className="text-base text-primary-foreground/90 max-w-2xl">
                    {isVehicleSpecific 
                      ? `Complete ${vehicleMake} ${vehicleModel}-specific ${service.toLowerCase()} guide for ${city} drivers with model-specific torque specs, common issues, and local mechanics specializing in ${vehicleMake}.`
                      : `Complete DIY guide and local mechanic directory for ${city} drivers. Save money or find trusted professionals near you.`
                    }
                  </p>
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified by Professional Mechanics
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                        Brake
                      </Badge>
                      {isVehicleSpecific && (
                        <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                          Medium
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">${localData.avgCost.min}-${localData.avgCost.max}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Share2 className="h-4 w-4" />
                  </Button>
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

          {/* Common Issues Section - Location Specific */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Common Brake Issues in {city}</h2>
                <p className="text-muted-foreground mb-6">
                  Understanding brake problems specific to {city}'s driving conditions
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Accelerated Pad Wear
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {city}'s heavy traffic on I-405, I-10, and I-5 causes constant stop-and-go driving, leading to 30-40% faster brake pad deterioration than rural areas.
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Warning Signs:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Squealing or grinding noises</li>
                          <li>Reduced braking responsiveness</li>
                          <li>Brake pedal pulsation</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ThermometerSun className="h-5 w-5 text-orange-500" />
                        Heat-Related Brake Fade
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Summer temperatures reaching 95°F+ in {city} can cause brake fluid to heat up, reducing braking efficiency especially on canyon roads and mountain passes.
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Prevention Tips:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Use DOT 4 or higher brake fluid</li>
                          <li>Check fluid levels monthly in summer</li>
                          <li>Replace fluid every 2 years in {city} climate</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        Rotor Corrosion & Rust
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Despite {city}'s dry climate, coastal areas and winter moisture can cause surface rust on brake rotors, especially on vehicles that sit for extended periods.
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">What to Do:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Drive regularly to keep rotors clean</li>
                          <li>Light rust burns off with normal braking</li>
                          <li>Heavy rust requires rotor replacement</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mountain className="h-5 w-5 text-green-500" />
                        Canyon & Hill Driving Strain
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Frequent driving on Mulholland Drive, Angeles Crest Highway, or hilly neighborhoods puts extra stress on brakes through prolonged downhill braking.
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Best Practices:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Use engine braking on long descents</li>
                          <li>Allow brakes to cool after mountain drives</li>
                          <li>Consider upgraded brake pads for frequent canyon driving</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                      <CheckCircle2 className="h-5 w-5" />
                      {city} Brake Maintenance Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-semibold text-blue-900 dark:text-blue-100">Inspection Frequency:</p>
                        <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• Visual check: Every oil change</li>
                          <li>• Full inspection: Every 12,000 miles</li>
                          <li>• Brake fluid: Check every 6 months</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-blue-900 dark:text-blue-100">Typical Replacement Intervals:</p>
                        <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• Brake pads: 25,000-40,000 miles</li>
                          <li>• Rotors: 50,000-70,000 miles</li>
                          <li>• Brake fluid: Every 24 months</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

          {/* Safety First Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                      <AlertTriangle className="h-5 w-5" />
                      Safety First
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-amber-900 dark:text-amber-100 font-medium">
                      {service} repairs are safety-critical. If you're unsure about any step or lack proper tools, please consult a certified mechanic in {city}. Improper {service.toLowerCase()} work can lead to brake failure and serious accidents. Always test brakes in a safe area before normal driving.
                    </p>
                    
                    <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-100">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>Always use jack stands - never rely on a jack alone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>Wear safety glasses to protect from brake dust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>Allow brakes to cool completely before starting work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>Never compress brake caliper without opening bleeder valve</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Overview Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Quick Overview</h2>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Problem</h3>
                        <p className="text-muted-foreground">
                          Worn brake pads can reduce braking performance and cause squealing noises.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Cause</h3>
                        <p className="text-muted-foreground">
                          Brake pads wear down naturally over time due to friction with the brake rotors.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Solution</h3>
                        <p className="text-muted-foreground">
                          Replace both front or rear brake pads as a set to ensure even braking performance.
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="font-semibold text-lg">Success Rate:</span>
                        <span className="text-3xl font-bold text-primary">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Required Tools Section with Affiliate Links */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Wrench className="h-7 w-7 text-primary" />
                  Required Tools
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      name: "Jack and Jack Stands Set",
                      description: "3-ton capacity hydraulic jack with safety stands",
                      vendors: [
                        { name: "Amazon", price: "$89.99", link: "https://amazon.com/dp/YOURAFFID-jack-stands", rating: 4.6 },
                        { name: "AutoZone", price: "$94.99", link: "https://autozone.com/YOURAFFID-jack-stands", rating: 4.5 },
                        { name: "RockAuto", price: "$79.99", link: "https://rockauto.com/YOURAFFID-jack-stands", rating: 4.7 }
                      ]
                    },
                    {
                      name: isVehicleSpecific ? `Lug Wrench (19mm for ${vehicleMake})` : "Lug Wrench Set",
                      description: "Cross-pattern lug wrench with multiple sizes",
                      vendors: [
                        { name: "Amazon", price: "$24.99", link: "https://amazon.com/dp/YOURAFFID-lug-wrench", rating: 4.7 },
                        { name: "Advance Auto", price: "$27.99", link: "https://advanceautoparts.com/YOURAFFID-lug-wrench", rating: 4.4 }
                      ]
                    },
                    {
                      name: "Brake Caliper Piston Tool",
                      description: "Universal disc brake caliper compression tool",
                      vendors: [
                        { name: "Amazon", price: "$32.99", link: "https://amazon.com/dp/YOURAFFID-piston-tool", rating: 4.5 },
                        { name: "AutoZone", price: "$36.99", link: "https://autozone.com/YOURAFFID-piston-tool", rating: 4.3 },
                        { name: "Harbor Freight", price: "$29.99", link: "https://harborfreight.com/YOURAFFID-piston-tool", rating: 4.2 }
                      ]
                    },
                    {
                      name: isVehicleSpecific ? `Socket Set (12mm hex)` : "Metric Socket Set",
                      description: "Complete metric socket set with ratchet",
                      vendors: [
                        { name: "Amazon", price: "$45.99", link: "https://amazon.com/dp/YOURAFFID-socket-set", rating: 4.8 },
                        { name: "AutoZone", price: "$52.99", link: "https://autozone.com/YOURAFFID-socket-set", rating: 4.6 }
                      ]
                    },
                    {
                      name: "Torque Wrench",
                      description: "Click-type torque wrench (20-150 ft-lbs)",
                      vendors: [
                        { name: "Amazon", price: "$49.99", link: "https://amazon.com/dp/YOURAFFID-torque-wrench", rating: 4.7 },
                        { name: "Harbor Freight", price: "$39.99", link: "https://harborfreight.com/YOURAFFID-torque-wrench", rating: 4.4 },
                        { name: "AutoZone", price: "$54.99", link: "https://autozone.com/YOURAFFID-torque-wrench", rating: 4.5 }
                      ]
                    }
                  ].map((tool, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-primary" />
                          {tool.name}
                        </CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {tool.vendors.map((vendor, vIndex) => (
                            <div key={vIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm">{vendor.name}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span className="text-xs text-muted-foreground">{vendor.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-primary">{vendor.price}</span>
                                <Button 
                                  size="sm" 
                                  asChild
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  <a 
                                    href={vendor.link} 
                                    target="_blank" 
                                    rel="nofollow noopener noreferrer"
                                    className="flex items-center gap-1"
                                  >
                                    View Deal
                                    <Navigation className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          Prices may vary. Last updated: {new Date().toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Required Parts Section with Affiliate Links */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Required Parts</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      name: isVehicleSpecific ? `${vehicleMake} ${vehicleModel} Brake Pads` : "Brake Pads (Front Set)",
                      description: isVehicleSpecific 
                        ? `OEM-quality ceramic brake pads for ${vehicleMake} ${vehicleModel}`
                        : "Premium ceramic brake pads for most vehicles",
                      vendors: [
                        { name: "Amazon", price: "$67.99", link: "https://amazon.com/dp/YOURAFFID-brake-pads", rating: 4.6, shipping: "Free 2-day" },
                        { name: "RockAuto", price: "$52.99", link: "https://rockauto.com/YOURAFFID-brake-pads", rating: 4.7, shipping: "$5.99" },
                        { name: "AutoZone", price: "$74.99", link: "https://autozone.com/YOURAFFID-brake-pads", rating: 4.5, shipping: "Free pickup" },
                        { name: "Advance Auto", price: "$69.99", link: "https://advanceautoparts.com/YOURAFFID-brake-pads", rating: 4.4, shipping: "Free pickup" }
                      ]
                    },
                    {
                      name: "Brake Cleaner Spray",
                      description: "Non-chlorinated brake parts cleaner (14 oz)",
                      vendors: [
                        { name: "Amazon", price: "$8.99", link: "https://amazon.com/dp/YOURAFFID-brake-cleaner", rating: 4.8, shipping: "Add-on item" },
                        { name: "AutoZone", price: "$7.49", link: "https://autozone.com/YOURAFFID-brake-cleaner", rating: 4.6, shipping: "In-store" },
                        { name: "Walmart", price: "$6.99", link: "https://walmart.com/YOURAFFID-brake-cleaner", rating: 4.5, shipping: "Free pickup" }
                      ]
                    },
                    {
                      name: "High-Temperature Brake Grease",
                      description: "Synthetic brake lubricant for caliper pins and slides",
                      vendors: [
                        { name: "Amazon", price: "$12.99", link: "https://amazon.com/dp/YOURAFFID-brake-grease", rating: 4.7, shipping: "Prime" },
                        { name: "AutoZone", price: "$14.99", link: "https://autozone.com/YOURAFFID-brake-grease", rating: 4.5, shipping: "In-store" },
                        { name: "RockAuto", price: "$10.99", link: "https://rockauto.com/YOURAFFID-brake-grease", rating: 4.6, shipping: "$5.99" }
                      ]
                    },
                    {
                      name: "Anti-Squeal Brake Shims",
                      description: "Noise-dampening shims for quiet braking",
                      vendors: [
                        { name: "Amazon", price: "$18.99", link: "https://amazon.com/dp/YOURAFFID-brake-shims", rating: 4.5, shipping: "Prime" },
                        { name: "RockAuto", price: "$15.99", link: "https://rockauto.com/YOURAFFID-brake-shims", rating: 4.6, shipping: "$5.99" },
                        { name: "AutoZone", price: "$21.99", link: "https://autozone.com/YOURAFFID-brake-shims", rating: 4.4, shipping: "In-store" }
                      ]
                    }
                  ].map((part, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          {part.name}
                        </CardTitle>
                        <CardDescription>{part.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {part.vendors.map((vendor, vIndex) => (
                            <div key={vIndex} className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors border">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm">{vendor.name}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                      <span className="text-xs text-muted-foreground">{vendor.rating}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">• {vendor.shipping}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-primary">{vendor.price}</span>
                                <Button 
                                  size="sm" 
                                  asChild
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  <a 
                                    href={vendor.link} 
                                    target="_blank" 
                                    rel="nofollow noopener noreferrer"
                                    className="flex items-center gap-1"
                                  >
                                    Buy Now
                                    <Navigation className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          Prices may vary. We earn commission on qualifying purchases. Last updated: {new Date().toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
                          Total Estimated Cost in {city}
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          DIY Parts: $90-$150 | Professional Service: ${localData.avgCost.min}-${localData.avgCost.max}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                          Save up to ${localData.avgCost.max - 150} by doing it yourself with quality parts from trusted vendors above.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Main Guide Steps with Images */}
          <section className="py-12 bg-muted/30">
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
                      className={completedSteps.includes(index) ? "border-green-500" : ""}
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
                              <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                                <Clock className="h-3 w-3" />
                                {step.duration}
                              </Badge>
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
                                {step.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant={completedSteps.includes(index) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleStepComplete(index)}
                            className={completedSteps.includes(index) ? "bg-emerald-600 hover:bg-emerald-700 text-emerald-50 border-emerald-600" : "hover:bg-accent"}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Mark Complete
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
                          <div className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                            {'caution' in step && (
                              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded dark:bg-amber-950">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Caution:</p>
                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                      {step.caution}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {isVehicleSpecific && 'vehicleNote' in step && (
                              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded dark:bg-blue-950">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Vehicle Note:</p>
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                      {step.vehicleNote}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
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

          {/* Feedback Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <GuideFeedback guideTitle={pageTitle} />
              </div>
            </div>
          </section>

          {/* Related Guides Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Related Guides</h2>
                <p className="text-muted-foreground mb-8">
                  You might also be interested in these repairs
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">Brake Rotor Replacement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Brakes</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">Brake Fluid Flush</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Maintenance</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">Caliper Replacement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Brakes</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Related Cities Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Top Related Cities</h2>
                <p className="text-muted-foreground mb-8">
                  Find {service.toLowerCase()} guides in nearby cities
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    "San Diego",
                    "San Francisco",
                    "San Jose",
                    "Sacramento",
                    "Fresno",
                    "Long Beach",
                    "Oakland",
                    "Bakersfield",
                    "Anaheim",
                    "Santa Ana",
                    "Riverside",
                    "Stockton",
                    "Irvine",
                    "Chula Vista",
                    "Fremont"
                  ].map((relatedCity) => (
                    <a
                      key={relatedCity}
                      href={`/repairs/${relatedCity.toLowerCase().replace(' ', '-')}/${serviceSlug}`}
                      className="p-4 border rounded-lg hover:shadow-md hover:border-primary transition-all text-center"
                    >
                      <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="font-medium text-sm">{relatedCity}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Local FAQ Section */}
          <section className="py-12 bg-muted/30">
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

          {/* Popular Searches Section */}
          <PopularSearches city={city} citySlug={citySlug!} />

          {/* Used Cars Section */}
          <UsedCarsSection city={city} />

          {/* Related Guides Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "How to Replace Brake Rotors", slug: "brake-rotor-replacement" },
                    { title: "Brake Fluid Flush Guide", slug: "brake-fluid-flush" },
                    { title: "Brake Caliper Replacement", slug: "brake-caliper-replacement" },
                    { title: "ABS System Diagnosis", slug: "abs-system-diagnosis" },
                    { title: "Parking Brake Adjustment", slug: "parking-brake-adjustment" },
                    { title: "Brake Line Replacement", slug: "brake-line-replacement" }
                  ].map((guide) => (
                    <a
                      key={guide.slug}
                      href={isVehicleSpecific 
                        ? `/repairs/${citySlug}/${make}/${model}/${guide.slug}`
                        : `/repairs/${citySlug}/${guide.slug}`}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary hover:bg-muted/50 transition-all"
                    >
                      <Wrench className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium">{guide.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Top Related Cities Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Top Related Cities</h2>
                <p className="text-muted-foreground mb-6">
                  Find {service.toLowerCase()} guides in nearby cities
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { name: "San Francisco", slug: "san-francisco" },
                    { name: "San Diego", slug: "san-diego" },
                    { name: "San Jose", slug: "san-jose" },
                    { name: "Sacramento", slug: "sacramento" },
                    { name: "Long Beach", slug: "long-beach" },
                    { name: "Oakland", slug: "oakland" },
                    { name: "Fresno", slug: "fresno" },
                    { name: "Bakersfield", slug: "bakersfield" },
                    { name: "Anaheim", slug: "anaheim" },
                    { name: "Santa Ana", slug: "santa-ana" },
                    { name: "Riverside", slug: "riverside" },
                    { name: "Stockton", slug: "stockton" },
                    { name: "Irvine", slug: "irvine" },
                    { name: "Fremont", slug: "fremont" },
                    { name: "Santa Clarita", slug: "santa-clarita" }
                  ].map((cityItem) => (
                    <a
                      key={cityItem.slug}
                      href={isVehicleSpecific 
                        ? `/repairs/${cityItem.slug}/${make}/${model}/${serviceSlug}`
                        : `/repairs/${cityItem.slug}/${serviceSlug}`}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:border-primary hover:bg-background transition-all text-sm"
                    >
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium">{cityItem.name}</span>
                    </a>
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
}
