import { useCallback, useMemo, useState } from 'react';
import { ARTICLES_DATA } from '../data/articles';
import type { ArticleItem } from '../types/article';
import { sortArticlesByTag } from '../utils/sortArticles';

export type UseArticlesOptions = {
  initialArticles?: ArticleItem[];
  initialTag?: string | null;
};

export const useArticles = (options: UseArticlesOptions = {}) => {
  const { initialArticles = ARTICLES_DATA, initialTag = null } = options;

  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

  // 全記事からユニークなタグ一覧を抽出
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const item of articles) {
      for (const tag of item.tags) {
        set.add(tag);
      }
    }
    return Array.from(set);
  }, [articles]);

  // 選択中タグに一致する記事一覧
  const filteredArticles = useMemo(() => {
    if (!selectedTag) return articles;
    return articles.filter((item) => item.tags.includes(selectedTag));
  }, [articles, selectedTag]);

  // 選択中タグに一致する記事を前方へ集めたソート済み記事一覧（本棚表示用）
  const displayArticles = useMemo(() => {
    return sortArticlesByTag(articles, selectedTag);
  }, [articles, selectedTag]);

  // 選択中タグに一致する記事総数（未選択なら全件数）
  const activeCount = useMemo(() => {
    return filteredArticles.length;
  }, [filteredArticles]);

  // タグ選択のトグル処理
  const toggleTag = useCallback((tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }, []);

  return {
    articles,
    setArticles,
    selectedTag,
    setSelectedTag,
    toggleTag,
    allTags,
    activeCount,
    filteredArticles,
    displayArticles,
  };
};
