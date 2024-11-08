// drink.ts
import { create } from "zustand";

type Drink = {
  id: string | number;
  amount: string;
  time: string;
};

type DrinkStore = {
  dailyDrinks: Drink[];
  dailyGoal: number;
  incrementAmount: number;
  currentWaterDrunkAmount: number; // Add this property to track the current amount drunk
  setDailyGoal: (goal: number) => void;
  setIncrementAmount: (amount: number) => void;
  addDrink: (amount: number) => void;
  resetDrinks: () => void;  // Add a reset function for drinks and current amount
  setCurrentWaterDrunkAmount: (amount: number) => void;  // Add function to update current amount drunk
};

export const useDrinkStore = create<DrinkStore>((set) => ({
  dailyDrinks: [],
  dailyGoal: 1000,
  incrementAmount: 100,
  currentWaterDrunkAmount: 0,  // Initial value is 0
  setIncrementAmount: (amount) => set({ incrementAmount: amount}),
  setDailyGoal: (goal) => set({ dailyGoal: goal }),
  addDrink: (amount) =>
    set((state) => ({
      dailyDrinks: [
        ...state.dailyDrinks,
        { id: Date.now(), amount: amount.toString(), time: new Date().toLocaleTimeString() },
      ],
      currentWaterDrunkAmount: state.currentWaterDrunkAmount + amount,  // Increment the current water drunk amount
    })),
  resetDrinks: () =>
    set({
      dailyDrinks: [],
      currentWaterDrunkAmount: 0,  // Reset the current amount to 0
    }),
  setCurrentWaterDrunkAmount: (amount) => set({ currentWaterDrunkAmount: amount }),  // Update the current amount drunk directly
}));
