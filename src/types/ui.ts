/**
 * Common UI types
 */

/** Tab bar item */
export interface TabItem {
  id: string;
  icon: string;
  badge?: number;
}

/** Badge variants */
export type BadgeVariant = 'default' | 'small' | 'discount' | 'success';

/** Header action handlers */
export interface HeaderActions {
  onShare?: () => void;
  onSearch?: () => void;
  onTrash?: () => void;
}

/** Generic props for components with children */
export interface WithChildren {
  children?: React.ReactNode;
}

/** Generic props for components with className */
export interface WithClassName {
  className?: string;
}

