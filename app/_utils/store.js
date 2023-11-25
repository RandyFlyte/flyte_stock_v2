/*
  This file is used to store the data from the API calls.
  The data is stored in a global state using Zustand.
*/
import { create } from 'zustand';

export const usePositionsStore = create((set, get) => ({
  positions: [],
  setPositions: (positions) => set({ positions }),
  filteredSymbol: 'All',
  setFilteredSymbol: (symbol) => set({ filteredSymbol: symbol }),
  getTotalUnrealizedPL: (symbol) => {
    // get() is used to access the current state
    const positions = get().positions;
    const filtered =
      symbol === 'All'
        ? positions
        : positions.filter((p) => p.underlyingSymbol === symbol);
    return filtered.reduce((total, position) => {
      // Ensure the difference is a string that can be converted to a float
      const difference = parseFloat(
        position.difference.replace(/[^\d.-]/g, '')
      );
      return total + difference;
    }, 0);
  },
}));

export const useSymbolStore = create((set) => ({
  symbol: '',
  setSymbol: (symbol) => set({ symbol }),
}));

export const useInfoStore = create((set) => ({
  info: {},
  setInfo: (info) => set({ info }),
}));
