import type { WorkItem } from '../../types/work';
import { DownArrowIcon } from '../ui/DownArrowIcon';
import { StampGraphic } from '../ui/StampGraphic';
import { WorksDetail } from './WorksDetail';
import styles from './WorksItem.module.css';

export type WorksItemProps = {
  work: WorkItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export const WorksItem = ({
  work,
  index,
  isOpen,
  onToggle,
}: WorksItemProps) => {
  const contentId = `work-content-${work.id}`;
  const headerId = `work-header-${work.id}`;
  const issueNum = String(index + 1).padStart(3, '0');

  return (
    <li className={styles.item}>
      <button
        id={headerId}
        type="button"
        className={styles.trigger}
        aria-label={`${work.title}の詳細を${isOpen ? '閉じる' : '開く'}`}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
        <div className={styles.triggerMain}>
          <div className={styles.dateline}>
            <span className={styles.issueNumber}>DISPATCH #{issueNum}</span>
            <span className={styles.datelineDivider}>•</span>
            <span className={styles.gazetteTag}>GUILD REPORT</span>
            <span className={styles.datelineDivider}>•</span>
            <span className={styles.period}>{work.period}</span>
          </div>

          <div className={styles.headlineRow}>
            <h3 className={styles.itemTitle}>{work.title}</h3>
          </div>
        </div>

        <div className={styles.triggerSide}>
          <span className={styles.unfoldLabel}>
            {isOpen ? 'CLOSE' : 'EXPAND'}
          </span>
          <span
            className={`${styles.iconWrapper} ${
              isOpen ? styles.iconOpen : ''
            }`}
          >
            <DownArrowIcon className={styles.arrowIcon} aria-hidden="true" />
          </span>
        </div>
      </button>

      {isOpen && (
        <WorksDetail
          work={work}
          index={index}
          issueNum={issueNum}
          contentId={contentId}
          headerId={headerId}
        />
      )}

      {work.status && (
        <div className={styles.stampWrapper}>
          <StampGraphic
            text={work.status}
            type={work.status === 'COMPLETED' ? 1 : 0}
            aria-hidden="true"
          />
        </div>
      )}
    </li>
  );
};
