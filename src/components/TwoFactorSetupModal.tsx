import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Smartphone, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TwoFactorSetupModal({ isOpen, onClose }: TwoFactorSetupModalProps) {
  const [step, setStep] = useState<"setup" | "verify">("setup");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Mock secret key and QR code
  const secretKey = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = "https://placehold.co/200x200/2563eb/white?text=QR+Code";

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Secret key copied to clipboard",
    });
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    // Simulate API verification
    setTimeout(() => {
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled",
      });
      setIsVerifying(false);
      onClose();
      setStep("setup");
      setVerificationCode("");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Enable Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            {step === "setup" 
              ? "Scan the QR code with your authenticator app" 
              : "Enter the 6-digit code from your authenticator app"}
          </DialogDescription>
        </DialogHeader>

        {step === "setup" ? (
          <div className="space-y-4">
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                Use apps like Google Authenticator, Authy, or Microsoft Authenticator
              </AlertDescription>
            </Alert>

            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>

              <div className="w-full space-y-2">
                <Label>Or enter this key manually:</Label>
                <div className="flex gap-2">
                  <Input 
                    value={secretKey} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopySecret}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep("verify")}>
                Continue
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
            </div>

            <Alert>
              <AlertDescription>
                The code is 6 digits and refreshes every 30 seconds
              </AlertDescription>
            </Alert>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setStep("setup")} disabled={isVerifying}>
                Back
              </Button>
              <Button 
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Enable"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
