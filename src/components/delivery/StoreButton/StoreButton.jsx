import React from 'react';
import './StoreButton.css';

export const StoreButton = ({ name, deliveryTime, selected, onClick }) => (
  <div 
    className={`store-button ${selected ? 'store-button--active' : ''}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <div className="store-button__name">{name}</div>
    <div className="store-button__time">{deliveryTime}</div>
  </div>
);

export default StoreButton;

