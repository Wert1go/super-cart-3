import React from 'react';
import { Badge } from '../../ui/Badge';
import './TabBar.css';

const TabBarItem = ({ icon, badge, active, onClick }) => (
  <div 
    className={`tabbar__item ${active ? 'tabbar__item--active' : ''}`} 
    onClick={onClick}
  >
    <img className="tabbar__icon" src={icon} alt="" />
    {badge > 0 && <Badge className="tabbar__badge">{badge}</Badge>}
  </div>
);

export const TabBar = ({ tabs, activeId, onSelect }) => (
  <nav className="tabbar">
    {tabs.map(tab => (
      <TabBarItem
        key={tab.id}
        icon={tab.icon}
        badge={tab.badge}
        active={tab.id === activeId}
        onClick={() => onSelect(tab.id)}
      />
    ))}
  </nav>
);

export default TabBar;

