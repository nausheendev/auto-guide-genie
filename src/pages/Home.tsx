import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VehicleSelector } from "@/components/VehicleSelector";
import { VoiceInput } from "@/components/VoiceInput";
import { AuthModal } from "@/components/AuthModal";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Wrench, Clock, DollarSign, TrendingUp, Calendar, Car, Battery, Gauge, Droplets, Settings, Zap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import toolsImage from "@/assets/tools-image.jpg";
import engineImage from "@/assets/engine-image.jpg";

const POPULAR_REPAIRS = [
  {
    id: 1,
    title: "Oil Change",
    category: "Maintenance",
    difficulty: "Easy",
    time: "30 mins",
    cost: "$40-60",
    views: "15.2k"
  },
  {
    id: 2,
    title: "Brake Pad Replacement",
    category: "Brakes",
    difficulty: "Medium",
    time: "2 hours",
    cost: "$150-300",
    views: "12.8k"
  },
  {
    id: 3,
    title: "Battery Replacement",
    category: "Electrical",
    difficulty: "Easy",
    time: "15 mins",
    cost: "$100-200",
    views: "10.5k"
  },
  {
    id: 4,
    title: "Air Filter Replacement",
    category: "Maintenance",
    difficulty: "Easy",
    time: "10 mins",
    cost: "$20-40",
    views: "9.3k"
  }
];

const LATEST_GUIDES = [
  {
    id: 5,
    title: "Transmission Fluid Change",
    category: "Maintenance",
    difficulty: "Medium",
    time: "1 hour",
    cost: "$80-150",
    publishedDate: "2025-10-14",
    vehicle: "Honda Civic 2020"
  },
  {
    id: 6,
    title: "Spark Plug Replacement",
    category: "Engine",
    difficulty: "Easy",
    time: "45 mins",
    cost: "$60-120",
    publishedDate: "2025-10-13",
    vehicle: "Toyota Camry 2019"
  },
  {
    id: 7,
    title: "Headlight Bulb Replacement",
    category: "Electrical",
    difficulty: "Easy",
    time: "20 mins",
    cost: "$30-80",
    publishedDate: "2025-10-12",
    vehicle: "Ford F-150 2021"
  },
  {
    id: 8,
    title: "Coolant Flush",
    category: "Maintenance",
    difficulty: "Medium",
    time: "1.5 hours",
    cost: "$100-180",
    publishedDate: "2025-10-11",
    vehicle: "Chevrolet Silverado 2018"
  }
];

