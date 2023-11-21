import { usePositionsStore } from '@/app/_utils/store';

export const fetchPositions = async () => {

  try {
    const response = await fetch('/api');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    usePositionsStore.getState().setPositions(data.data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};
