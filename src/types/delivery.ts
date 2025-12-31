/**
 * Delivery domain types
 */

/** Store/delivery option */
export interface Store {
  id: string;
  name: string;
  deliveryTime: string;
}

/** Return type for useDelivery hook */
export interface UseDeliveryReturn {
  price: number;
  isFree: boolean;
  freeDeliveryRemaining: number;
  progressPercent: number;
  threshold: number;
  basePrice: number;
}

