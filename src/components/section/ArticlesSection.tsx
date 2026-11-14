import { useRef } from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useSpeedMeter } from '../../hooks/useSpeedMeter';
import type { ArticleItem } from '../../types/article';
import { ArticlesControlPanel, PipeBookshelf } from '../articles';
import styles from './ArticlesSection.module.css';

export type ArticlesSectionProps = {
  articles?: ArticleItem[];
  className?: string;
};

export const ArticlesSection = ({
  articles: initialArticles,
  className,
}: ArticlesSectionProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const {
    displayArticles,
    selectedTag,
    toggleTag,
    allTags,
    activeCount,
  } = useArticles({ initialArticles });

  const { meterAngle, handleScroll, triggerSpike } = useSpeedMeter();

  const handleSelectTag = (tag: string) => {
    toggleTag(tag);
    triggerSpike(58, 650);

    const el = viewportRef.current;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="articlesSection"
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          <header className={styles.headerArea}>
              <h2 className={styles.title}>Articles</h2>
              <p className={styles.subtitle}>Field Notes &amp; Technical Scrolls</p>
          </header>
          <div className={styles.pipeRow}>
            <div className={styles.controlColumn}>
              <ArticlesControlPanel
                totalCount={activeCount}
                meterAngle={meterAngle}
                tags={allTags}
                selectedTag={selectedTag}
                onSelectTag={handleSelectTag}
              />
            </div>

            <PipeBookshelf
              articles={displayArticles}
              selectedTag={selectedTag}
              viewportRef={viewportRef}
              onScroll={handleScroll}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
