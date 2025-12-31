import React, { useState, useEffect } from 'react';
import './StatusBar.css';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <span className="status-bar__time">{time}</span>
      <div className="status-bar__right">
        <img 
          className="status-bar__signal" 
          src="Assets/figma/icons/signal-icon.png" 
          alt="signal" 
        />
        <span className="status-bar__network">LTE</span>
        <img 
          className="status-bar__battery" 
          src="Assets/figma/icons/battery-icon.png" 
          alt="battery" 
        />
      </div>
    </div>
  );
};

export default StatusBar;
