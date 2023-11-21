import { create } from 'zustand';

export const usePositionsStore = create((set) => ({
  positions: [],
  setPositions: (positions) => set({ positions }),
}));
