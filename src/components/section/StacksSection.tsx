import { useEffect, useMemo, useState } from 'react';
import { STACKS_DATA, STACK_TABS } from '../../data/stacks';
import type {
  StackCategoryId,
  StackItem,
  StackTabMeta,
} from '../../types/stack';
import { paginateStacks } from '../../utils/paginateStacks';
import { PageStickyTab } from '../stacks/PageStickyTab';
import { StackEntryRow } from '../stacks/StackEntryRow';
import { NotebookSection } from './NotebookSection';
import styles from './StacksSection.module.css';

export type StacksSectionProps = {
  stacks?: StackItem[];
  tabs?: StackTabMeta[];
  className?: string;
};

export const StacksSection = ({
  stacks = STACKS_DATA,
  tabs = STACK_TABS,
  className,
}: StacksSectionProps) => {
  const [activeCategory, setActiveCategory] =
    useState<StackCategoryId>('languages');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const activeTabIndex = useMemo(() => {
    const idx = tabs.findIndex((tab) => tab.id === activeCategory);
    return idx >= 0 ? idx : 0;
  }, [tabs, activeCategory]);

  const activeTabMeta = tabs[activeTabIndex] ?? tabs[0];
  const nextTabMeta = tabs[(activeTabIndex + 1) % tabs.length] ?? tabs[0];

  const filteredStacks = useMemo(() => {
    return stacks.filter((item) => item.category === activeCategory);
  }, [stacks, activeCategory]);

  // 28行の紙面に収まるようページ分割 (モバイル時は横幅の狭さを加味し厳格に分割してスクロールを防止)
  const paginatedPages = useMemo(() => {
    return paginateStacks(filteredStacks, isMobile);
  }, [filteredStacks, isMobile]);

  const totalPages = paginatedPages.length;
  const safeCurrentPage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const currentItems = paginatedPages[safeCurrentPage] ?? [];

  const handleSelectCategory = (categoryId: StackCategoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(0);
  };

  const handleCycleNextTab = () => {
    setActiveCategory(nextTabMeta.id);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    if (safeCurrentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      handleCycleNextTab();
    }
  };

  const handlePrevPage = () => {
    if (safeCurrentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const isLastTab = activeTabIndex === tabs.length - 1;
  const hasNextSubPage = safeCurrentPage < totalPages - 1;

  // モバイルでは上部をすっきり保つため、ページ番号表記 (1/3等) は非表示にする
  const pageIndicator =
    !isMobile && totalPages > 1 ? ` [${safeCurrentPage + 1}/${totalPages}]` : '';
  const footerPageIndicator =
    totalPages > 1 ? ` - P.${safeCurrentPage + 1}/${totalPages}` : '';

  // 右下付箋の設定 (ページ送り -> 次の付箋 -> 先頭のLanguagesへ循環)
  const nextStickyProps = useMemo(() => {
    if (hasNextSubPage) {
      return {
        badgeText: 'CONTINUED',
        mainText: isMobile
          ? `P.${safeCurrentPage + 2} →`
          : `NEXT PAGE (P.${safeCurrentPage + 2}) ⤻`,
        ariaLabel: `手記の次のページ (P.${safeCurrentPage + 2}/${totalPages}) をめくる`,
        onClick: handleNextPage,
      };
    }
    if (isLastTab) {
      return {
        badgeText: 'CYCLE BACK',
        mainText: isMobile
          ? `↺ ${nextTabMeta.shortTitle}`
          : `↺ ${nextTabMeta.shortTitle} (P.1)`,
        ariaLabel: `最初の付箋 (${nextTabMeta.title}) へ戻る`,
        onClick: handleCycleNextTab,
      };
    }
    return {
      badgeText: 'NEXT TAB',
      mainText: `▶ ${nextTabMeta.shortTitle}`,
      ariaLabel: `次の付箋 (${nextTabMeta.title}) を開く`,
      onClick: handleCycleNextTab,
    };
  }, [
    hasNextSubPage,
    isLastTab,
    isMobile,
    safeCurrentPage,
    totalPages,
    nextTabMeta.shortTitle,
    nextTabMeta.title,
    handleNextPage,
    handleCycleNextTab,
  ]);

  // フッター次へボタンのテキスト
  const footerNextLabel = useMemo(() => {
    if (hasNextSubPage) {
      return `次のページへ (${safeCurrentPage + 2}/${totalPages}) →`;
    }
    if (isLastTab) {
      return `最初の付箋へ (${nextTabMeta.shortTitle}) ↺`;
    }
    return `次の付箋へ (${nextTabMeta.shortTitle}) →`;
  }, [hasNextSubPage, isLastTab, safeCurrentPage, totalPages, nextTabMeta.shortTitle]);

  return (
    <NotebookSection
      id="stacksSection"
      title="Stacks"
      subtitle="Adventurer's Arsenal & Technical Notes"
      pageCode={`PAGE. 03 // INDEX-${activeTabMeta.indexLabel} [${activeTabMeta.shortTitle.toUpperCase()}]${pageIndicator}`}
      isPageFit
      className={className}
      sideTabs={
        <nav
          role="tablist"
          aria-label="技術スタックの小口インデックス付箋"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeCategory;
            return (
              <button
                key={tab.id}
                id={`stack-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`stack-panel-${tab.id}`}
                aria-label={`${tab.title} の手記ページを開く`}
                onClick={() => handleSelectCategory(tab.id)}
                className={
                  isActive
                    ? `${styles.stickyTab} ${styles.stickyTabActive}`
                    : styles.stickyTab
                }
              >
                <span className={styles.tabLabel}>
                  {tab.verticalLabel || tab.shortTitle}
                </span>
              </button>
            );
          })}
        </nav>
      }
      footerCode={`END OF PAGE // ${activeTabMeta.shortTitle.toUpperCase()}${footerPageIndicator}`}
      footerAction={
        !isMobile ? (
          <div className={styles.paginationActions}>
            {safeCurrentPage > 0 && (
              <button
                type="button"
                onClick={handlePrevPage}
                className={styles.pageNavButton}
                aria-label="前の手記ページへ戻る"
              >
                ← 前のページへ ({safeCurrentPage}/{totalPages})
              </button>
            )}
            <button
              type="button"
              onClick={nextStickyProps.onClick}
              className={styles.nextTabButton}
              aria-label={nextStickyProps.ariaLabel}
            >
              {footerNextLabel}
            </button>
          </div>
        ) : undefined
      }
    >
      {/* タブパネルとして各アイテム一覧を表示 */}
      <div
        id={`stack-panel-${activeTabMeta.id}`}
        role="tabpanel"
        aria-labelledby={`stack-tab-${activeTabMeta.id}`}
        className={styles.panelContainer}
      >
        <ul
          key={`${activeCategory}-${safeCurrentPage}`}
          className={`${styles.entriesList} ${styles.pageTurnAnimation}`}
        >
          {currentItems.map((item) => (
            <StackEntryRow key={item.id} item={item} />
          ))}
        </ul>

        {/* 付箋ナビゲーション行: モバイルではアイテム直下にインライン配置して右下SIGNボタンとの被りを防止 */}
        <div className={styles.stickyNavRow}>
          {safeCurrentPage > 0 ? (
            <PageStickyTab
              direction="prev"
              badgeText="RETURN"
              mainText={
                isMobile
                  ? `← P.${safeCurrentPage}`
                  : `⤺ PREV PAGE (P.${safeCurrentPage})`
              }
              ariaLabel={`手記の前のページ (P.${safeCurrentPage}/${totalPages}) へ戻る`}
              onClick={handlePrevPage}
            />
          ) : (
            <div />
          )}

          <PageStickyTab
            direction="next"
            badgeText={nextStickyProps.badgeText}
            mainText={nextStickyProps.mainText}
            ariaLabel={nextStickyProps.ariaLabel}
            onClick={nextStickyProps.onClick}
          />
        </div>
      </div>
    </NotebookSection>
  );
};
