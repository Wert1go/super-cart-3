import React from 'react';
import { Badge } from '../../ui/Badge';
import { Toggle } from '../../ui/Toggle';
import './DiscountSection.css';

export const DiscountSection = ({ 
  discountText, 
  promoText, 
  badge, 
  enabled, 
  onToggle, 
  canApply,
  discountAmount 
}) => (
  <div className={`discount-section ${!canApply ? 'discount-section--disabled' : ''}`}>
    <div className="discount-section__left">
      <div className="discount-section__icon-wrapper">
        <img 
          className="discount-section__icon" 
          src="Assets/figma/icons/discount-icon.png" 
          alt="discount" 
        />
        <Badge variant="small" className="discount-section__badge">
          {badge}
        </Badge>
      </div>
      <div className="discount-section__info">
        <div className="discount-section__text">
          {enabled && canApply ? `−${discountAmount}₽ применено` : discountText}
        </div>
        <div className="discount-section__promo">
          {promoText}
          <img 
            className="discount-section__promo-arrow" 
            src="Assets/figma/icons/more-info-icon.png" 
            alt="more" 
          />
        </div>
      </div>
    </div>
    <Toggle 
      enabled={enabled} 
      onToggle={onToggle} 
      disabled={!canApply} 
    />
  </div>
);

export default DiscountSection;

