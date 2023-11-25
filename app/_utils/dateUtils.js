/**
 * Calculates the number of days from the current date to a given expiration date.
 * @param {string} expDateString - The expiration date as a string.
 * @returns {number} The number of days until the expiration date.
 */
export const calculateExpDate = (expDateString) => {
  const today = new Date();
  const expirationDate = new Date(expDateString);
  const timeDiff = expirationDate - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};
