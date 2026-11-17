import type { ReactNode } from 'react';
import styles from './ArticlesControlPanel.module.css';
import { ControlPanelPipeFrame } from './ControlPanelPipeFrame';
import { SpeedMeter } from './SpeedMeter';

export type ArticlesControlPanelProps = {
  totalCount: number;
  meterAngle: number;
  tags: string[];
  selectedTag?: string | null;
  onSelectTag: (tag: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  /** モバイル時など、検索窓の下に本棚を直接組み込む場合のスロット */
  children?: ReactNode;
  className?: string;
};

/**
 * 記事セクションの操作パネルコンポーネント。
 * 配管フレーム内に、記事総数カウンタ、スピードメーター、タグフィルター、検索窓、および本棚を配置。
 */
export const ArticlesControlPanel = ({
  totalCount,
  meterAngle,
  tags,
  selectedTag = null,
  onSelectTag,
  searchQuery = '',
  onSearchChange,
  children,
  className,
}: ArticlesControlPanelProps) => {
  const countStr = String(totalCount).padStart(2, '0');

  return (
    <div className={className ? `${styles.controlPanel} ${className}` : styles.controlPanel}>
      <ControlPanelPipeFrame
        upperContent={
          <div className={styles.gaugesCol}>
            {/* 総数カウンタ */}
            <div className={styles.counterWrapper}>
              <span className={styles.counterLabel}>TOTAL NOTES</span>
              <div className={styles.counterDigits} aria-label={`記事総数 ${totalCount}件`}>
                <span className={styles.digitCell}>{countStr[0]}</span>
                <span className={styles.digitCell}>{countStr[1]}</span>
              </div>
            </div>

            {/* スピードメーター */}
            <SpeedMeter angle={meterAngle} className={styles.speedMeter} />
          </div>
        }
        lowerContent={
          <div className={styles.tagsCol}>
            <span className={styles.tagsLabel}>FILTER BY TAG</span>
            <div className={styles.tagsGrid}>
              {tags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onSelectTag(tag)}
                    aria-label={`${tag}で記事を絞り込む`}
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? `${styles.tagButton} ${styles.tagButtonActive}`
                        : styles.tagButton
                    }
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            {/* 検索窓 */}
            {onSearchChange && (
              <div className={styles.searchSection}>
                <label htmlFor="article-search-input" className={styles.searchLabel}>
                  SEARCH ARCHIVES
                </label>
                <div className={styles.searchBox}>
                  <svg
                    className={styles.searchIcon}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="6.5" cy="6.5" r="4.5" />
                    <line x1="10" y1="10" x2="14" y2="14" />
                  </svg>
                  <input
                    id="article-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by title or #tag..."
                    aria-label="記事タイトルまたはタグを検索"
                    className={styles.searchInput}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      aria-label="検索キーワードをクリア"
                      className={styles.searchClearBtn}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 本棚: 検索窓の下に配置 */}
            {children && (
              <div className={styles.embeddedBookshelf}>
                {children}
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
