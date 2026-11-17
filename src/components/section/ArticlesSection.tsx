import { useRef } from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useSpeedMeter } from '../../hooks/useSpeedMeter';
import type { ArticleItem } from '../../types/article';
import { ArticlesControlPanel, PipeBookshelf } from '../articles';
import { NotebookSection } from './NotebookSection';
import styles from './ArticlesSection.module.css';

export type ArticlesSectionProps = {
  articles?: ArticleItem[];
  className?: string;
  fetchFromQiita?: boolean;
};

export const ArticlesSection = ({
  articles: initialArticles,
  className,
  fetchFromQiita = true,
}: ArticlesSectionProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const {
    displayArticles,
    selectedTag,
    toggleTag,
    allTags,
    activeCount,
  } = useArticles({ initialArticles, fetchFromQiita });

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
    <NotebookSection
      id="articlesSection"
      title="Articles"
      subtitle="Field Notes & Technical Scrolls"
      pageCode="PAGE. 02 // INDEX-02 [TECHNICAL SCROLLS]"
      hasLeftMarginLine={false}
      footerCode="END OF PAGE // ARTICLES"
      className={className}
    >
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
    </NotebookSection>
  );
};
