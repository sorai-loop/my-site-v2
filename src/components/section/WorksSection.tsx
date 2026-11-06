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
          {works.map((work, index) => {
            const isOpen = openIds.includes(work.id);
            const contentId = `work-content-${work.id}`;
            const headerId = `work-header-${work.id}`;
            const issueNum = String(index + 1).padStart(3, '0');

            return (
              <li key={work.id} className={styles.item}>
                <button
                  id={headerId}
                  type="button"
                  className={styles.trigger}
                  aria-label={`${work.title}の詳細を${isOpen ? '閉じる' : '開く'}`}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(work.id)}
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
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={styles.content}
                  >
                    <div className={styles.contentBanner}>
                      <span className={styles.bannerTag}>SPECIAL DISPATCH</span>
                      <span className={styles.bannerDivider}>—</span>
                      <span className={styles.bannerNote}>
                        OFFICIAL RECORD OF REQUISITION & DEVELOPMENT
                      </span>
                    </div>

                    <div className={styles.articleBody}>
                      <figure className={styles.mediaColumn}>
                        <div className={styles.imageFrame}>
                          {work.imageUrl ? (
                            <img
                              src={work.imageUrl}
                              alt={`${work.title}の図面記録`}
                              className={styles.workImage}
                            />
                          ) : (
                            <div className={styles.imagePlaceholder}>
                              <span className={styles.sketchLabel}>[ SKETCH & DIAGRAM ]</span>
                              <span className={styles.sketchNote}>Plate {index + 1}. Prototype View</span>
                            </div>
                          )}
                        </div>
                        <figcaption className={styles.caption}>
                          Fig. {issueNum} — Archival blueprint documentation for {work.title}.
                        </figcaption>
                      </figure>

                      <div className={styles.textColumn}>
                        <p className={styles.description}>{work.description}</p>

                        {work.stacks.length > 0 && (
                          <div className={styles.stacksSection}>
                            <h4 className={styles.stacksHeading}>
                              ACQUIRED STACKS & APPARATUS
                            </h4>
                            <ul className={styles.stacksList}>
                              {work.stacks.map((stack) => (
                                <li key={stack} className={styles.stackTag}>
                                  {stack}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className={styles.actionSection}>
                          <div className={styles.actionLinks}>
                            {work.siteUrl && (
                              <a
                                href={work.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionLink}
                              >
                                <span className={styles.linkPrefix}>▶</span>
                                <span>VIEW EXHIBIT</span>
                              </a>
                            )}
                            {work.githubUrl && (
                              <a
                                href={work.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionLink}
                              >
                                <span className={styles.linkPrefix}>◈</span>
                                <span>SOURCE BLUEPRINT</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <footer className={styles.articleFooter}>
                      <span className={styles.footerColophon}>
                        LOGGED BY SORAI ATELIER • DISPATCH #{issueNum}
                      </span>
                    </footer>
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
