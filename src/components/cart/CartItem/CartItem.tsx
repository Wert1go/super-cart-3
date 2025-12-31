import React from 'react';
import { QuantityController } from '../QuantityController';
import { formatPrice } from '../../../utils/formatPrice';
import type { CartItem as CartItemType } from '../../../types';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item,
  onIncrement, 
  onDecrement 
}) => {
  const { image, name, priceNum, weight, quantity } = item;
  
  return (
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
};

export default CartItem;
