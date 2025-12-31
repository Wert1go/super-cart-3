import React from 'react';
import type { WithChildren } from '../../../types';
import './SafeArea.css';

export const SafeAreaTop: React.FC = () => (
  <div className="safe-area-top" />
);

export const SafeAreaBottom: React.FC<WithChildren> = ({ children }) => (
  <div className="safe-area-bottom">
    {children || <div className="home-indicator" />}
  </div>
);

export default { SafeAreaTop, SafeAreaBottom };
