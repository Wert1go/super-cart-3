import React from 'react';
import './Toggle.css';

interface ToggleProps {
  enabled: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  enabled, 
  onToggle, 
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled && onToggle) {
      onToggle(!enabled);
    }
  };

  return (
    <div 
      className={`toggle ${enabled ? 'toggle--active' : ''} ${disabled ? 'toggle--disabled' : ''}`}
      onClick={handleClick}
      role="switch"
      aria-checked={enabled}
    >
      <div className="toggle__track">
        <div className="toggle__thumb" />
      </div>
    </div>
  );
};

export default Toggle;
