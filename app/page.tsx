"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import GaugeCircle from "@/components/ui/gauge-circle";
import { Separator } from "@/components/ui/separator";
import WaterRecordItem from "@/components/water-record";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDrinkStore } from "@/components/store/drink";

export default function Home() {
  const imageUrl = `https://images.unsplash.com/photo-1548780607-46c78f38182d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  const [value, setValue] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [waterRecords, setWaterRecords] = useState<
    { amount: number; time: string }[]
  >([]);
  const store = useDrinkStore();
  // const bellSound = new Audio("/bell_ring.mp3");

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.error("Navegador não suporta notificações");
      return false;
    }

    if (Notification.permission === "granted") return true;

    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  // const playBellSoundThreeTimes = () => {
  //   let playCount = 0;

  //   const handlePlayEnd = () => {
  //     playCount++;

  //     if (playCount < 1) {
  //       bellSound.play();
  //     } else {
  //       bellSound.removeEventListener("ended", handlePlayEnd);
  //     }
  //   };

  //   if (bellSound) {
  //     bellSound.play();
  //     bellSound.addEventListener("ended", handlePlayEnd);
  //   }
  // };

  const sendHydrationReminderNotification = () => {
    const notification = new Notification("Hora de beber água!", {
      body: "Lembre-se de beber mais 200ml de água.",
      icon: imageUrl,
    });
    setTimeout(() => notification.close(), 3000);
  };

  const handleIncrement = async () => {
    setValue((prev) => (prev < 2000 ? prev + 200 : prev));

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setWaterRecords((prevRecords) => [
      ...prevRecords,
      { amount: 200, time: currentTime },
    ]);

    if (await requestNotificationPermission()) {
      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        sendHydrationReminderNotification();
        // playBellSoundThreeTimes();
      }, 3600 * 1000);

      setTimeoutId(newTimeoutId);
    }
  };

  const primaryColor = value >= 2000 ? "rgb(34, 197, 94)" : "rgb(79, 70, 229)";

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header dailyGoal={store.dailyGoal}/>

      {/* Center */}
      <div
        className={`flex w-full flex-grow flex-col items-center justify-center gap-10`}
      >
        <div className="mt-12 flex flex-none flex-col items-center justify-center gap-10">
          <GaugeCircle
            max={store.dailyGoal}
            min={0}
            value={value}
            gaugePrimaryColor={primaryColor}
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
          <Button
            onClick={handleIncrement}
            className={`${
              value >= 2000
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#4f46e5] hover:bg-[#4e46e5de]"
            } gap-1`}
          >
            <PlusIcon />
            200ml
          </Button>
        </div>

        <div className="mt-12 flex w-1/3 flex-col justify-between gap-3 text-gray-500">
          <h4 className="text-sm leading-none">Daily records</h4>
          <Separator />

          {waterRecords.map((record, index) => (
            <WaterRecordItem
              key={index}
              amount={record.amount}
              time={record.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
