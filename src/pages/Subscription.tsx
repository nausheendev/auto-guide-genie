import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Receipt, Calendar, Download, CheckCircle2 } from "lucide-react";

export default function Subscription() {
  const currentPlan = {
    name: "Free Plan",
    price: "$0",
    status: "active",
    renewalDate: "N/A",
    credits: 3
  };

  const transactions = [
    { id: "TXN001", date: "2025-01-10", description: "Free Plan - Monthly", amount: "$0.00", status: "completed" },
    { id: "TXN002", date: "2024-12-10", description: "Free Plan - Monthly", amount: "$0.00", status: "completed" }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["3 guides per day", "Basic support", "Community access"],
      current: true
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "month",
      features: ["Unlimited guides", "Priority support", "Advanced AI features", "Downloadable PDFs"],
      current: false
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      features: ["Everything in Premium", "Workshop management", "Lead generation", "Analytics dashboard"],
      current: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Subscription & Billing</h1>
              <p className="text-muted-foreground mt-2">
                Manage your subscription, billing, and transaction history
              </p>
            </div>

            <Separator />

            <Tabs defaultValue="subscription" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="subscription" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Current Plan
                      <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </CardTitle>
                    <CardDescription>Your current subscription details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Plan Name</p>
                        <p className="font-semibold text-lg">{currentPlan.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold text-lg">{currentPlan.price}/month</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Daily Credits</p>
                        <p className="font-semibold text-lg">{currentPlan.credits} guides</p>
                      </div>
                    </div>
                    <Separator />
                    <Button variant="default">Upgrade Plan</Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.name}
                          {plan.current && (
                            <Badge variant="secondary">Current</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          <span className="text-3xl font-bold text-foreground">
                            {plan.price}
                          </span>
                          /{plan.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2 text-sm">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          variant={plan.current ? "outline" : "default"} 
                          className="w-full"
                          disabled={plan.current}
                        >
                          {plan.current ? "Current Plan" : "Upgrade"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">No payment method on file</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Add a payment method to upgrade your plan
                      </p>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      Billing Information
                    </CardTitle>
                    <CardDescription>Your billing address and details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        123 Main Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <Button variant="outline">Update Billing Info</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      Transaction History
                    </CardTitle>
                    <CardDescription>Your billing and payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((txn) => (
                        <div key={txn.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{txn.description}</p>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                                {txn.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(txn.date).toLocaleDateString()}
                              </div>
                              <span>#{txn.id}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold">{txn.amount}</p>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}