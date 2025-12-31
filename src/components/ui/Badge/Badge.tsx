import React from 'react';
import type { BadgeVariant, WithChildren, WithClassName } from '../../../types';
import './Badge.css';

interface BadgeProps extends WithChildren, WithClassName {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
