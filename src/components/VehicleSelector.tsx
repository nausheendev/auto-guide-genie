import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const MAKES = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Volkswagen"];
const MODELS = ["Camry", "Accord", "F-150", "Silverado", "3 Series", "C-Class", "A4", "Golf"];
const YEARS = Array.from({ length: 30 }, (_, i) => (2025 - i).toString());

export const VehicleSelector = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="make">Make</Label>
        <Select value={make} onValueChange={setMake}>
          <SelectTrigger id="make" className="bg-card">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {MAKES.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Select value={model} onValueChange={setModel} disabled={!make}>
          <SelectTrigger id="model" className="bg-card">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {MODELS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Select value={year} onValueChange={setYear} disabled={!model}>
          <SelectTrigger id="year" className="bg-card">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {YEARS.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
