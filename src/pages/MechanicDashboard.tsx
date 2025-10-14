import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MechanicGMB from "./MechanicGMB";
import MechanicWorkshops from "./MechanicWorkshops";
import MechanicLeads from "./MechanicLeads";
import MechanicOffers from "./MechanicOffers";

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
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="workshops" className="text-xs sm:text-sm">Workshops</TabsTrigger>
                <TabsTrigger value="offers" className="text-xs sm:text-sm">Offers</TabsTrigger>
                <TabsTrigger value="leads" className="text-xs sm:text-sm">Leads</TabsTrigger>
                <TabsTrigger value="gmb" className="text-xs sm:text-sm">GMB</TabsTrigger>
              </TabsList>

              <TabsContent value="workshops" className="mt-6">
                <MechanicWorkshops />
              </TabsContent>

              <TabsContent value="offers" className="mt-6">
                <MechanicOffers />
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
