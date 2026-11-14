import type { ArticleItem } from '../../types/article';
import styles from './Shelf.module.css';
import { ShelfBooks, type BookSlotData } from './ShelfBooks';
import { ShelfPipe, type ShelfPipeVariant } from './ShelfPipe';

export type ShelfProps = {
  /** 棚の段番号 */
  shelfIndex: number;
  /** この段に置く記事データ */
  articles?: ArticleItem[];
  /** 既に姿勢が付与されている本データがある場合 */
  books?: BookSlotData[];
  /** 最上段かどうか */
  isFirst?: boolean;
  /** 最下段かどうか */
  isLast?: boolean;
  /** 選択中のタグ */
  selectedTag?: string | null;
  className?: string;
  /** 独自の本配置要素や子供要素を直接渡す場合 */
  children?: React.ReactNode;
};

/**
 * 本棚の1段を作成するコンポーネント。
 * ShelfBooks と ShelfPipe を組み合わせ、
 * 段番号に応じたL字/反転L字のパイプ生成パターンや、
 * パイプ部分と列ごとの本の配置のスタイル。
 */
export const Shelf = ({
  shelfIndex,
  articles = [],
  books,
  isFirst = false,
  isLast = false,
  selectedTag = null,
  className,
  children,
}: ShelfProps) => {
  // ShelfPipe の生成パターンを: 偶数段は 'L'（左柱・右エルボ）、奇数段は 'reversed-L'（右柱・左エルボ）
  const isEven = shelfIndex % 2 === 0;
  const pipeVariant: ShelfPipeVariant = isEven ? 'L' : 'reversed-L';
  const booksAlign = isEven ? 'left' : 'right';

  const shelfClass = className
    ? `${styles.shelfUnit} ${className}`
    : styles.shelfUnit;

  const booksAreaClass = [
    styles.shelfBooksArea,
    isEven ? styles.booksAreaEven : styles.booksAreaOdd,
  ].join(' ');

  return (
    <div className={shelfClass} data-shelf-index={shelfIndex}>
      {/* 本の配置エリア（上段領域: 下部58pxの水平パイプと重ならないよう上部に配置） */}
      <div className={booksAreaClass}>
        {children ? (
          children
        ) : (
          <ShelfBooks
            articles={articles}
            books={books}
            shelfIndex={shelfIndex}
            selectedTag={selectedTag}
            align={booksAlign}
          />
        )}
      </div>

      {/* パイプ骨組み（ShelfPipe） */}
      <ShelfPipe
        variant={pipeVariant}
        isFirst={isFirst}
        isLast={isLast}
      />
    </div>
  );
};
