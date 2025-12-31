/**
 * Checkout domain types
 */

/** Parameters for useCheckout hook */
export interface UseCheckoutParams {
  subtotal: number;
  deliveryPrice: number;
  discountAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    priceNum: number;
  }>;
  totalCount: number;
}

/** Return type for useCheckout hook */
export interface UseCheckoutReturn {
  total: number;
  totalFormatted: string;
  canCheckout: boolean;
  checkout: () => void;
  share: () => void;
}

/** Checkout button data for UI */
export interface CheckoutData {
  deliveryTime: string;
  label: string;
  total: string;
  disabled: boolean;
}

