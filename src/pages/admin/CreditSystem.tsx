import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function CreditSystem() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [config, setConfig] = useState({
    enabled: true,
    dailyLimit: "3",
    resetTime: "00:00",
    resetTimezone: "UTC",
    creditsPerToken: "0.001",
    gptTokenCost: "0.002",
    aiTokenCost: "0.0015",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Credit System updated",
      description: "The credit system configuration has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Credit System Configuration</h1>
            <p className="text-muted-foreground">Manage user credits and AI token usage</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin")}>Back to Admin</Button>
        </div>

        <div className="max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Settings</CardTitle>
              <CardDescription>Configure credit allocation and limits</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Credit System</Label>
                    <p className="text-sm text-muted-foreground">Control user access with credits</p>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Credit Limit</Label>
                  <Input
                    id="dailyLimit"
                    type="number"
                    value={config.dailyLimit}
                    onChange={(e) => setConfig({ ...config, dailyLimit: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Maximum credits per user per day</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetTime">Reset Time</Label>
                    <Input
                      id="resetTime"
                      type="time"
                      value={config.resetTime}
                      onChange={(e) => setConfig({ ...config, resetTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resetTimezone">Timezone</Label>
                    <Select value={config.resetTimezone} onValueChange={(value) => setConfig({ ...config, resetTimezone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">EST</SelectItem>
                        <SelectItem value="PST">PST</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Token Cost Configuration</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="creditsPerToken">Credits per Token</Label>
                      <Input
                        id="creditsPerToken"
                        type="number"
                        step="0.0001"
                        value={config.creditsPerToken}
                        onChange={(e) => setConfig({ ...config, creditsPerToken: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Base credit cost per AI token</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gptTokenCost">GPT Token Cost</Label>
                      <Input
                        id="gptTokenCost"
                        type="number"
                        step="0.0001"
                        value={config.gptTokenCost}
                        onChange={(e) => setConfig({ ...config, gptTokenCost: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Credits deducted per GPT token used</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aiTokenCost">Other AI Token Cost</Label>
                      <Input
                        id="aiTokenCost"
                        type="number"
                        step="0.0001"
                        value={config.aiTokenCost}
                        onChange={(e) => setConfig({ ...config, aiTokenCost: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Credits deducted per other AI model token</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Calculation Example</h4>
                    <p className="text-sm text-muted-foreground">
                      If a user generates content using 1000 GPT tokens:<br />
                      Cost = 1000 × {config.gptTokenCost} = {(1000 * parseFloat(config.gptTokenCost)).toFixed(2)} credits
                    </p>
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
