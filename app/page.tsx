"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import GaugeCircle from "@/components/ui/gauge-circle";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const imageUrl = `https://images.unsplash.com/photo-1548780607-46c78f38182d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  const [value, setValue] = useState(0);

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.error("Navegador não suporta notificações");
      return false;
    }
  
    if (Notification.permission === "granted") return true;
  
    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  const sendHydrationReminderNotification = () => {
    const notification = new Notification("Hora de beber água!", {
      body: "Lembre-se de beber mais 200ml de água.",
      icon: imageUrl,
      // icon: "https://unsplash.it/400/400",
    });
    
    setTimeout(() => notification.close(), 3000);
  };

  const handleIncrement = async () => {
    setValue((prev) => (prev < 2000 ? prev + 200 : prev));
  
    if (await requestNotificationPermission()) {
      setTimeout(sendHydrationReminderNotification, 3600000); // Lembrete em 1 hora
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <Header />

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
