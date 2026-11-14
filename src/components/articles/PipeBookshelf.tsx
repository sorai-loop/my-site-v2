import { useMemo, useRef } from 'react';
import type { ArticleItem } from '../../types/article';
import styles from './PipeBookshelf.module.css';
import { Shelf } from './Shelf';
import type { BookSlotData } from './ShelfBooks';
import { createBooksFromArticles } from './shelfLayout';

const BOOKS_PER_SHELF = 4;

export type PipeBookshelfProps = {
  /** 表示する記事データ */
  articles?: ArticleItem[];
  /** タグフィルターで選択されているタグ */
  selectedTag?: string | null;
  /** スクロールイベントハンドラ */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  /** スクロールコンテナの ref */
  viewportRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  /**
   * Shelf.tsx の配列を直接受け取るプロパティ。
   */
  shelves?: React.ReactNode[];
  children?: React.ReactNode;
};

/**
 * PipeBookshelf コンポーネント。
 * articles が渡された場合は、記事を固有の姿勢を持つ本に変換・ソートし、
 * 4冊ずつ Shelf.tsx の配列を配置する。
 */
export const PipeBookshelf = ({
  articles = [],
  selectedTag = null,
  onScroll,
  viewportRef,
  className,
  shelves: customShelves,
  children,
}: PipeBookshelfProps) => {
  const localViewportRef = useRef<HTMLDivElement | null>(null);
  const effectiveRef = viewportRef ?? localViewportRef;

  // 段の形状に応じた特殊配置を持つ本データに変換
  const displayedBooks = useMemo(() => {
    return createBooksFromArticles(articles);
  }, [articles]);

  // 4冊ごとに分割して Shelf コンポーネントの配列を生成
  const generatedShelves = useMemo(() => {
    const chunks: BookSlotData[][] = [];
    for (let i = 0; i < displayedBooks.length; i += BOOKS_PER_SHELF) {
      chunks.push(displayedBooks.slice(i, i + BOOKS_PER_SHELF));
    }
    // 最低2段、偶数段を確保
    while (chunks.length % 2 !== 0 || chunks.length < 2) {
      chunks.push([]);
    }

    return chunks.map((shelfBooks, shelfIndex) => {
      const isFirst = shelfIndex === 0;
      const isLast = shelfIndex === chunks.length - 1;

      return (
        <Shelf
          key={`shelf-${shelfIndex}`}
          shelfIndex={shelfIndex}
          books={shelfBooks}
          isFirst={isFirst}
          isLast={isLast}
          selectedTag={selectedTag}
        />
      );
    });
  }, [displayedBooks, selectedTag]);

  // 外部から渡された shelves または children があればそれを優先、なければ自動生成した Shelf 配列を使用
  const shelfElements = customShelves ?? (children ? null : generatedShelves);

  return (
    <div
      className={
        className ? `${styles.bookshelf} ${className}` : styles.bookshelf
      }
    >
      <div className={styles.scrollHeader}>
        <span>PIPE BOOKSHELF</span>
        <span>SCROLL ↕</span>
      </div>

      <div
        ref={effectiveRef}
        className={styles.viewport}
        onScroll={onScroll}
      >
        <div className={styles.track}>
          {shelfElements ?? children}
        </div>
      </div>
    </div>
  );
};
