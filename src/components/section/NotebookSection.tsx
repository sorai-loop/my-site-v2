import type { CSSProperties, ReactNode } from 'react';
import styles from './NotebookSection.module.css';

export type NotebookSectionProps = {
  /** セクションのDOM id（ページ内リンク用） */
  id: string;
  /** セクション大見出し (h2) */
  title: string;
  /** セクション副題 */
  subtitle?: string;
  /** ページの章コード (例: 'PAGE. 03 // INDEX-01') */
  pageCode?: string;
  /** タイトル線右側に表示するカテゴリバッジや補足情報 */
  categoryBadge?: ReactNode;
  /** ヘッダ右上に配置するアクセサリ (手回し歯車、日付スタンプなど) */
  headerAccessory?: ReactNode;
  /** ページの右端 (小口) に配置する縦長インデックス付箋 */
  sideTabs?: ReactNode;
  /** 左マージン線 (赤い縦ガイド線) を表示するかどうか (デフォルト: true) */
  hasLeftMarginLine?: boolean;
  /** 基準とする罫線行数 (デフォルト: トラベラーズノートレギュラーサイズの28行) */
  minLines?: number;
  /** ページ最下部太線の左側に表示する終端コード (例: 'END OF PAGE // STACKS') */
  footerCode?: string;
  /** ページ最下部太線の右側に配置するアクション (ページ送りボタンなど) */
  footerAction?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * NotebookSection (手記の1ページ共通レイアウトコンポーネント)
 * - サイト全体が1冊の手記であり、各セクションを「手記の1ページ」としてレンダリングする
 * - 基準モチーフ: トラベラーズノート レギュラーサイズ (横罫28行)
 * - 天余白 (1:3) -> ヘッダ線 -> セクション大見出し (h2) -> タイトル線
 * - 1行SVG (RuledLine.svg) 背景と --line-height を同期
 * - 右端小口の縦長インデックス付箋スロット
 * - ページの罫線の終わりを示す太い線 -> 下の地余白 (セクション間余白)
 */
export const NotebookSection = ({
  id,
  title,
  subtitle,
  pageCode,
  categoryBadge,
  headerAccessory,
  sideTabs,
  hasLeftMarginLine = true,
  minLines = 28,
  footerCode,
  footerAction,
  className,
  style,
  children,
}: NotebookSectionProps) => {
  return (
    <section
      id={id}
      className={className ? `${styles.section} ${className}` : styles.section}
      style={
        {
          ['--min-notebook-lines' as string]: minLines,
          ...style,
        } as CSSProperties
      }
    >
      <div className={styles.container}>
        {/* ページヘッダ: ヘッダ線 ＆ 大見出し h2 ＆ タイトル二重線 */}
        <header className={styles.pageHeader}>
          {(pageCode || headerAccessory) && (
            <div className={styles.headerLine}>
              <span className={styles.pageCode}>{pageCode}</span>
              {headerAccessory && (
                <div className={styles.headerAccessory}>{headerAccessory}</div>
              )}
            </div>
          )}

          <div className={styles.titleArea}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title}>{title}</h2>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {categoryBadge && (
              <div className={styles.categoryBadge}>{categoryBadge}</div>
            )}
          </div>
        </header>

        {/* 本文紙面エリア ＋ 右端小口の付箋スロット */}
        <div className={styles.pageBodyWrapper}>
          {sideTabs && (
            <aside className={styles.sideTabsSlot} aria-label={`${title} の付箋`}>
              {sideTabs}
            </aside>
          )}

          <div
            className={
              hasLeftMarginLine
                ? `${styles.notebookBody} ${styles.hasMarginLine}`
                : styles.notebookBody
            }
          >
            {children}
          </div>
        </div>

        {/* ページの罫線の終わりを示す太い線 */}
        {(footerCode || footerAction) && (
          <footer className={styles.pageFooterLine}>
            <span className={styles.pageFooterCode}>{footerCode}</span>
            {footerAction && (
              <div className={styles.pageFooterAction}>{footerAction}</div>
            )}
          </footer>
        )}
      </div>
    </section>
  );
};
