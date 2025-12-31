import React from 'react';
import './CheckoutButton.css';

export const CheckoutButton = ({ 
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

