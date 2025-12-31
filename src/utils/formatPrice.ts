/**
 * Formats price in rubles
 * @param price - Price in rubles
 * @returns Formatted price with ruble symbol
 */
export const formatPrice = (price: number): string => `${price}₽`;

/**
 * Parses price string to number
 * @param priceStr - Price string (e.g., "499₽")
 * @returns Numeric price value
 */
export const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
};

export default formatPrice;

