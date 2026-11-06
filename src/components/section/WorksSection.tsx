import { useState } from 'react';
import { WORKS_DATA } from '../../data/works';
import type { WorkItem } from '../../types/work';
import { DownArrowIcon } from '../ui/DownArrowIcon';
import styles from './WorksSection.module.css';

export type WorksSectionProps = {
  works?: WorkItem[];
  className?: string;
};

export const WorksSection = ({
  works = WORKS_DATA,
  className,
}: WorksSectionProps) => {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    works.length > 0 ? [works[0].id] : []
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="worksSection"
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Works</h2>
          <p className={styles.subtitle}>Recorded Quests & Artifacts</p>
        </header>

        <ul className={styles.accordionList}>
          {works.map((work) => {
            const isOpen = openIds.includes(work.id);
            const contentId = `work-content-${work.id}`;
            const headerId = `work-header-${work.id}`;

            return (
              <li key={work.id} className={styles.item}>
                <button
                  id={headerId}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(work.id)}
                >
                  <div className={styles.triggerMain}>
                    <span className={styles.itemTitle}>{work.title}</span>
                    <div className={styles.metaRow}>
                      <span className={styles.period}>{work.period}</span>
                    </div>
                  </div>

                  <span
                    className={`${styles.iconWrapper} ${
                      isOpen ? styles.iconOpen : ''
                    }`}
                  >
                    <DownArrowIcon className={styles.arrowIcon} aria-hidden="true" />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={styles.content}
                  >
                    {work.imageUrl ? (
                      <div className={styles.imageWrapper}>
                        <img
                          src={work.imageUrl}
                          alt={`${work.title}のスクリーンショット`}
                          className={styles.workImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.imageWrapper}>
                        <div className={styles.imagePlaceholder}>
                          <span>[ Artifact Sketch / 制作図面 ]</span>
                        </div>
                      </div>
                    )}

                    <p className={styles.description}>{work.description}</p>

                    {work.stacks.length > 0 && (
                      <div className={styles.stacksSection}>
                        <div className={styles.stacksLabel}>Acquired Stacks</div>
                        <ul className={styles.stacksList}>
                          {work.stacks.map((stack) => (
                            <li key={stack} className={styles.stackTag}>
                              {stack}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.actionLinks}>
                      {work.siteUrl && (
                        <a
                          href={work.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionLink}
                        >
                          View Site ↗
                        </a>
                      )}
                      {work.githubUrl && (
                        <a
                          href={work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionLink}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
