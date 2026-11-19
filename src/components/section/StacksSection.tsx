import { useMemo, useState } from 'react';
import { STACKS_DATA, STACK_TABS } from '../../data/stacks';
import type {
  StackCategoryId,
  StackItem,
  StackTabMeta,
} from '../../types/stack';
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

  const activeTabIndex = useMemo(() => {
    const idx = tabs.findIndex((tab) => tab.id === activeCategory);
    return idx >= 0 ? idx : 0;
  }, [tabs, activeCategory]);

  const activeTabMeta = tabs[activeTabIndex] ?? tabs[0];

  const filteredStacks = useMemo(() => {
    return stacks.filter((item) => item.category === activeCategory);
  }, [stacks, activeCategory]);

  const handleCycleNextTab = () => {
    const nextIndex = (activeTabIndex + 1) % tabs.length;
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      setActiveCategory(nextTab.id);
    }
  };

  return (
    <NotebookSection
      id="stacksSection"
      title="Stacks"
      subtitle="Adventurer's Arsenal & Technical Notes"
      pageCode={`PAGE. 03 // INDEX-${activeTabMeta.indexLabel} [${activeTabMeta.shortTitle.toUpperCase()}]`}
      categoryBadge={activeTabMeta.title}
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
                onClick={() => setActiveCategory(tab.id)}
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
      footerCode={`END OF PAGE // ${activeTabMeta.shortTitle.toUpperCase()}`}
      footerAction={
        <button
          type="button"
          onClick={handleCycleNextTab}
          className={styles.nextTabButton}
          aria-label="次のカテゴリの付箋ページをめくる"
        >
          次のページへ → 
        </button>
      }
    >
      {/* タブパネルとして各アイテム一覧を表示 */}
      <div
        id={`stack-panel-${activeTabMeta.id}`}
        role="tabpanel"
        aria-labelledby={`stack-tab-${activeTabMeta.id}`}
      >
        <ul className={styles.entriesList}>
          {filteredStacks.map((item) => (
            <StackEntryRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </NotebookSection>
  );
};
