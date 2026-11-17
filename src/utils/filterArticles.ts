import type { ArticleItem } from '../types/article';

/**
 * 検索機能
 *
 * @param articles 記事一覧配列
 * @param query 検索クエリ文字列
 * @returns フィルタリングされた記事一覧
 */
export const filterArticles = (
  articles: ArticleItem[],
  query: string
): ArticleItem[] => {
  const trimmed = query.trim();
  if (!trimmed) {
    return articles;
  }

  // 半角・全角スペースでトークン分割
  const tokens = trimmed.toLowerCase().split(/[\s\u3000]+/).filter(Boolean);
  if (tokens.length === 0) {
    return articles;
  }

  return articles.filter((article) => {
    const titleLower = article.title.toLowerCase();
    const tagsLower = article.tags.map((t) => t.toLowerCase());

    return tokens.every((token) => {
      const cleanToken = token.startsWith('#') ? token.slice(1) : token;

      const matchedTitle = titleLower.includes(token);
      const matchedTag = tagsLower.some(
        (t) => t.includes(token) || (cleanToken && t.includes(cleanToken))
      );

      return matchedTitle || matchedTag;
    });
  });
};
