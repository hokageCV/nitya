import type { Routine } from '../types'
import { create } from "zustand";
import { Preferences } from "@capacitor/preferences";

type RoutineStore = {
  routines: Routine[];
  loadRoutines: () => Promise<void>;
  addRoutine: (routine: Routine) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

const STORAGE_KEY = "routines";

export const useRoutineStore = create<RoutineStore>((set) => ({
  routines: [],

  loadRoutines: async () => {
    const storedData = await Preferences.get({ key: STORAGE_KEY });
    const routines = storedData.value ? JSON.parse(storedData.value) : [];
    set({ routines });
  },

  addRoutine: async (routine) => {
    set((state) => {
      const updatedRoutines = [...state.routines, routine];
      Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedRoutines) });
      return { routines: updatedRoutines };
    });
  },

  deleteRoutine: async (id) => {
    set((state) => {
      const updatedRoutines = state.routines.filter((r) => r.id !== id);
      Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedRoutines) });
      return { routines: updatedRoutines };
    });
  },
}));
