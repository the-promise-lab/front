import { create } from 'zustand';

interface BackgroundStore {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundClassName?: string;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;
  setBackgroundGradient: (gradient: string) => void;
  setBackgroundClassName: (className: string) => void;
  resetBackground: () => void;
}

export const useBackgroundStore = create<BackgroundStore>(set => ({
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundGradient: undefined,
  backgroundClassName: undefined,

  setBackgroundColor: color =>
    set({
      backgroundColor: color,
      backgroundImage: undefined,
      backgroundGradient: undefined,
    }),

  setBackgroundImage: image =>
    set({
      backgroundImage: image,
      backgroundColor: undefined,
      backgroundGradient: undefined,
    }),

  setBackgroundGradient: gradient =>
    set({
      backgroundGradient: gradient,
      backgroundColor: undefined,
      backgroundImage: undefined,
    }),

  setBackgroundClassName: className =>
    set({
      backgroundClassName: className,
    }),

  resetBackground: () =>
    set({
      backgroundColor: undefined,
      backgroundImage: undefined,
      backgroundGradient: undefined,
      backgroundClassName: undefined,
    }),
}));
