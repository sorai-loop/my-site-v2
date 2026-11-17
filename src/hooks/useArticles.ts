import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ArticleItem } from '../types/article';
import { countArticleTags } from '../utils/countArticleTags';
import { filterArticles } from '../utils/filterArticles';
import { sortArticlesByTag } from '../utils/sortArticles';
import { fetchQiitaArticles, QIITA_ERROR_BOOK } from '../services/qiita';

export type UseArticlesOptions = {
  initialArticles?: ArticleItem[];
  initialTag?: string | null;
  /** Qiita APIから記事を自動取得するかどうか（デフォルト: true） */
  fetchFromQiita?: boolean;
};

export const useArticles = (options: UseArticlesOptions = {}) => {
  const {
    initialArticles,
    initialTag = null,
    fetchFromQiita = true,
  } = options;

  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles ?? []);
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(!initialArticles && fetchFromQiita);

  useEffect(() => {
    // 外部から明示的に initialArticles が渡されている場合はフェッチしない
    if (initialArticles !== undefined || !fetchFromQiita) {
      return;
    }

    let isMounted = true;

    fetchQiitaArticles()
      .then((data) => {
        if (isMounted) {
          setArticles(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setArticles([QIITA_ERROR_BOOK]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFromQiita, initialArticles]);

  // 全記事からタグの重複をカウントし、多い順にソートしたタグ一覧を抽出
  const allTags = useMemo(() => {
    return countArticleTags(articles);
  }, [articles]);

  // 検索クエリでフィルタリングされた記事一覧
  const searchedArticles = useMemo(() => {
    return filterArticles(articles, searchQuery);
  }, [articles, searchQuery]);

  // 検索結果かつ選択中タグに一致する記事一覧
  const filteredArticles = useMemo(() => {
    if (!selectedTag) return searchedArticles;
    return searchedArticles.filter((item) => item.tags.includes(selectedTag));
  }, [searchedArticles, selectedTag]);

  // 本棚表示用: 検索結果の中から選択中タグに一致する記事を前方へ集めたソート済み記事一覧
  const displayArticles = useMemo(() => {
    return sortArticlesByTag(searchedArticles, selectedTag);
  }, [searchedArticles, selectedTag]);

  // 選択中条件に一致する記事総数
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
    searchQuery,
    setSearchQuery,
    allTags,
    activeCount,
    filteredArticles,
    displayArticles,
    isLoading,
  };
};
