import React, { useState, useEffect } from 'react';
import './DeviceFrame.css';

const DEVICE_HEIGHT = 926;
const PADDING = 60;

export const DeviceFrame = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const availableHeight = window.innerHeight - PADDING;
      
      // Scale to fill available height
      const optimalScale = availableHeight / DEVICE_HEIGHT;
      const clampedScale = Math.max(0.5, Math.min(optimalScale, 1.5));
      
      setScale(clampedScale);
    };

    calculateScale();
    
    let resizeTimeout;
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
        WebkitTransform: `scale(${scale})`
      }}
    >
      <div className="app-viewport">
        {children}
      </div>
    </div>
  );
};

export default DeviceFrame;
