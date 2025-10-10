import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, CheckCircle2, Clock, DollarSign, MapPin, Phone, 
  Printer, Share2, ThumbsUp, ThumbsDown, ChevronRight, Wrench, 
  AlertCircle, Star, Navigation
} from "lucide-react";
import engineImage from "@/assets/engine-image.jpg";
import toolsImage from "@/assets/tools-image.jpg";

const GUIDE_DATA = {
  vehicle: {
    make: "Toyota",
    model: "Camry",
    year: "2020",
    engine: "2.5L 4-Cylinder"
  },
  title: "Brake Pad Replacement",
  category: "Brakes",
  difficulty: "Medium",
  time: "2 hours",
  costRange: "$150-300",
  overview: {
    problem: "Worn brake pads can reduce braking performance and cause squealing noises.",
    cause: "Brake pads wear down naturally over time due to friction with the brake rotors.",
    solution: "Replace both front or rear brake pads as a set to ensure even braking performance.",
    successRate: 95
  },
  safety: [
    "Always use jack stands - never rely on a jack alone",
    "Wear safety glasses to protect from brake dust",
    "Allow brakes to cool completely before starting work",
    "Never compress brake caliper without opening bleeder valve"
  ],
  tools: [
    "Jack and jack stands",
    "Lug wrench",
    "C-clamp or brake caliper tool",
    "Socket set (10mm, 14mm, 17mm)",
    "Torque wrench",
    "Brake cleaner",
    "Wire brush"
  ],
  parts: [
    { name: "Brake pad set (front)", part: "04465-06090", price: "$45-80" },
    { name: "Brake cleaner", part: "Generic", price: "$5-10" },
    { name: "Anti-seize compound", part: "Generic", price: "$8-15" }
  ],
  steps: [
    {
      number: 1,
      title: "Prepare the vehicle",
      content: "Park on a level surface, engage parking brake, and loosen lug nuts before lifting. Use wheel chocks on opposite wheels for safety.",
      time: "10 mins",
      caution: "Never work under a vehicle supported only by a jack"
    },
    {
      number: 2,
      title: "Lift and secure vehicle",
      content: "Jack up the vehicle and place jack stands under the frame. Remove the wheel completely and set aside.",
      time: "10 mins",
      caution: "Ensure jack stands are on solid, level ground"
    },
    {
      number: 3,
      title: "Remove caliper bolts",
      content: "Locate the two caliper bolts (usually 14mm or 17mm) on the back of the caliper. Remove both bolts completely using a socket wrench.",
      time: "15 mins",
      caution: "Support the caliper - don't let it hang by the brake line"
    },
    {
      number: 4,
      title: "Remove old brake pads",
      content: "Lift the caliper off the rotor and secure it with wire or a bungee cord. Remove the old brake pads and anti-rattle clips from the caliper bracket.",
      time: "15 mins",
      tip: "Take photos before removal for reference during reassembly"
    },
    {
      number: 5,
      title: "Compress caliper piston",
      content: "Use a C-clamp or brake caliper tool to slowly compress the piston back into the caliper housing. This makes room for the new, thicker brake pads.",
      time: "15 mins",
      caution: "Open brake fluid reservoir cap first to prevent overflow"
    },
    {
      number: 6,
      title: "Install new brake pads",
      content: "Clean the caliper bracket with brake cleaner. Install new anti-rattle clips, then place the new brake pads in the caliper bracket.",
      time: "20 mins",
      tip: "Apply anti-seize to the back of pads to prevent squealing"
    },
    {
      number: 7,
      title: "Reinstall caliper",
      content: "Lower the caliper over the new brake pads and rotor. Reinstall both caliper bolts and torque to manufacturer specifications (typically 25-35 ft-lbs).",
      time: "15 mins",
      caution: "Ensure bolts are properly torqued for safety"
    },
    {
      number: 8,
      title: "Complete and test",
      content: "Reinstall the wheel, torque lug nuts properly, and repeat process on other side. Pump brake pedal several times before driving. Test brakes at low speed.",
      time: "20 mins",
      caution: "Brakes may feel soft at first - pump pedal until firm"
    }
  ],
  mechanics: [
    {
      name: "Pro Auto Service",
      distance: "1.2 miles",
      rating: 4.8,
      specialties: ["Brakes", "Suspension"],
      phone: "(555) 123-4567"
    },
    {
      name: "Downtown Auto Repair",
      distance: "2.5 miles",
      rating: 4.6,
      specialties: ["General Repair", "Diagnostics"],
      phone: "(555) 234-5678"
    },
    {
      name: "Expert Brake & Tire",
      distance: "3.1 miles",
      rating: 4.9,
      specialties: ["Brakes", "Tires"],
      phone: "(555) 345-6789"
    }
  ],
  relatedGuides: [
    { id: 2, title: "Brake Rotor Replacement", category: "Brakes" },
    { id: 3, title: "Brake Fluid Flush", category: "Maintenance" },
    { id: 4, title: "Caliper Replacement", category: "Brakes" }
  ]
};

