/*
  This file contains the API services for fetching data from the backend.
  The data is fetched using the browser's Fetch API.
*/
import { usePositionsStore, useSymbolStore, useInfoStore } from '@/app/_utils/store';

/**
 * Fetches positions data from the backend.
 * Updates the positions state in the usePositionsStore with the fetched data.
 * @returns {Promise} The promise object representing the fetch request. Resolves with the positions data.
 * @throws {Error} When the network response is not ok or if there's a problem with the fetch operation.
 */
export const fetchPositions = async () => {
  try {
    const response = await fetch(`/api`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    usePositionsStore.getState().setPositions(data.data);
    return data.data; // Return the positions data here
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};

/**
 * Fetches info data for a specific symbol from the backend.
 * Updates the info state in the useInfoStore with the fetched data.
 * @param {string} symbol - The symbol to fetch info for.
 * @throws {Error} When the network response is not ok or if there's a problem with the fetch operation.
 */
export const fetchInfo = async (symbol) => {
  try {
    const response = await fetch(`/api/info?symbol=${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    useInfoStore.getState().setInfo({ ...useInfoStore.getState().info, [symbol]: data.data });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};