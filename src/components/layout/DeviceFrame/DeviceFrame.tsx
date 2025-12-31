import React, { useState, useEffect } from 'react';
import type { WithChildren } from '../../../types';
import './DeviceFrame.css';

const DEVICE_WIDTH = 428;
const DEVICE_HEIGHT = 926;
const PADDING_VERTICAL = 60;
const PADDING_HORIZONTAL = 40;

export const DeviceFrame: React.FC<WithChildren> = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const availableHeight = window.innerHeight - PADDING_VERTICAL;
      const availableWidth = window.innerWidth - PADDING_HORIZONTAL;

      // Calculate scale for both dimensions
      const scaleHeight = availableHeight / DEVICE_HEIGHT;
      const scaleWidth = availableWidth / DEVICE_WIDTH;

      // Use the smaller scale to ensure device fits in both dimensions
      const optimalScale = Math.min(scaleHeight, scaleWidth);

      // Clamp between reasonable bounds
      const clampedScale = Math.max(0.5, Math.min(optimalScale, 1.5));
      
      setScale(clampedScale);
    };

    // Calculate immediately
    calculateScale();
    
    // Update on resize with debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateScale, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div 
      className="device-scale-wrapper"
      style={{ 
        transform: `scale(${scale})`,
        WebkitTransform: `scale(${scale})`,
        transformOrigin: 'center center',
        WebkitTransformOrigin: 'center center'
      }}
    >
      <div className="app-viewport">
        {children}
      </div>
    </div>
  );
};

export default DeviceFrame;