export default function Guide() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const progress = (completedSteps.length / GUIDE_DATA.steps.length) * 100;

  const toggleStepComplete = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Vehicle Info Banner */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <span>{GUIDE_DATA.vehicle.year}</span>
                  <span>•</span>
                  <span>{GUIDE_DATA.vehicle.make} {GUIDE_DATA.vehicle.model}</span>
                  <span>•</span>
                  <span>{GUIDE_DATA.vehicle.engine}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{GUIDE_DATA.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                    {GUIDE_DATA.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                    {GUIDE_DATA.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{GUIDE_DATA.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{GUIDE_DATA.costRange}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
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

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Progress</CardTitle>
                    <span className="text-sm text-muted-foreground">{completedSteps.length}/{GUIDE_DATA.steps.length} steps</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Safety Notice */}
              <Card className="border-warning">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <CardTitle>Safety First</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {GUIDE_DATA.safety.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Quick Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Problem</h4>
                    <p className="text-sm text-muted-foreground">{GUIDE_DATA.overview.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cause</h4>
                    <p className="text-sm text-muted-foreground">{GUIDE_DATA.overview.cause}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Solution</h4>
                    <p className="text-sm text-muted-foreground">{GUIDE_DATA.overview.solution}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-medium">Success Rate:</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: `${GUIDE_DATA.overview.successRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-success">{GUIDE_DATA.overview.successRate}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Required Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {GUIDE_DATA.tools.map((tool, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Required Parts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {GUIDE_DATA.parts.map((part, index) => (
                        <li key={index} className="space-y-1">
                          <div className="flex items-start justify-between">
                            <span className="text-sm font-medium">{part.name}</span>
                            <span className="text-sm text-muted-foreground">{part.price}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Part #: {part.part}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Step-by-Step Guide */}
              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Instructions</CardTitle>
                  <CardDescription>Follow these steps carefully for best results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {GUIDE_DATA.steps.map((step) => (
                    <div key={step.number} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-bold ${
                          completedSteps.includes(step.number) 
                            ? 'border-success bg-success text-success-foreground' 
                            : 'border-primary bg-primary/10 text-primary'
                        }`}>
                          {completedSteps.includes(step.number) ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                            <Badge variant="secondary" className="ml-2">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.time}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{step.content}</p>
                          
                          {step.caution && (
                            <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                              <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-warning-foreground"><strong>Caution:</strong> {step.caution}</p>
                            </div>
                          )}
                          
                          {step.tip && (
                            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-sm"><strong>Tip:</strong> {step.tip}</p>
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant={completedSteps.includes(step.number) ? "secondary" : "default"}
                              onClick={() => toggleStepComplete(step.number)}
                            >
                              {completedSteps.includes(step.number) ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Completed
                                </>
                              ) : (
                                'Mark Complete'
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      {step.number < GUIDE_DATA.steps.length && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Related Guides */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Guides</CardTitle>
                  <CardDescription>You might also be interested in these repairs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {GUIDE_DATA.relatedGuides.map((guide) => (
                      <Link 
                        key={guide.id}
                        to={`/guide/${guide.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium">{guide.title}</p>
                          <p className="text-sm text-muted-foreground">{guide.category}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Was this guide helpful?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Not Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Local Mechanics */}
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Local Mechanics
                  </CardTitle>
                  <CardDescription>Need professional help?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {GUIDE_DATA.mechanics.map((mechanic, index) => (
                    <div key={index} className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{mechanic.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{mechanic.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Navigation className="h-3 w-3" />
                          {mechanic.distance}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mechanic.specialties.map((specialty, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full" variant="outline">
                        <Phone className="h-3 w-3 mr-2" />
                        {mechanic.phone}
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full" variant="accent">
                    View All Mechanics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
