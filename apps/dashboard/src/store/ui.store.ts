import { create } from "zustand";

interface State {
  customTitle: string;

  setCustomTitle: (title: string) => void;
}

export const useUIStore = create<State>()((set) => ({
  customTitle: "",

  setCustomTitle: (title: string) => set({ customTitle: title }),
}));
