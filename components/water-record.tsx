import { GlassWater } from "lucide-react";

interface WaterRecordItemProps {
    amount: number;
    time: string;
  }

const WaterRecordItem = ({amount, time}: WaterRecordItemProps) => {
  return (
    <div className="mt-1 flex justify-between">
      <div className="flex items-center gap-1">
        <GlassWater size={16} className="" />
        <p className="text-xs">+{amount}ml</p>
      </div>

      <p className="text-xs">{time}</p>
    </div>
  );
};

export default WaterRecordItem;
