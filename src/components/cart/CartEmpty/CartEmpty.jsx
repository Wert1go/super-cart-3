import React from 'react';
import './CartEmpty.css';

export const CartEmpty = ({ message = 'Корзина пуста', hint = 'Добавьте товары из рекомендаций' }) => (
  <div className="cart-empty">
    <p className="cart-empty__message">{message}</p>
    <p className="cart-empty__hint">{hint}</p>
  </div>
);

export default CartEmpty;

