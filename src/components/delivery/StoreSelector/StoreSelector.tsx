import React from 'react';
import { StoreButton } from '../StoreButton';
import type { Store } from '../../../types';
import './StoreSelector.css';

interface StoreSelectorProps {
  stores: Store[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({ stores, selectedId, onSelect }) => (
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
