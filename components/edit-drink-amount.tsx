import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { useDrinkStore } from "@/components/store/drink";


const EditDrinkAmountButton = () => {
  const store = useDrinkStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newDrinkAmount, setNewDrinkAmount] = useState(store.currentWaterDrunkAmount);


  const handleDrinkAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= 10000) {
      setNewDrinkAmount(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a value between 1000 and 10000.");
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDrinkAmount >= 1 && newDrinkAmount <= 10000) {
      store.setIncrementAmount(newDrinkAmount);
      setIsDialogOpen(false);
    }
  }
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="px-4">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:1/4 w-10/12 rounded-md md:w-1/2">
        <form>
          <DialogHeader>
            <DialogTitle>Increment Amount</DialogTitle>
            <DialogDescription>
              Type in the your increment amount amount(ml){" "}
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-3">
                <Input
                  id="drinkAmount"
                  defaultValue={store.incrementAmount}
                  type="number"
                  className="col-span-3"
                  onChange={handleDrinkAmountChange}
                />
                {errorMessage && (
                  <p className="px-2 text-sm text-red-400">{errorMessage}</p>
                )}
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={(e) => handleSaveChanges(e)}
              type="submit"
              disabled={errorMessage.length > 0}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDrinkAmountButton;
