import styles from './ArticlesControlPanel.module.css';
import { ControlPanelPipeFrame } from './ControlPanelPipeFrame';
import { SpeedMeter } from './SpeedMeter';

export type ArticlesControlPanelProps = {
  totalCount: number;
  meterAngle: number;
  tags: string[];
  selectedTag?: string | null;
  onSelectTag: (tag: string) => void;
  className?: string;
};

/**
 * 記事セクションの操作パネルコンポーネント。
 * 配管フレーム内に、記事総数カウンタ、スピードメーター、タグフィルターを配置。
 */
export const ArticlesControlPanel = ({
  totalCount,
  meterAngle,
  tags,
  selectedTag = null,
  onSelectTag,
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
            <SpeedMeter angle={meterAngle} />
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
          </div>
        }
      />
    </div>
  );
};
