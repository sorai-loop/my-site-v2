import type { StampType } from '../components/ui/StampGraphic';

export type StackCategoryId =
  | 'languages'
  | 'frameworks'
  | 'tools'
  | 'wishlist';

export type StackIconName = string;

export type StackTabMeta = {
  id: StackCategoryId;
  indexLabel: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  verticalLabel?: string;
};

export type StackItem = {
  id: string;
  category: StackCategoryId;
  name: string;
  domainLabel: string;
  icon?: StackIconName;
  iconPath?: string;
  stampText: string;
  stampType?: StampType;
  description: string;
};

export type FutureThoughtNote = {
  heading: string;
  paragraphs: string[];
  signature: string;
};
