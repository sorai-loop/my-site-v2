import type { ArticleItem } from '../types/article';

export type TagCount = {
  tag: string;
  count: number;
};

/**
 * 記事配列から各タグの出現回数を集計、
 * 出現頻度が多い順にソートしたタグ名の配列を返します。
 * 出現数が同数の場合はタグ名のアルファベット昇順でソートします。
 */
export const countArticleTags = (articles: ArticleItem[]): string[] => {
  const counts = new Map<string, number>();

  for (const article of articles) {
    if (!article.tags) continue;
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => {
      // 出現回数の降順
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      // 同数の場合はタグ名の辞書昇順
      return a[0].localeCompare(b[0]);
    })
    .map(([tag]) => tag);
};

/**
 * タグごとの出現回数付き配列を取得するヘルパー関数
 */
export const getArticleTagCounts = (articles: ArticleItem[]): TagCount[] => {
  const counts = new Map<string, number>();

  for (const article of articles) {
    if (!article.tags) continue;
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    })
    .map(([tag, count]) => ({ tag, count }));
};
