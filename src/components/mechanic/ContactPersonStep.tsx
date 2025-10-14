import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { User, Phone, Briefcase, MessageSquare } from "lucide-react";

interface ContactPersonStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function ContactPersonStep({ onNext, onBack, initialData }: ContactPersonStepProps) {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    designation: "",
    contactNumber: "",
    whatsappNumber: ""
  });

  const designations = [
    "Owner",
    "Manager",
    "Service Advisor",
    "Mechanic",
    "Other"
  ];

  const handleContinue = () => {
    onNext(formData);
  };

  const isFormValid = formData.name && formData.designation && formData.contactNumber && formData.whatsappNumber;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Contact Person Details</h3>
        <p className="text-sm text-muted-foreground">Add contact information for account verification and lead notifications</p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <Label htmlFor="name">Contact Person Name *</Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="designation">Designation *</Label>
          <div className="relative mt-2">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
            <Select
              value={formData.designation}
              onValueChange={(value) => setFormData({ ...formData, designation: value })}
            >
              <SelectTrigger id="designation" className="pl-10">
                <SelectValue placeholder="Select designation" />
              </SelectTrigger>
              <SelectContent>
                {designations.map((designation) => (
                  <SelectItem key={designation} value={designation}>
                    {designation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="contactNumber">Contact Number (For Internal Verification) *</Label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="contactNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">This number will not be visible to users</p>
        </div>

        <div>
          <Label htmlFor="whatsappNumber">Business WhatsApp Number *</Label>
          <div className="relative mt-2">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="whatsappNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Leads will be sent to this WhatsApp number</p>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} size="lg" disabled={!isFormValid}>
          Continue to GMB Connection
        </Button>
      </div>
    </div>
  );
}
