import type { ArticleItem } from '../types/article';
import type { QiitaItem } from '../types/qiita';

export const QIITA_USER_ID = 'sorai';
export const QIITA_API_ENDPOINT = `https://qiita.com/api/v2/users/${QIITA_USER_ID}/items?page=1&per_page=100`;

/**
 * Qiita APIからの取得に失敗した際に棚へ1冊だけ配置するエラー本
 */
export const QIITA_ERROR_BOOK: ArticleItem = {
  id: 'qiita-error-book',
  title: 'Qiitaからデータを取得できませんでした。',
  url: `https://qiita.com/${QIITA_USER_ID}`,
  likesCount: 0,
  charCount: 3500, // 標準サイズになる文字数
  tags: ['Error'],
  publishedAt: '',
  author: 'Sorai',
};

/**
 * Qiita APIから記事一覧を取得し、本棚用の ArticleItem 配列に変換。
 * 取得に失敗した場合（エラーや空データ時）
 * 「Qiitaからデータを取得できませんでした。」という本を1冊だけ含む配列を返します。
 */
export async function fetchQiitaArticles(): Promise<ArticleItem[]> {
  try {
    const response = await fetch(QIITA_API_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Qiita API error: HTTP ${response.status}`);
    }

    const items: QiitaItem[] = await response.json();

    if (!Array.isArray(items) || items.length === 0) {
      return [QIITA_ERROR_BOOK];
    }

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      likesCount: item.likes_count,
      charCount: item.body ? item.body.length : 0,
      tags: item.tags.map((tag) => tag.name),
      publishedAt: item.created_at ? item.created_at.slice(0, 7) : '',
      author: item.user?.name || item.user?.id || 'Sorai',
    }));
  } catch (err) {
    console.error('Failed to fetch articles from Qiita:', err);
    return [QIITA_ERROR_BOOK];
  }
}
