import { useMemo } from 'react';
import { FREE_DELIVERY_THRESHOLD, BASE_DELIVERY_PRICE } from '../constants/cart';

/**
 * Hook for calculating delivery costs
 * @param {number} subtotal - Cart subtotal
 * @returns {Object} Delivery calculation results
 */
export const useDelivery = (subtotal) => {
  // Delivery price (0 if free delivery threshold reached)
  const price = useMemo(
    () => (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_PRICE),
    [subtotal]
  );

  // Is delivery free?
  const isFree = price === 0;

  // Amount remaining until free delivery
  const freeDeliveryRemaining = useMemo(
    () => Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal),
    [subtotal]
  );

  // Progress percentage towards free delivery (0-100)
  const progressPercent = useMemo(
    () => Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100),
    [subtotal]
  );

  return {
    price,
    isFree,
    freeDeliveryRemaining,
    progressPercent,
    threshold: FREE_DELIVERY_THRESHOLD,
    basePrice: BASE_DELIVERY_PRICE
  };
};

export default useDelivery;

