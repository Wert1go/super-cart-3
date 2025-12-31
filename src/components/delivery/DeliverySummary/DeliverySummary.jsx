import React from 'react';
import { ProgressBar } from '../../ui/ProgressBar';
import { formatPrice } from '../../../utils/formatPrice';
import './DeliverySummary.css';

export const DeliverySummary = ({ 
  deliveryTime, 
  deliveryPrice, 
  freeDeliveryRemaining, 
  progressPercent,
  isFreeDelivery 
}) => (
  <div className="delivery-summary">
    <div className="delivery-summary__header">
      <span className="delivery-summary__main">
        {deliveryTime}, {isFreeDelivery ? 'бесплатно' : formatPrice(deliveryPrice)}
      </span>
      <img 
        className="delivery-summary__info-btn" 
        src="Assets/figma/icons/delivery-info-icon.png" 
        alt="info" 
      />
    </div>
    <div className="delivery-summary__subtitle">
      {isFreeDelivery 
        ? '🎉 Бесплатная доставка!' 
        : `До бесплатной доставки ${formatPrice(freeDeliveryRemaining)}`
      }
    </div>
    <ProgressBar percent={progressPercent} variant="delivery" />
    <div className="delivery-summary__progress-labels">
      <span className={`delivery-summary__progress-label ${isFreeDelivery ? 'delivery-summary__progress-label--success' : ''}`}>
        {isFreeDelivery ? '0₽' : formatPrice(deliveryPrice)}
      </span>
      <span className="delivery-summary__progress-label delivery-summary__progress-label--end">
        0₽
      </span>
    </div>
  </div>
);

export default DeliverySummary;

