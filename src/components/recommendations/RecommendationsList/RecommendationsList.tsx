import React from 'react';
import { RecommendedProduct } from '../RecommendedProduct';
import type { RecommendedProduct as RecommendedProductType } from '../../../types';
import './RecommendationsList.css';

interface RecommendationsListProps {
  title: string;
  items: RecommendedProductType[];
  onAddProduct: (product: RecommendedProductType) => void;
  cartItemIds?: string[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ 
  title, 
  items, 
  onAddProduct, 
  cartItemIds = [] 
}) => (
  <div className="recommendations">
    <h2 className="recommendations__title">{title}</h2>
    <div className="recommendations__list">
      {items.map(item => (
        <RecommendedProduct
          key={item.id}
          image={item.image}
          addButton={item.addButton}
          price={item.price}
          onAdd={() => onAddProduct(item)}
          inCart={cartItemIds.includes(item.id)}
        />
      ))}
    </div>
  </div>
);

export default RecommendationsList;
