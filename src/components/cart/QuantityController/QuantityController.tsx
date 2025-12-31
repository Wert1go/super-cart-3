import React from 'react';
import './QuantityController.css';

interface QuantityControllerProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityController: React.FC<QuantityControllerProps> = ({ 
  quantity, 
  onIncrement, 
  onDecrement 
}) => (
  <div className="quantity-controller">
    <button 
      className="quantity-controller__btn" 
      onClick={onDecrement}
      aria-label="Уменьшить количество"
    >
      <img src="Assets/figma/icons/minus-icon.png" alt="" />
    </button>
    <span className="quantity-controller__value">{quantity}</span>
    <button 
      className="quantity-controller__btn" 
      onClick={onIncrement}
      aria-label="Увеличить количество"
    >
      <img src="Assets/figma/icons/plus-icon.png" alt="" />
    </button>
  </div>
);

export default QuantityController;
