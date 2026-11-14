export type BookPosture =
  | 'upright'
  | 'tiltedLeft'
  | 'tiltedRight';

export type BookSizeCategory = 'small' | 'medium' | 'large';

export type BookSize = BookSizeCategory;

export type ArticleItem = {
  id: string;
  title: string;
  url: string;
  likesCount: number;
  charCount: number;
  tags: string[];
  publishedAt: string;
  author?: string;
  ogpUrl?: string;
};
