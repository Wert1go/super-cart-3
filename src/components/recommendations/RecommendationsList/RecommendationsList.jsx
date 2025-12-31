import React from 'react';
import { RecommendedProduct } from '../RecommendedProduct';
import './RecommendationsList.css';

export const RecommendationsList = ({ title, items, onAddProduct, cartItemIds = [] }) => (
  <div className="recommendations">
    <h2 className="recommendations__title">{title}</h2>
    <div className="recommendations__list">
      {items.map(item => (
        <RecommendedProduct
          key={item.id}
          {...item}
          onAdd={() => onAddProduct(item)}
          inCart={cartItemIds.includes(item.id)}
        />
      ))}
    </div>
  </div>
);

export default RecommendationsList;

