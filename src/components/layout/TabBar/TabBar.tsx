import React from 'react';
import { Badge } from '../../ui/Badge';
import type { TabItem } from '../../../types';
import './TabBar.css';

interface TabBarItemProps {
  icon: string;
  badge?: number;
  active: boolean;
  onClick: () => void;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ icon, badge, active, onClick }) => (
  <div 
    className={`tabbar__item ${active ? 'tabbar__item--active' : ''}`} 
    onClick={onClick}
  >
    <img className="tabbar__icon" src={icon} alt="" />
    {badge !== undefined && badge > 0 && <Badge className="tabbar__badge">{badge}</Badge>}
  </div>
);

interface TabBarProps {
  tabs: TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeId, onSelect }) => (
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
