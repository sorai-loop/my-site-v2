import { useMemo } from 'react';
import type { ArticleItem } from '../../types/article';
import { Book, type BookPosture } from './Book';
import styles from './ShelfBooks.module.css';
import { getBookTiltPadding, resolveSpecialPosture } from './shelfLayout';

export type BookSlotData = {
  article: ArticleItem;
  posture: BookPosture;
};

export type ShelfBooksProps = {
  /** 段に並べる記事データ（最大4冊） */
  articles?: ArticleItem[];
  /** 既に姿勢が付与されている本データがある場合（優先） */
  books?: BookSlotData[];
  /** 棚の段番号 */
  shelfIndex?: number;
  /** 選択中のタグ */
  selectedTag?: string | null;
  /** 配置方向（'left': 左詰め, 'right': 右詰め） */
  align?: 'left' | 'right';
  className?: string;
  /** 外部から直接 Book コンポーネントを渡す場合 */
  children?: React.ReactNode;
};

/**
 * 棚1段分の本を並べるコンポーネント。
 *
 * 責務:
 * 1. Book の配列を受け取り、「通常3冊 ＋ 特殊（傾き）1冊」の配置パターンを決定する。
 * 2. 本の外側の線（ボーダー）が干渉・重複して太くならないよう、枠線の重ね合わせ（border-collapse的マージン）
 *    や z-index の重なり順を管理する。
 * 3. 棚の進行方向（左寄せ・右寄せ）に応じたステージ配置を行う。
 */
export const ShelfBooks = ({
  articles,
  books,
  selectedTag = null,
  align = 'left',
  className,
  children,
}: ShelfBooksProps) => {
  // 1. 本の配列と姿勢を決定（通常3冊 + 特殊1冊）
  const resolvedBooks: BookSlotData[] = useMemo(() => {
    // 外部から既に books が渡されている場合はそれをベースにする
    if (books && books.length > 0) {
      return books;
    }

    if (!articles || articles.length === 0) {
      return [];
    }

    const count = articles.length;

    // 特殊配置の場所: L字（左詰め）のときは右端（count - 1）、逆（右詰め）のときは左端（0）
    const isL = align === 'left';
    const specialSlotIndex = isL ? Math.max(0, count - 1) : 0;
    const specialPosture = resolveSpecialPosture(isL);

    return articles.map((article, idx) => ({
      article,
      posture: idx === specialSlotIndex ? specialPosture : 'upright',
    }));
  }, [articles, books, align]);

  const alignClass = align === 'right' ? styles.alignRight : styles.alignLeft;

  return (
    <div
      className={
        className
          ? `${styles.shelfBooksContainer} ${alignClass} ${className}`
          : `${styles.shelfBooksContainer} ${alignClass}`
      }
    >
      {children ? (
        children
      ) : (
        <div className={styles.bookCluster}>
          {resolvedBooks.map((item, index) => {
            const isMatched =
              !selectedTag || item.article.tags.includes(selectedTag);

            // 傾きの場合、その本の縦幅（文字数に応じた高さ）と傾きの角度から傾く方角に適切なパディングを算出
            const isTilted =
              item.posture === 'tiltedLeft' || item.posture === 'tiltedRight';
            const tiltPadding = isTilted
              ? getBookTiltPadding(item.article.charCount)
              : null;

            const slotStyle: React.CSSProperties = {
              // 本同士が重なる際の重なり順を管理（傾き本が直立本の背後に隠れないよう前面へ配置）
              zIndex: isTilted ? 5 : index + 1,
              ...(tiltPadding
                ? {
                    ['--tilt-padding' as string]: `${tiltPadding.mobile}px`,
                    ['--tilt-padding-pc' as string]: `${tiltPadding.pc}px`,
                  }
                : {}),
            };

            const postureSlotClass =
              item.posture !== 'upright'
                ? styles[`slotPosture_${item.posture}`]
                : undefined;

            return (
              <div
                key={item.article.id}
                className={
                  postureSlotClass
                    ? `${styles.bookSlot} ${postureSlotClass}`
                    : styles.bookSlot
                }
                style={slotStyle}
              >
                <Book
                  article={item.article}
                  posture={item.posture}
                  isMatched={isMatched}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
