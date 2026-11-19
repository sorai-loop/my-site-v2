import type { FC } from 'react';
import styles from './PageStickyTab.module.css';

export type PageStickyTabProps = {
  /** 'next' (次ページ・次付箋へ進む付箋) または 'prev' (前ページへ戻る付箋) */
  direction: 'next' | 'prev';
  /** 付箋上部の小さなバッジ文字列 (例: 'CONTINUED', 'NEXT TAB', 'CYCLE BACK', 'RETURN') */
  badgeText: string;
  /** 付箋のメイン見出し文字列 (例: 'NEXT PAGE (P.2) ⤻', '▶ Frameworks ⤻', '↺ Languages ⤻') */
  mainText: string;
  /** アクセシビリティ用 aria-label */
  ariaLabel: string;
  /** ツールチップ用 title (省略時は ariaLabel を使用) */
  title?: string;
  /** クリック時のハンドラ */
  onClick: () => void;
  className?: string;
};

/**
 * PageStickyTab
 * トラベラーズノートの紙面に栞（しおり）や目印としてペタッと貼られたクラフト調の付箋。
 * 「次のページ／次の付箋へ進む」「前のページへ戻る」ことを自然に示し、クリックでページをめくる。
 */
export const PageStickyTab: FC<PageStickyTabProps> = ({
  direction,
  badgeText,
  mainText,
  ariaLabel,
  title,
  onClick,
  className,
}) => {
  const isNext = direction === 'next';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        styles.stickyButton,
        isNext ? styles.stickyNext : styles.stickyPrev,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
      title={title || ariaLabel}
    >
      {/* マスキングテープ留め (上部の半透明テープ風アクセント) */}
      <span className={styles.tapeAnchor} aria-hidden="true" />

      {/* 付箋本体 */}
      <div className={styles.stickyBody}>
        <div className={styles.content}>
          <span className={styles.badgeText}>{badgeText}</span>
          <span className={styles.mainText}>{mainText}</span>
        </div>
      </div>
    </button>
  );
};
