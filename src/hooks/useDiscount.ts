import { useState, useMemo, useCallback } from 'react';
import { DISCOUNT_MIN_ORDER, DISCOUNT_AMOUNT } from '../constants/cart';
import type { UseDiscountReturn } from '../types';

/**
 * Hook for managing discount state and calculations
 * @param subtotal - Cart subtotal
 * @returns Discount state and actions
 */
export const useDiscount = (subtotal: number): UseDiscountReturn => {
  const [enabled, setEnabled] = useState(false);

  // Can discount be applied? (minimum order requirement)
  const canApply = useMemo(
    () => subtotal >= DISCOUNT_MIN_ORDER,
    [subtotal]
  );

  // Applied discount amount (0 if not enabled or can't apply)
  const amount = useMemo(
    () => (enabled && canApply ? DISCOUNT_AMOUNT : 0),
    [enabled, canApply]
  );

  // Toggle discount on/off
  const toggle = useCallback(() => {
    if (canApply) {
      setEnabled(prev => !prev);
    }
  }, [canApply]);

  // Reset discount (e.g., when cart is cleared)
  const reset = useCallback(() => {
    setEnabled(false);
  }, []);

  return {
    enabled,
    canApply,
    amount,
    toggle,
    reset,
    minOrder: DISCOUNT_MIN_ORDER,
    maxAmount: DISCOUNT_AMOUNT
  };
};

export default useDiscount;

