import type { ArticleItem, BookPosture } from '../../types/article';
import styles from './Book.module.css';
import { getBookSizeCategory } from './shelfLayout';

export type { BookPosture };

export type BookProps = {
  /** 記事データ */
  article: ArticleItem;
  /** 本の姿勢（直立・傾き） */
  posture?: BookPosture;
  /** タグフィルターに一致しているか */
  isMatched?: boolean;
  className?: string;
};

/**
 * 本棚に並ぶ1冊の本を描画するコンポーネント。
 * 文字数（本文量）に応じた背表紙サイズ（薄さ・厚さ・高さ）、
 * タイトルの文字数に応じたフォントサイズ調整クラス、
 * 姿勢別のスタイリング、縦書き背表紙タイトル、いいね数を描画します。
 */
export const Book = ({
  article,
  posture = 'upright',
  isMatched = true,
  className,
}: BookProps) => {
  // 本文文字数に応じた背表紙サイズ
  const category = getBookSizeCategory(article.charCount);
  const sizeClass =
    category === 'large'
      ? styles.bookLarge
      : category === 'medium'
        ? styles.bookMedium
        : styles.bookSmall;

  // タイトル文字数に応じたフォントサイズ調整クラス
  const titleLength = article.title.length;
  const titleSizeClass =
    titleLength >= 24
      ? styles.titleLong
      : titleLength >= 14
        ? styles.titleMedium
        : styles.titleShort;

  // 姿勢に応じたクラス
  const postureClass =
    posture === 'tiltedLeft'
      ? `${sizeClass} ${styles.bookTiltedLeft}`
      : posture === 'tiltedRight'
        ? `${sizeClass} ${styles.bookTiltedRight}`
        : `${sizeClass} ${styles.bookUpright}`;

  const matchClass = isMatched ? styles.bookMatched : styles.bookDimmed;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${article.title} (いいね数: ${article.likesCount}、新しいタブで開きます)`}
      className={
        className
          ? `${styles.bookLink} ${postureClass} ${matchClass} ${className}`
          : `${styles.bookLink} ${postureClass} ${matchClass}`
      }
      title={`${article.title} (${article.charCount.toLocaleString()}文字)`}
    >
      <div className={styles.bookSpineInner}>
        <span className={`${styles.bookTitleVertical} ${titleSizeClass}`}>
          {article.title}
        </span>
        <span className={styles.bookFooter}>
          <span aria-hidden="true">♡</span>
          <span>{article.likesCount}</span>
        </span>
      </div>
    </a>
  );
};
