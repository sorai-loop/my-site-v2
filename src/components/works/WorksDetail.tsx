import type { WorkItem } from '../../types/work';
import { resolveImage } from '../../utils/resolveImage';
import styles from './WorksDetail.module.css';

export type WorksDetailProps = {
  work: WorkItem;
  index: number;
  issueNum: string;
  contentId: string;
  headerId: string;
};

export const WorksDetail = ({
  work,
  index,
  issueNum,
  contentId,
  headerId,
}: WorksDetailProps) => {
  const imageSrc = resolveImage(work.imagePath ?? work.imageUrl);

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={headerId}
      className={styles.content}
    >
      <div className={styles.contentBanner}>
        <span className={styles.bannerTag}>
          {work.client ?? 'SPECIAL DISPATCH'}
        </span>
        <span className={styles.bannerDivider}>—</span>
        <span className={styles.bannerNote}>
          OFFICIAL RECORD OF REQUISITION & DEVELOPMENT
        </span>
      </div>

      <div className={styles.articleBody}>
        <figure className={styles.mediaColumn}>
          <div className={styles.imageFrame}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={`${work.title}の図面記録`}
                className={styles.workImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span className={styles.sketchLabel}>[ SKETCH & DIAGRAM ]</span>
                <span className={styles.sketchNote}>
                  Plate {index + 1}. Prototype View
                </span>
              </div>
            )}
          </div>
          <figcaption className={styles.caption}>
            Fig. {issueNum} —{' '}
            {work.caption ??
              `Archival blueprint documentation for ${work.title}.`}
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

          {work.collaborators && work.collaborators.length > 0 && (
            <div className={styles.collaboratorsSection}>
              <h4 className={styles.collaboratorsHeading}>
                COLLABORATORS & ALLIES
              </h4>
              <ul className={styles.collaboratorsList}>
                {work.collaborators.map((c) => (
                  <li key={c.name} className={styles.collaboratorItem}>
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.collaboratorLink}
                      >
                        <span className={styles.collaboratorName}>{c.name}</span>
                        {c.role && (
                          <span className={styles.collaboratorRole}>
                            ({c.role})
                          </span>
                        )}
                        <span
                          className={styles.collaboratorExternal}
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className={styles.collaboratorText}>
                        <span className={styles.collaboratorName}>{c.name}</span>
                        {c.role && (
                          <span className={styles.collaboratorRole}>
                            ({c.role})
                          </span>
                        )}
                      </span>
                    )}
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
                  <span className={styles.linkPrefix}>→</span>
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
                  <span className={styles.linkPrefix}>→</span>
                  <span>GIT HUB</span>
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
  );
};
