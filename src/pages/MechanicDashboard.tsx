import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MechanicGMB from "./MechanicGMB";
import MechanicWorkshops from "./MechanicWorkshops";
import MechanicLeads from "./MechanicLeads";

export default function MechanicDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <ProfileCard showMechanicButton={false} />

            <Separator />

            <Tabs defaultValue="workshops" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="gmb">GMB Connection</TabsTrigger>
              </TabsList>

              <TabsContent value="workshops" className="mt-6">
                <MechanicWorkshops />
              </TabsContent>

              <TabsContent value="offers" className="mt-6">
                <p className="text-muted-foreground text-center py-8">
                  Manage your offers from the <a href="/mechanic-offers" className="text-primary hover:underline">Offers page</a>
                </p>
              </TabsContent>

              <TabsContent value="leads" className="mt-6">
                <MechanicLeads />
              </TabsContent>

              <TabsContent value="gmb" className="mt-6">
                <MechanicGMB />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
