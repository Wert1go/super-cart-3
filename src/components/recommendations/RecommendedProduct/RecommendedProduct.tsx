import React from 'react';
import './RecommendedProduct.css';

interface RecommendedProductProps {
  image: string;
  addButton: string;
  price: string;
  onAdd: () => void;
  inCart?: boolean;
}

export const RecommendedProduct: React.FC<RecommendedProductProps> = ({ 
  image, 
  addButton, 
  price, 
  onAdd, 
  inCart = false 
}) => (
  <div className={`recommended-product ${inCart ? 'recommended-product--in-cart' : ''}`}>
    <div className="recommended-product__image-wrapper">
      <img className="recommended-product__image" src={image} alt="Product" />
      <img 
        className="recommended-product__add" 
        src={addButton} 
        alt="Add" 
        onClick={onAdd} 
      />
      {inCart && <span className="recommended-product__in-cart-badge">✓</span>}
    </div>
    <span className="recommended-product__price">{price}</span>
  </div>
);

export default RecommendedProduct;
