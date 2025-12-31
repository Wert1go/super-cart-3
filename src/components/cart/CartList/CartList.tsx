import React from 'react';
import { CartItem } from '../CartItem';
import { CartEmpty } from '../CartEmpty';
import type { CartItem as CartItemType } from '../../../types';
import './CartList.css';

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ items, onUpdateQuantity }) => (
  <div className="cart-list">
    {items.length === 0 ? (
      <CartEmpty />
    ) : (
      items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
      ))
    )}
  </div>
);

export default CartList;
