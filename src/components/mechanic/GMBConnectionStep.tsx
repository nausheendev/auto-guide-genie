import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GMBConnectionStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function GMBConnectionStep({ onNext, onBack }: GMBConnectionStepProps) {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnectGMB = () => {
    setIsConnected(true);
    toast({
      title: "Google My Business Connected",
      description: "Successfully connected to your GMB account for verification",
    });
  };

  const handleFinish = () => {
    onNext({ gmbConnected: isConnected });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Connect Google My Business</h3>
        <p className="text-sm text-muted-foreground">
          Verify your workshop by connecting your Google My Business account (optional)
        </p>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify Your Workshop</CardTitle>
            <CardDescription>
              Connect your GMB account to get verified status and boost customer trust
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 rounded-lg border-2 border-dashed text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect Your GMB Account</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Authorize AutoGos to verify your business through Google My Business
                </p>
              </div>
              <Button onClick={handleConnectGMB}>
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Connect with Google</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Benefits of verification:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Get verified badge on your workshop profile
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Increase customer trust and credibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Sync ratings and reviews automatically
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Better visibility in search results
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Successfully Connected!</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Your Google My Business account is now connected
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleFinish}>
          {isConnected ? "Complete Setup" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
