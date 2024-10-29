"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import GaugeCircle from "@/components/ui/gauge-circle";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prev) => (prev < 2000 ? prev + 200 : prev));
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <Header/>

      {/* Center */}
      <div className="flex flex-col items-center gap-10 justify-center flex-grow">
        <GaugeCircle
          max={2000}
          min={0}
          value={value}
          gaugePrimaryColor="rgb(79 70 229)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
        <Button
          onClick={handleIncrement}
          className="gap-1 bg-[#4f46e5] hover:bg-[#4e46e5de]"
        >
          <PlusIcon />
          200ml
        </Button>
      </div>
    </div>
  );
}
