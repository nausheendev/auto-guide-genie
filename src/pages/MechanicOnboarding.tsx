import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorkshopSearchStep from "@/components/mechanic/WorkshopSearchStep";
import OffersStep from "@/components/mechanic/OffersStep";
import ContactPersonStep from "@/components/mechanic/ContactPersonStep";
import GMBConnectionStep from "@/components/mechanic/GMBConnectionStep";

export default function MechanicOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workshopData, setWorkshopData] = useState<any>(null);
  const [offersData, setOffersData] = useState<any[]>([]);
  const [contactData, setContactData] = useState<any>(null);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Workshop Details", component: WorkshopSearchStep },
    { number: 2, title: "Create Offers", component: OffersStep, skippable: true },
    { number: 3, title: "Contact Person", component: ContactPersonStep },
    { number: 4, title: "Connect GMB", component: GMBConnectionStep, skippable: true },
  ];

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = (data?: any) => {
    if (currentStep === 1) setWorkshopData(data);
    if (currentStep === 2) setOffersData(data);
    if (currentStep === 3) setContactData(data);
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate("/mechanic-dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/mechanic-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle className="text-2xl">Create Mechanic Account</CardTitle>
                  <CardDescription className="mt-2">
                    Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              
              {/* Steps Indicator */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        currentStep > step.number 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : currentStep === step.number
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span className="text-xs mt-2 text-center hidden sm:block">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-0.5 w-full mx-2 ${
                        currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <CurrentStepComponent 
                onNext={handleNext}
                onBack={handleBack}
                initialData={
                  currentStep === 1 ? workshopData :
                  currentStep === 2 ? offersData :
                  currentStep === 3 ? contactData : null
                }
              />
              
              {steps[currentStep - 1].skippable && (
                <div className="mt-6 text-center">
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip this step
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
