import React from 'react';
import './Header.css';

export const Header = ({ 
  title, 
  itemsCount = 0, 
  onShare, 
  onSearch, 
  onTrash 
}) => (
  <header className="header">
    <h1 className="header__title">
      {title} {itemsCount > 0 && `(${itemsCount})`}
    </h1>
    <div className="header__actions">
      {onShare && (
        <img 
          className="header__action" 
          src="Assets/figma/icons/share-icon.png" 
          alt="share" 
          onClick={onShare} 
        />
      )}
      {onSearch && (
        <img 
          className="header__action" 
          src="Assets/figma/icons/search-icon.png" 
          alt="search" 
          onClick={onSearch} 
        />
      )}
      {onTrash && (
        <img 
          className="header__action" 
          src="Assets/figma/icons/trash-icon.png" 
          alt="trash" 
          onClick={onTrash} 
        />
      )}
    </div>
  </header>
);

export default Header;

