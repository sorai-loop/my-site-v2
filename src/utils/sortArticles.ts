import type { ArticleItem } from '../types/article';

/**
 * 選択中タグがある場合、そのタグを含む記事を前方へ集めるようにソート
 */
export const sortArticlesByTag = (
  articles: ArticleItem[],
  selectedTag?: string | null
): ArticleItem[] => {
  if (!selectedTag) return articles;

  return [...articles].sort((a, b) => {
    const aMatch = a.tags.includes(selectedTag);
    const bMatch = b.tags.includes(selectedTag);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });
};
