"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import GaugeCircle from "@/components/ui/gauge-circle";
import { Separator } from "@/components/ui/separator";
import WaterRecordItem from "@/components/water-record";
import { PlusIcon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useDrinkStore } from "@/components/store/drink";
import EditDrinkAmountButton from "@/components/edit-drink-amount";

export default function Home() {
  const imageUrl = `https://images.unsplash.com/photo-1548780607-46c78f38182d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
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
    const incrementAmount = store.incrementAmount;

    store.addDrink(incrementAmount);

    if (await requestNotificationPermission()) {
      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        sendHydrationReminderNotification();
      }, 3600 * 1000);

      setTimeoutId(newTimeoutId);
    }
  };

  const handleReset = () => {
    store.resetDrinks();
  };

  const primaryColor =
    store.currentWaterDrunkAmount >= store.dailyGoal
      ? "rgb(34, 197, 94)"
      : "rgb(79, 70, 229)";

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header dailyGoal={store.dailyGoal} />

      {/* Center */}
      <div
        className={`flex w-full flex-grow flex-col items-center justify-center gap-10`}
      >
        <div className="mt-12 flex flex-none flex-col items-center justify-center gap-10">
          <GaugeCircle
            max={store.dailyGoal}
            min={0}
            value={store.currentWaterDrunkAmount}
            gaugePrimaryColor={primaryColor}
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
          <div className="flex gap-2 flex-col">
            <Button
              onClick={handleIncrement}
              className={`${
                store.currentWaterDrunkAmount >= store.dailyGoal
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#4f46e5] hover:bg-[#4e46e5de]"
              } gap-1`}
            >
              <PlusIcon />
              {store.incrementAmount}ml
            </Button>
            <div className="flex gap-2 justify-center">
              <EditDrinkAmountButton/>
              <Button
                variant={"destructive"}
                onClick={handleReset}
                className="px-3"
                aria-label="reset"
                title="Reset daily records"
              >
                <RotateCcw size={16} className="" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-1/3 flex-col justify-between gap-3 text-gray-500">
          <h4 className="text-sm leading-none">Daily records</h4>
          <Separator />

          {store.dailyDrinks.map((record) => (
            <WaterRecordItem
              key={record.id}
              amount={Number(record.amount)}
              time={record.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
