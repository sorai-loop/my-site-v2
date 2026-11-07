import { useMemo, useState } from 'react';
import { WORKS_DATA } from '../../data/works';
import type { WorkItem } from '../../types/work';
import { sortAndNumberWorks } from '../../utils/sortWorks';
import { WorksItem } from '../works/WorksItem';
import styles from './WorksSection.module.css';

export { WorksItem } from '../works/WorksItem';
export type { WorksItemProps } from '../works/WorksItem';

export type WorksSectionProps = {
  works?: WorkItem[];
  className?: string;
};

export const WorksSection = ({
  works = WORKS_DATA,
  className,
}: WorksSectionProps) => {
  const sortedWorks = useMemo(() => sortAndNumberWorks(works), [works]);

  const [openIds, setOpenIds] = useState<string[]>(() =>
    sortedWorks.length > 0 ? [sortedWorks[0].id] : []
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
          {sortedWorks.map((work, index) => (
            <WorksItem
              key={work.id}
              work={work}
              index={index}
              dispatchNumber={work.dispatchNumber}
              isOpen={openIds.includes(work.id)}
              onToggle={() => toggleItem(work.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
