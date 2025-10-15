import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MaintenanceMode() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [config, setConfig] = useState({
    enabled: false,
    title: "Site Under Maintenance",
    message: "We're currently performing scheduled maintenance. We'll be back online shortly. Thank you for your patience!",
    estimatedTime: "",
    allowAdminAccess: true,
    showCountdown: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: config.enabled ? "Maintenance mode enabled" : "Maintenance mode disabled",
      description: config.enabled 
        ? "The site is now in maintenance mode" 
        : "The site is now accessible to all users",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Maintenance Mode</h1>
            <p className="text-muted-foreground">Control site accessibility during maintenance</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin")}>Back to Admin</Button>
        </div>

        <div className="max-w-3xl space-y-6">
          <Alert variant={config.enabled ? "destructive" : "default"}>
            <div className="flex items-start gap-3">
              {config.enabled ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              <div className="flex-1">
                <AlertTitle>
                  {config.enabled ? "Maintenance Mode Active" : "Site Operational"}
                </AlertTitle>
                <AlertDescription>
                  {config.enabled 
                    ? "The site is currently in maintenance mode. Only admins can access it." 
                    : "The site is accessible to all users."}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Settings</CardTitle>
              <CardDescription>Configure maintenance mode display and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent regular users from accessing the site
                    </p>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Maintenance Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={config.message}
                    onChange={(e) => setConfig({ ...config, message: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Message displayed to users during maintenance
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Completion Time</Label>
                  <Input
                    id="estimatedTime"
                    type="datetime-local"
                    value={config.estimatedTime}
                    onChange={(e) => setConfig({ ...config, estimatedTime: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: When the site will be back online
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Admin Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Admins can access the site during maintenance
                    </p>
                  </div>
                  <Switch
                    checked={config.allowAdminAccess}
                    onCheckedChange={(checked) => setConfig({ ...config, allowAdminAccess: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Countdown Timer</Label>
                    <p className="text-sm text-muted-foreground">
                      Display countdown to estimated completion
                    </p>
                  </div>
                  <Switch
                    checked={config.showCountdown}
                    onCheckedChange={(checked) => setConfig({ ...config, showCountdown: checked })}
                  />
                </div>

                <div className="border-t pt-6">
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Preview</h4>
                    <div className="bg-background p-6 rounded border text-center space-y-4">
                      <h2 className="text-2xl font-bold">{config.title}</h2>
                      <p className="text-muted-foreground">{config.message}</p>
                      {config.estimatedTime && config.showCountdown && (
                        <p className="text-sm">
                          Estimated completion: {new Date(config.estimatedTime).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button type="submit">Save Configuration</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