const MAIN_CATEGORIES = [
  {
    slug: "repairs",
    name: "Auto Repairs",
    description: "Complete repair guides for all vehicle systems",
    icon: Wrench,
    count: "500+ Guides",
    color: "primary"
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    description: "Regular maintenance schedules and how-to guides",
    icon: Settings,
    count: "350+ Guides",
    color: "accent"
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    description: "Troubleshoot and diagnose vehicle issues",
    icon: Gauge,
    count: "250+ Guides",
    color: "secondary"
  },
  {
    slug: "electrical",
    name: "Electrical Systems",
    description: "Battery, alternator, and electrical component repairs",
    icon: Zap,
    count: "200+ Guides",
    color: "warning"
  },
  {
    slug: "fluids",
    name: "Fluids & Filters",
    description: "Oil changes, coolant flushes, and filter replacements",
    icon: Droplets,
    count: "180+ Guides",
    color: "success"
  },
  {
    slug: "customization",
    name: "Customization",
    description: "Upgrades, modifications, and performance tuning",
    icon: Car,
    count: "150+ Guides",
    color: "destructive"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AutoGos - Professional Auto Repair Guides & Local Mechanic Finder | DIY Car Maintenance</title>
        <meta name="description" content="Get step-by-step auto repair guides powered by AI. Find trusted local mechanics, learn DIY car maintenance, and save money on repairs. 500+ professional guides for all vehicle makes and models." />
        <meta name="keywords" content="auto repair guides, car maintenance, DIY repairs, local mechanics, vehicle maintenance, brake repair, oil change, engine repair, auto diagnostics" />
        <link rel="canonical" href="https://autogos.com/" />
        <meta property="og:title" content="AutoGos - Professional Auto Repair Guides & Local Mechanic Finder" />
        <meta property="og:description" content="Get step-by-step auto repair guides powered by AI. Find trusted local mechanics and save money on repairs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autogos.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AutoGos - Professional Auto Repair Guides" />
        <meta name="twitter:description" content="Step-by-step auto repair guides powered by AI. Find local mechanics and save money." />
        <link rel="preload" as="image" href={heroBanner} />
      </Helmet>

      <SchemaMarkup
        type="organization"
        data={{
          name: "AutoGos",
          url: "https://autogos.com",
          logo: "https://autogos.com/logo.png",
          description: "Professional auto repair guides and local mechanic finder powered by AI technology"
        }}
      />

      <SchemaMarkup
        type="website"
        data={{
          name: "AutoGos",
          url: "https://autogos.com",
          description: "Professional auto repair guides and local mechanic finder"
        }}
      />

      <SchemaMarkup
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "https://autogos.com" }
          ]
        }}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBanner} 
            alt="Professional auto mechanic working on vehicle repair"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Professional Auto Repair Guides
                <span className="block text-primary mt-2">At Your Fingertips</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Access over 1,500 step-by-step auto repair guides powered by advanced AI technology. Get instant help with repairs, maintenance, and diagnostics for any vehicle make or model. Connect with certified local mechanics when you need professional assistance.
              </p>
            </div>

            <Card className="p-6 shadow-xl border-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Select Your Vehicle</h3>
                  <VehicleSelector />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Input
                      type="text"
                      placeholder="What needs repair? (e.g., brake pads, oil change)"
                      className="pl-10 pr-12 h-12 bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <VoiceInput onTranscript={(text) => setSearchQuery(text)} value={searchQuery} />
                  </div>
                  {searchQuery === "" && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Oil change", "Brake pads", "Battery replacement", "Air filter", "Spark plugs", "Transmission fluid"].map((query) => (
                        <Button
                          key={query}
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery(query)}
                          className="text-xs"
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                <Button size="lg" className="w-full" variant="hero" onClick={() => setShowAuthModal(true)}>
                  Get Repair Guide
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  <Badge variant="secondary" className="mr-2">3 free guides daily</Badge>
                  No credit card required
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16" aria-labelledby="main-categories">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="main-categories" className="text-3xl font-bold mb-4">Explore Auto Repair Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive collection of repair guides organized by category. From routine maintenance to complex repairs, find expert guidance for every automotive need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MAIN_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} to={`/${category.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className={`h-14 w-14 rounded-xl bg-${category.color}/10 flex items-center justify-center mb-4`}>
                        <IconComponent className={`h-7 w-7 text-${category.color}`} />
                      </div>
                      <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                      <CardDescription className="mb-3">
                        {category.description}
                      </CardDescription>
                      <Badge variant="secondary" className="w-fit">
                        {category.count}
                      </Badge>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30" aria-labelledby="features-heading">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold mb-4">Why Choose AutoGos?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade repair guides powered by AI, designed for both DIY enthusiasts and professional mechanics. Get accurate diagnostics, detailed repair procedures, and access to a network of certified technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Guides</CardTitle>
                <CardDescription>
                  Advanced AI technology generates detailed, step-by-step repair instructions tailored to your specific vehicle's make, model, and year. Get precise torque specifications, part numbers, and safety warnings for every repair.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Save Time & Money</CardTitle>
                <CardDescription>
                  Clear instructions with accurate time and cost estimates help you make informed decisions. Compare DIY costs versus professional shop rates. Access real-time pricing on parts and labor from local mechanics in your area.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Local Mechanics Network</CardTitle>
                <CardDescription>
                  Find and connect with certified, trusted mechanics in your area. Read verified reviews, compare quotes, and book appointments directly. Our network includes thousands of ASE-certified professionals across the United States.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Guides Section */}
      <section className="py-16 bg-muted/30" aria-labelledby="latest-guides">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="latest-guides" className="text-3xl font-bold mb-2">Latest Repair Guides</h2>
              <p className="text-muted-foreground">Recently published professional repair guides with detailed instructions, diagrams, and video tutorials for popular vehicle models</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/search">View All Guides</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LATEST_GUIDES.map((guide) => (
              <Link key={guide.id} to={`/guide/${guide.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">
                          {new Date(guide.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">{guide.vehicle}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant={guide.difficulty === "Easy" ? "secondary" : "outline"}>
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{guide.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <span className="font-medium">{guide.cost}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Repairs Section */}
      <section className="py-16" aria-labelledby="popular-repairs">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="popular-repairs" className="text-3xl font-bold mb-2">Popular Repair Guides</h2>
              <p className="text-muted-foreground">Most searched and viewed automotive repairs this month. These common maintenance and repair procedures can help you save hundreds of dollars in shop fees.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/search">View All Repairs</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_REPAIRS.map((repair) => (
              <Link key={repair.id} to={`/guide/${repair.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{repair.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs">{repair.views}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{repair.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant={repair.difficulty === "Easy" ? "secondary" : "outline"}>
                        {repair.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{repair.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <span className="font-medium">{repair.cost}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30" aria-labelledby="how-it-works">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="how-it-works" className="text-3xl font-bold mb-4">How AutoGos Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get professional auto repair guidance in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Select Your Vehicle</h3>
              <p className="text-muted-foreground">
                Enter your vehicle's make, model, and year to get repair guides specifically tailored to your car's specifications and common issues.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Search for Repair</h3>
              <p className="text-muted-foreground">
                Describe the issue or repair needed. Our AI analyzes thousands of repair procedures to provide you with the most relevant guide.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Expert Guidance</h3>
              <p className="text-muted-foreground">
                Follow step-by-step instructions with photos, videos, and diagrams. Connect with local mechanics if you need professional help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Repair?
            </h2>
            <p className="text-xl opacity-90">
              Join over 50,000 car owners who trust AutoGos for their automotive repair and maintenance needs. Access professional guides, connect with certified mechanics, and save money on every repair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="accent" asChild>
                <Link to="/search">Browse Repair Guides</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={() => setShowAuthModal(true)}>
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
