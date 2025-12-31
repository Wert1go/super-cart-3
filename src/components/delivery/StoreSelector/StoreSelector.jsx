import React from 'react';
import { StoreButton } from '../StoreButton';
import './StoreSelector.css';

export const StoreSelector = ({ stores, selectedId, onSelect }) => (
  <div className="store-selector">
    {stores.map(store => (
      <StoreButton
        key={store.id}
        name={store.name}
        deliveryTime={store.deliveryTime}
        selected={store.id === selectedId}
        onClick={() => onSelect(store.id)}
      />
    ))}
  </div>
);

export default StoreSelector;

