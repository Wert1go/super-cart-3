import React from 'react';
import { QuantityController } from '../QuantityController';
import { formatPrice } from '../../../utils/formatPrice';
import './CartItem.css';

export const CartItem = ({ 
  image, 
  name, 
  priceNum, 
  weight, 
  quantity, 
  onIncrement, 
  onDecrement 
}) => (
  <div className="cart-item">
    <img className="cart-item__image" src={image} alt={name} />
    <div className="cart-item__info">
      <div className="cart-item__name">{name}</div>
      <div className="cart-item__meta">
        <span className="cart-item__price">{formatPrice(priceNum * quantity)}</span>
        <span className="cart-item__weight">{weight}</span>
        {quantity > 1 && (
          <span className="cart-item__unit-price">
            ({formatPrice(priceNum)} × {quantity})
          </span>
        )}
      </div>
    </div>
    <QuantityController 
      quantity={quantity} 
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  </div>
);

export default CartItem;

