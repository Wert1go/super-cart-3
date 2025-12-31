import React from 'react';
import { CartItem } from '../CartItem';
import { CartEmpty } from '../CartEmpty';
import './CartList.css';

export const CartList = ({ items, onUpdateQuantity }) => (
  <div className="cart-list">
    {items.length === 0 ? (
      <CartEmpty />
    ) : (
      items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
      ))
    )}
  </div>
);

export default CartList;

