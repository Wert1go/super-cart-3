import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  percent: number;
  variant?: 'default' | 'delivery';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percent, 
  variant = 'default' 
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  
  return (
    <div className={`progress-bar progress-bar--${variant}`}>
      <div className="progress-bar__track">
        <div 
          className="progress-bar__fill" 
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
