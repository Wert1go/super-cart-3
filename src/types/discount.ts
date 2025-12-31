/**
 * Discount domain types
 */

/** Return type for useDiscount hook */
export interface UseDiscountReturn {
  enabled: boolean;
  canApply: boolean;
  amount: number;
  minOrder: number;
  maxAmount: number;
  toggle: () => void;
  reset: () => void;
}

/** Discount data for UI components */
export interface DiscountData {
  text: string;
  promoText: string;
  badge: string;
  enabled: boolean;
  canApply: boolean;
  discountAmount: number;
}

