import { create } from "zustand";

type Drink = {
  id: string | number;
  amount: string;
  time: string;
};

type DrinkStore = {
  dailyDrinks: Drink[];
  dailyGoal: number;
};

export const useDrinkStore = create<DrinkStore>(() => ({
    dailyDrinks: [],
    dailyGoal: 1000
}));
