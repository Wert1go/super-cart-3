import { useMemo, useCallback } from 'react';
import { formatPrice } from '../utils/formatPrice';
import type { UseCheckoutParams, UseCheckoutReturn } from '../types';

/**
 * Hook for checkout calculations and actions
 * @param params - Checkout parameters
 * @returns Checkout state and actions
 */
export const useCheckout = ({ 
  subtotal, 
  deliveryPrice, 
  discountAmount, 
  items,
  totalCount 
}: UseCheckoutParams): UseCheckoutReturn => {
  // Total price to pay
  const total = useMemo(
    () => subtotal + deliveryPrice - discountAmount,
    [subtotal, deliveryPrice, discountAmount]
  );

  // Formatted total for display
  const totalFormatted = useMemo(
    () => formatPrice(total),
    [total]
  );

  // Is checkout available?
  const canCheckout = items.length > 0;

  // Perform checkout
  const checkout = useCallback(() => {
    if (!canCheckout) return;

    const isFreeDelivery = deliveryPrice === 0;
    
    alert(
      `Оформление заказа:\n\n` +
      `Товаров: ${totalCount}\n` +
      `Сумма: ${formatPrice(subtotal)}\n` +
      `Доставка: ${isFreeDelivery ? 'бесплатно' : formatPrice(deliveryPrice)}\n` +
      `Скидка: ${discountAmount > 0 ? `-${formatPrice(discountAmount)}` : 'нет'}\n\n` +
      `Итого: ${formatPrice(total)}`
    );
  }, [canCheckout, subtotal, deliveryPrice, discountAmount, total, totalCount]);

  // Share cart contents
  const share = useCallback(() => {
    const cartText = items
      .map(item => `${item.name} × ${item.quantity} = ${formatPrice(item.priceNum * item.quantity)}`)
      .join('\n');

    const shareData = {
      title: 'Моя корзина',
      text: `${cartText}\n\nИтого: ${formatPrice(total)}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert(`Корзина:\n${cartText}\n\nИтого: ${formatPrice(total)}`);
    }
  }, [items, total]);

  return {
    total,
    totalFormatted,
    canCheckout,
    checkout,
    share
  };
};

export default useCheckout;

