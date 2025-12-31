import React from 'react';
import { DiscountSection } from '../DiscountSection';
import { CheckoutButton } from '../CheckoutButton';
import type { DiscountData, CheckoutData } from '../../../types';
import './CheckoutBlock.css';

interface CheckoutBlockProps {
  discount: DiscountData;
  checkout: CheckoutData;
  onToggleDiscount: () => void;
  onCheckout: () => void;
}

export const CheckoutBlock: React.FC<CheckoutBlockProps> = ({ 
  discount, 
  checkout, 
  onToggleDiscount, 
  onCheckout 
}) => (
  <div className="checkout-block">
    <DiscountSection
      discountText={discount.text}
      promoText={discount.promoText}
      badge={discount.badge}
      enabled={discount.enabled}
      onToggle={onToggleDiscount}
      canApply={discount.canApply}
      discountAmount={discount.discountAmount}
    />
    <CheckoutButton
      deliveryTime={checkout.deliveryTime}
      label={checkout.label}
      total={checkout.total}
      onClick={onCheckout}
      disabled={checkout.disabled}
    />
  </div>
);

export default CheckoutBlock;
