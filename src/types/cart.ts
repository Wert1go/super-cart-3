/**
 * Cart domain types
 */

/** Item in the shopping cart */
export interface CartItem {
  id: string;
  image: string;
  name: string;
  priceNum: number;
  weight: string;
  quantity: number;
}

/** Product that can be added to cart */
export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  priceNum: number;
  weight?: string;
}

/** Recommended product with add button */
export interface RecommendedProduct extends Product {
  addButton: string;
}

/** Return type for useCart hook */
export interface UseCartReturn {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  itemIds: string[];
  isEmpty: boolean;
  addItem: (product: Product) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

