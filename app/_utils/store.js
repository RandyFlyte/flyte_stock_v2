/*
  This file is used to store the data from the API calls.
  The data is stored in a global state using Zustand.
*/
import { create } from 'zustand';

export const usePositionsStore = create((set) => ({
  positions: [],
  setPositions: (positions) => set({ positions }),
}));

export const useSymbolStore = create((set) => ({
  symbol: '',
  setSymbol: (symbol) => set({ symbol }),
}));

export const useInfoStore = create((set) => ({
  info: {},
  setInfo: (info) => set({ info }),
}));
