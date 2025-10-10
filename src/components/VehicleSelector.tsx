import { useState } from "react";
import { Label } from "@/components/ui/label";
import { VehicleCombobox } from "./VehicleCombobox";

const MAKES = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Nissan", "Mazda", "Hyundai", "Kia"];
const MODELS = ["Camry", "Accord", "F-150", "Silverado", "3 Series", "C-Class", "A4", "Golf", "Altima", "CX-5", "Elantra", "Sportage"];
const YEARS = Array.from({ length: 30 }, (_, i) => (2025 - i).toString());

export const VehicleSelector = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="make">Make</Label>
        <VehicleCombobox
          value={make}
          onValueChange={setMake}
          options={MAKES}
          placeholder="Select make"
          searchPlaceholder="Search makes..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <VehicleCombobox
          value={model}
          onValueChange={setModel}
          options={MODELS}
          placeholder="Select model"
          searchPlaceholder="Search models..."
          disabled={!make}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <VehicleCombobox
          value={year}
          onValueChange={setYear}
          options={YEARS}
          placeholder="Select year"
          searchPlaceholder="Search years..."
          disabled={!model}
        />
      </div>
    </div>
  );
};
