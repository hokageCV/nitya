import type { Routine } from '../types'
import { create } from "zustand";
import { Preferences } from "@capacitor/preferences";

type RoutineStore = {
  routines: Routine[];
  loadRoutines: () => Promise<void>;
  addRoutine: (routine: Routine) => Promise<void>;
  updateRoutine: (updatedRoutine: Routine) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

const STORAGE_KEY = "routines";

export const useRoutineStore = create<RoutineStore>((set, get) => ({
  routines: [],

  loadRoutines: async () => {
    const storedData = await Preferences.get({ key: STORAGE_KEY });
    const routines = storedData.value ? JSON.parse(storedData.value) : [];
    set({ routines });
  },

  addRoutine: async (routine) => {
    const updatedRoutines = [...get().routines, routine];
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedRoutines) });
    set({ routines: updatedRoutines });
  },

  updateRoutine: async (updatedRoutine) => {
    const updatedRoutines = get().routines.map((r) => (r.id === updatedRoutine.id ? updatedRoutine : r));
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedRoutines) });
    set({ routines: updatedRoutines });
  },

  deleteRoutine: async (id) => {
    const updatedRoutines = get().routines.filter((r) => r.id !== id);
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedRoutines) });
    set({ routines: updatedRoutines });
  },
}));
