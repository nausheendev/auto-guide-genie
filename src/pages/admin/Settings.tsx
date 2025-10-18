import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  
  // AI Configuration state
  const [aiConfig, setAiConfig] = useState({
    provider: "openai",
    model: "gpt-4",
    temperature: "0.7",
    maxTokens: "2000",
    enabled: true,
    systemPrompt: "You are a helpful automotive assistant providing accurate repair guidance.",
  });

  // Credit System state
  const [creditConfig, setCreditConfig] = useState({
    enabled: true,
    dailyLimit: "3",
    resetTime: "00:00",
    resetTimezone: "UTC",
    creditsPerToken: "0.001",
    gptTokenCost: "0.002",
    aiTokenCost: "0.0015",
  });

  // Site Configuration state
  const [siteConfig, setSiteConfig] = useState({
    siteName: "AutoRepair Guide",
    defaultCountry: "US",
    defaultCurrency: "USD",
    defaultLanguage: "en",
    maintenanceMode: false,
  });

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "AI Configuration saved",
      description: "The AI settings have been updated successfully.",
    });
  };

  const handleCreditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Credit System updated",
      description: "The credit system configuration has been saved successfully.",
    });
  };

  const handleSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Site Configuration saved",
      description: "The site settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage system settings</p>
        </div>

        <div className="mb-6">
          <AdminTabs />
        </div>

        <Tabs defaultValue="ai-config" className="space-y-6">
          <TabsList>
            <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
            <TabsTrigger value="credit-system">Credit System</TabsTrigger>
            <TabsTrigger value="site-config">Site Configuration</TabsTrigger>
          </TabsList>

          {/* AI Configuration Tab */}
          <TabsContent value="ai-config">
            <Card>
              <CardHeader>
                <CardTitle>AI Provider Settings</CardTitle>
                <CardDescription>Configure the AI service provider and model</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAiSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable AI Features</Label>
                      <p className="text-sm text-muted-foreground">Allow AI-powered features in the application</p>
                    </div>
                    <Switch
                      checked={aiConfig.enabled}
                      onCheckedChange={(checked) => setAiConfig({ ...aiConfig, enabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Select value={aiConfig.provider} onValueChange={(value) => setAiConfig({ ...aiConfig, provider: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Select value={aiConfig.model} onValueChange={(value) => setAiConfig({ ...aiConfig, model: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        min="0"
                        max="2"
                        value={aiConfig.temperature}
                        onChange={(e) => setAiConfig({ ...aiConfig, temperature: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Controls randomness (0-2)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        value={aiConfig.maxTokens}
                        onChange={(e) => setAiConfig({ ...aiConfig, maxTokens: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Maximum response length</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      rows={4}
                      value={aiConfig.systemPrompt}
                      onChange={(e) => setAiConfig({ ...aiConfig, systemPrompt: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Instructions for AI behavior</p>
                  </div>

                  <Button type="submit">Save AI Configuration</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credit System Tab */}
          <TabsContent value="credit-system">
            <Card>
              <CardHeader>
                <CardTitle>Credit Settings</CardTitle>
                <CardDescription>Configure credit allocation and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreditSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Credit System</Label>
                      <p className="text-sm text-muted-foreground">Control user access with credits</p>
                    </div>
                    <Switch
                      checked={creditConfig.enabled}
                      onCheckedChange={(checked) => setCreditConfig({ ...creditConfig, enabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dailyLimit">Daily Credit Limit</Label>
                    <Input
                      id="dailyLimit"
                      type="number"
                      value={creditConfig.dailyLimit}
                      onChange={(e) => setCreditConfig({ ...creditConfig, dailyLimit: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Maximum credits per user per day</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetTime">Reset Time</Label>
                      <Input
                        id="resetTime"
                        type="time"
                        value={creditConfig.resetTime}
                        onChange={(e) => setCreditConfig({ ...creditConfig, resetTime: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resetTimezone">Timezone</Label>
                      <Select value={creditConfig.resetTimezone} onValueChange={(value) => setCreditConfig({ ...creditConfig, resetTimezone: value })}>
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
                          value={creditConfig.creditsPerToken}
                          onChange={(e) => setCreditConfig({ ...creditConfig, creditsPerToken: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Base credit cost per AI token</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gptTokenCost">GPT Token Cost</Label>
                        <Input
                          id="gptTokenCost"
                          type="number"
                          step="0.0001"
                          value={creditConfig.gptTokenCost}
                          onChange={(e) => setCreditConfig({ ...creditConfig, gptTokenCost: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Credits deducted per GPT token used</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aiTokenCost">Other AI Token Cost</Label>
                        <Input
                          id="aiTokenCost"
                          type="number"
                          step="0.0001"
                          value={creditConfig.aiTokenCost}
                          onChange={(e) => setCreditConfig({ ...creditConfig, aiTokenCost: e.target.value })}
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
                        Cost = 1000 × {creditConfig.gptTokenCost} = {(1000 * parseFloat(creditConfig.gptTokenCost)).toFixed(2)} credits
                      </p>
                    </div>
                  </div>

                  <Button type="submit">Save Credit Configuration</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Configuration Tab */}
          <TabsContent value="site-config">
            <Card>
              <CardHeader>
                <CardTitle>Site Configuration</CardTitle>
                <CardDescription>Configure general site settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSiteSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteConfig.siteName}
                      onChange={(e) => setSiteConfig({ ...siteConfig, siteName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultCountry">Default Country</Label>
                    <Select value={siteConfig.defaultCountry} onValueChange={(value) => setSiteConfig({ ...siteConfig, defaultCountry: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select value={siteConfig.defaultCurrency} onValueChange={(value) => setSiteConfig({ ...siteConfig, defaultCurrency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select value={siteConfig.defaultLanguage} onValueChange={(value) => setSiteConfig({ ...siteConfig, defaultLanguage: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode to prevent user access</p>
                    </div>
                    <Switch
                      checked={siteConfig.maintenanceMode}
                      onCheckedChange={(checked) => setSiteConfig({ ...siteConfig, maintenanceMode: checked })}
                    />
                  </div>

                  <Button type="submit">Save Site Configuration</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
