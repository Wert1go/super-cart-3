import React from 'react';
import './SafeArea.css';

export const SafeAreaTop = () => (
  <div className="safe-area-top" />
);

export const SafeAreaBottom = ({ children }) => (
  <div className="safe-area-bottom">
    {children || <div className="home-indicator" />}
  </div>
);

export default { SafeAreaTop, SafeAreaBottom };

