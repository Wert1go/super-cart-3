import { useState, useMemo, useCallback } from 'react';
import type { CartItem, Product, UseCartReturn } from '../types';

/**
 * Hook for managing cart state and operations
 * @param initialItems - Initial cart items
 * @returns Cart state and actions
 */
export const useCart = (initialItems: CartItem[] = []): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // Total count of items in cart
  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Subtotal (without delivery and discounts)
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0),
    [items]
  );

  // Array of item IDs (for checking in recommendations)
  const itemIds = useMemo(
    () => items.map(item => item.id),
    [items]
  );

  // Update item quantity (removes item if quantity <= 0)
  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(current => current.filter(item => item.id !== itemId));
    } else {
      setItems(current =>
        current.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  // Add item to cart (or increment if already exists)
  const addItem = useCallback((product: Product) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === product.id);
      
      if (existingItem) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...current, {
        id: product.id,
        image: product.image,
        name: product.name,
        priceNum: product.priceNum,
        weight: product.weight || '100Г',
        quantity: 1
      }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setItems(current => current.filter(item => item.id !== itemId));
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    totalCount,
    subtotal,
    itemIds,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: items.length === 0
  };
};

export default useCart;

