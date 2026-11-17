import type { FC } from 'react';
import { useSignNavigation } from '../../hooks/useSignNavigation';
import { SignPostGraphic } from '../ui/SignPostGraphic';
import styles from './SignNav.module.css';

/**
 * SignNav
 * PC画面でSignSection以降にスクロールした際に、画面左側に常駐する道標ナビゲーション。
 * モバイル画面では右下にSignに戻るボタン。
 */
export const SignNav: FC = () => {
  const { isPastSign, activeSection, isMobile } = useSignNavigation();

  const handleScrollToSign = () => {
    document.getElementById('signSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* PC向け: 画面左側に常駐する道標ナビゲーション */}
      <aside
        className={[
          styles.sideNav,
          isPastSign && !isMobile && styles.visible,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="追従目次ナビゲーション"
        aria-hidden={!isPastSign || isMobile}
      >
        <div className={styles.navHeader}>
          <span className={styles.headerCode}>WAYPOINT // SIGN</span>
        </div>
        <div className={styles.signWrapper}>
          <SignPostGraphic
            aria-hidden="false"
            activeKey={activeSection || undefined}
            strokeWidth={0.5}
          />
        </div>
      </aside>

      {/* モバイル向け: Sign以降のセクション閲覧中に常駐するボタン */}
      <div
        className={[
          styles.mobileBackWrapper,
          isPastSign && isMobile && styles.mobileVisible,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          onClick={handleScrollToSign}
          className={styles.mobileBackBtn}
          aria-label="目次へ戻る"
          title="目次へ戻る"
        >
          <span className={styles.backIcon} aria-hidden="true">↰</span>
          <span className={styles.backText}>SIGN</span>
        </button>
      </div>
    </>
  );
};
