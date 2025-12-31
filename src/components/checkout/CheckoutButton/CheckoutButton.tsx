import React from 'react';
import './CheckoutButton.css';

interface CheckoutButtonProps {
  deliveryTime: string;
  label: string;
  total: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  deliveryTime, 
  label, 
  total, 
  onClick, 
  disabled = false 
}) => (
  <button 
    className={`checkout-button ${disabled ? 'checkout-button--disabled' : ''}`} 
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    <span className="checkout-button__time">{deliveryTime}</span>
    <span className="checkout-button__label">{label}</span>
    <span className="checkout-button__total">{total}</span>
  </button>
);

export default CheckoutButton;
