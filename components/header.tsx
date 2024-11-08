import {
  Dialog,
  DialogDescription,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Sun } from "lucide-react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useDrinkStore } from "@/components/store/drink";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";

const currentDate = format(new Date(), "dd 'de' MMMM' de 'yyyy", {
  locale: ptBR,
});

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Bom dia";
  } else if (currentHour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};
const greeting = getGreeting();

interface HeaderProps {
  dailyGoal: number;
}

const Header = ({ dailyGoal }: HeaderProps) => {
  const store = useDrinkStore();
  const [newDailyGoal, setNewDailyGoal] = useState(store.dailyGoal);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDailyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= 1000 && value <= 10000) {
      setNewDailyGoal(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a value between 1000 and 10000.");
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDailyGoal >= 1000 && newDailyGoal <= 10000) {
      store.setDailyGoal(newDailyGoal);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="absolute top-12 flex w-full flex-col justify-center gap-2 px-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">{greeting}</h1>
          <Sun />
        </div>
      </div>
      <div>
        <h1 className="text">{currentDate}</h1>
        <div className="flex gap-1">
          <p className="text-sm">Daily Goal</p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 transition-transform hover:text-indigo-500">
                <p className="text-sm font-semibold">{dailyGoal} ml</p>
                <Pencil size={14} />
              </button>
            </DialogTrigger>
            <DialogContent className="lg:1/4 w-10/12 rounded-md md:w-1/2">
              <form>
                <DialogHeader>
                  <DialogTitle>Daily goal</DialogTitle>
                  <DialogDescription>
                    Type in the your daily goal amount(ml){" "}
                  </DialogDescription>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-3">
                      <Input
                        id="username"
                        defaultValue={store.dailyGoal}
                        type="number"
                        className="col-span-3"
                        onChange={handleDailyAmountChange}
                      />
                      {errorMessage && (
                        <p className="px-2 text-sm text-red-400">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={(e)=> handleSaveChanges(e)}
                    type="submit"
                    disabled={errorMessage.length > 0}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
