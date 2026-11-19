import { useMemo } from 'react';
import type { ProfileHistoryItem } from '../../types/profile';
import { sortHistory } from '../../utils/sortHistory';
import styles from './ProfileHistory.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfileHistoryProps = {
  items: ProfileHistoryItem[];
  secNo?: string | number;
  className?: string;
};

export const ProfileHistory = ({
  items,
  secNo = '04',
  className,
}: ProfileHistoryProps) => {
  const code = `SEC. ${String(secNo).padStart(2, '0')} // Activity Log`;
  const sortedItems = useMemo(() => sortHistory(items), [items]);

  return (
    <div
      className={
        className ? `${styles.recordBlock} ${className}` : styles.recordBlock
      }
    >
      <div className={styles.headerRow}>
        <ProfileSubHeader
          code={code}
          title="活動記録"
          className={styles.subHeaderFlex}
        />
        <span className={styles.historyCount} aria-hidden="true">
          LOGS: {sortedItems.length} (SCROLL)
        </span>
      </div>

      <div
        className={styles.scrollContainer}
        tabIndex={0}
        role="region"
        aria-label="活動記録タイムライン"
      >
        <ol className={styles.historyList}>
          {sortedItems.map((item) => (
            <li key={item.id} className={styles.historyItem}>
              <div className={styles.historyMeta}>
                <span className={styles.historyPeriod}>{item.period}</span>
                {item.role && (
                  <span className={styles.historyRole}>// {item.role}</span>
                )}
              </div>
              <h4 className={styles.historyTitle}>
                {item.badge && (
                  <span className={styles.historyBadge}>{item.badge}</span>
                )}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.historyLink}
                  >
                    {item.title} <span className={styles.linkArrow}>↗</span>
                  </a>
                ) : (
                  <span>{item.title}</span>
                )}
              </h4>
              {item.detail && (
                <p className={styles.historyDetail}>{item.detail}</p>
              )}
              {item.links && item.links.length > 0 && (
                <div className={styles.historyLinks}>
                  {item.links.map((link, idx) => (
                    <a
                      key={`${link.url}-${idx}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.historyLinkTag}
                    >
                      <span className={styles.linkTagLabel}>{link.label}</span>
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
