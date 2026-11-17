import { useEffect, useRef, useState } from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useSpeedMeter } from '../../hooks/useSpeedMeter';
import type { ArticleItem } from '../../types/article';
import { ArticlesControlPanel, PipeBookshelf } from '../articles';
import styles from './ArticlesSection.module.css';
import { NotebookSection } from './NotebookSection';

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
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1380px)');
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const {
    displayArticles,
    selectedTag,
    toggleTag,
    searchQuery,
    setSearchQuery,
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    triggerSpike(42, 500);

    const el = viewportRef.current;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const bookshelfElement = (
    <PipeBookshelf
      articles={displayArticles}
      selectedTag={selectedTag}
      viewportRef={viewportRef}
      onScroll={handleScroll}
    />
  );

  return (
    <NotebookSection
      id="articlesSection"
      title="Articles"
      subtitle="Field Notes & Technical Scrolls"
      pageCode="PAGE. 02 // INDEX-02 [TECHNICAL SCROLLS]"
      minLines={0}
      footerCode="END OF PAGE // ARTICLES"
      className={className ? `${styles.articlesSection} ${className}` : styles.articlesSection}
    >
      <div className={styles.pipeRow}>
        <div className={styles.controlColumn}>
          <ArticlesControlPanel
            totalCount={activeCount}
            meterAngle={meterAngle}
            tags={allTags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          >
            {/* モバイル・中間画面: コントロールパネル内の検索窓の下に本棚を組み込む */}
            {!isWide && bookshelfElement}
          </ArticlesControlPanel>
        </div>

        {/* ワイド画面(1380px以上): 右側のカラムとして本棚を配置 */}
        {isWide && bookshelfElement}
      </div>
    </NotebookSection>
  );
};
