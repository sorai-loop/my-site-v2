import { useEffect, useMemo, useRef, useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import type { ProfileData } from '../../types/profile';
import {
  GuildActivityCalendar,
  ProfileAccountLinks,
  ProfileEnvironment,
  ProfileFavoriteTracks,
  ProfileHistory,
  ProfileIdentityCard,
  ProfilePhilosophy,
  ProfileTopics,
} from '../profile';
import { NotebookSection } from './NotebookSection';
import styles from './ProfileSection.module.css';

export type ProfileSectionProps = {
  profile?: ProfileData;
  className?: string;
};

export const ProfileSection = ({
  profile = PROFILE_DATA,
  className,
}: ProfileSectionProps) => {
  const [mobilePage, setMobilePage] = useState<1 | 2 | 3>(1);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>(
    'forward'
  );
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [syncedPageHeight, setSyncedPageHeight] = useState<number | null>(null);
  const [syncedTabletPageHeight, setSyncedTabletPageHeight] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dossierFrameRef = useRef<HTMLDivElement | null>(null);
  const page1InnerRef = useRef<HTMLDivElement | null>(null);
  const page2InnerRef = useRef<HTMLDivElement | null>(null);
  const tabletPage1Ref = useRef<HTMLDivElement | null>(null);
  const heightsRef = useRef<{ page1: number; page2: number }>({ page1: 0, page2: 0 });

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 599px)');
    const mqTablet = window.matchMedia(
      '(min-width: 600px) and (max-width: 959px)'
    );

    const updateMode = () => {
      if (mqMobile.matches) {
        setViewMode('mobile');
      } else if (mqTablet.matches) {
        setViewMode('tablet');
      } else {
        setViewMode('desktop');
      }
    };

    updateMode();
    mqMobile.addEventListener('change', updateMode);
    mqTablet.addEventListener('change', updateMode);
    return () => {
      mqMobile.removeEventListener('change', updateMode);
      mqTablet.removeEventListener('change', updateMode);
    };
  }, []);

  // スマホ用 1・2ページ目の中身本来の自然高さを監視し、大きい方に自動同期
  useEffect(() => {
    const p1 = page1InnerRef.current;
    const p2 = page2InnerRef.current;
    if (!p1 && !p2) return;

    const updateHeight = () => {
      const h1 = p1 ? Math.round(p1.offsetHeight || p1.getBoundingClientRect().height) : 0;
      const h2 = p2 ? Math.round(p2.offsetHeight || p2.getBoundingClientRect().height) : 0;
      if (h1 > 0) heightsRef.current.page1 = h1;
      if (h2 > 0) heightsRef.current.page2 = h2;

      const maxH = Math.max(heightsRef.current.page1, heightsRef.current.page2);
      if (maxH > 0) {
        setSyncedPageHeight(maxH);
      }
    };

    updateHeight();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(
          entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        );
        if (h > 0) {
          if (entry.target === p1) heightsRef.current.page1 = h;
          if (entry.target === p2) heightsRef.current.page2 = h;
          updateHeight();
        }
      }
    });

    if (p1) observer.observe(p1);
    if (p2) observer.observe(p2);
    return () => observer.disconnect();
  }, [viewMode, mobilePage]);

  // タブレット用 1ページ目（左右2列）の実測高さを監視
  useEffect(() => {
    const el = tabletPage1Ref.current;
    if (!el) return;

    const updateTabletHeight = () => {
      const h = el.scrollHeight;
      if (h > 0) {
        setSyncedTabletPageHeight(h);
      }
    };

    updateTabletHeight();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(
          entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        );
        if (h > 0) {
          setSyncedTabletPageHeight(Math.max(h, el.scrollHeight));
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewMode]);

  const totalPages = viewMode === 'tablet' ? 2 : 3;

  useEffect(() => {
    if (viewMode === 'tablet' && mobilePage > 2) {
      setMobilePage(1);
    }
  }, [viewMode, mobilePage]);

  const goToPage = (page: 1 | 2 | 3) => {
    if (page === mobilePage) return;
    setSlideDirection(page > mobilePage ? 'forward' : 'backward');
    setMobilePage(page);

    if (window.innerWidth < 960 && dossierFrameRef.current) {
      const rect = dossierFrameRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        dossierFrameRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // 左スワイプ: 次頁へ
        if (mobilePage < totalPages) {
          goToPage((mobilePage + 1) as 1 | 2 | 3);
        }
      } else if (deltaX > 0) {
        // 右スワイプ: 前頁へ
        if (mobilePage > 1) {
          goToPage((mobilePage - 1) as 1 | 2 | 3);
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const accountLinks = useMemo(
    () =>
      profile.links.filter(
        (item) =>
          item.category === 'account' || item.category === 'affiliation'
      ),
    [profile.links]
  );

  return (
    <NotebookSection
      id="profileSection"
      title="Profile"
      subtitle="Guild Dossier & Adventurer Passport"
      pageCode={`PAGE. 04 // ${profile.dossierNo}`}
      categoryBadge="個人調書"
      hasRuledLines={false}
      hasLeftMarginLine={false}
      minLines={0}
      isViewportHeight={false}
      footerCode="END OF DOSSIER // PROFILE & LINKS"
      className={[styles.profileSectionWrapper, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={dossierFrameRef}
        className={styles.dossierFrame}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 報告書トップバー */}
        <div className={styles.dossierTopBar}>
          <span className={styles.dossierClassification}>
            {profile.classification}
          </span>
          <span>
            {profile.dossierNo} // UPDATED: {profile.updatedAt}
          </span>
        </div>

        {/* 見開き2カラム（PC: 左右並列 / タブレット: 2ページ / モバイル: 3ページ） */}
        <div
          className={styles.spreadGrid}
          style={
            {
              ...(syncedPageHeight
                ? { ['--synced-page-height' as string]: `${syncedPageHeight}px` }
                : {}),
              ...(syncedTabletPageHeight
                ? {
                    ['--synced-tablet-page-height' as string]: `${syncedTabletPageHeight}px`,
                  }
                : {}),
            } as React.CSSProperties
          }
        >
          {viewMode === 'tablet' ? (
            <>
              {/* タブレット専用: PAGE 01 (プロフィール情報総合: 左右2列グリッド) */}
              <div
                ref={tabletPage1Ref}
                className={[
                  styles.tabletProfileSheet,
                  mobilePage === 1 ? styles.mobileVisible : styles.mobileHidden,
                  mobilePage === 1
                    ? slideDirection === 'forward'
                      ? styles.slideInForward
                      : styles.slideInBackward
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* 左列: 身分証 ＆ 設計思想 ＆ アカウント */}
                <div className={styles.tabletCol}>
                  <ProfileIdentityCard
                    handleName={profile.handleName}
                    roleTitle={profile.roleTitle}
                    guildClass={profile.guildClass}
                    birthDate={profile.birthDate}
                    affiliation={profile.affiliation}
                    avatarUrl={profile.avatarUrl}
                    stamps={profile.stamps}
                  />
                  <ProfilePhilosophy
                    motto={profile.philosophy.motto}
                    description={profile.philosophy.description}
                  />
                  <ProfileAccountLinks links={accountLinks} />
                </div>

                {/* 右列: 作業環境 ＆ 小話 ＆ 音楽 */}
                <div className={styles.tabletCol}>
                  <ProfileEnvironment items={profile.environment} secNo="04" />
                  <ProfileTopics topics={profile.topics} secNo="05" />
                  <ProfileFavoriteTracks tracks={profile.favoriteTracks} secNo="06" />
                </div>
              </div>

              {/* タブレット専用: PAGE 02 (SEC.07 活動履歴 - 大容量タイムライン) */}
              <div
                className={[
                  styles.tabletHistorySheet,
                  mobilePage === 2 ? styles.mobileVisible : styles.mobileHidden,
                  mobilePage === 2
                    ? slideDirection === 'forward'
                      ? styles.slideInForward
                      : styles.slideInBackward
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ProfileHistory
                  items={profile.history}
                  secNo="07"
                  isFillHeight={true}
                />
              </div>
            </>
          ) : (
            <>
              {/* 左ページ: SEC.01 - 03 - PC: 左列 / モバイル: PAGE 01 */}
              <div
                className={[
                  styles.identitySheet,
                  mobilePage === 1 ? styles.mobileVisible : styles.mobileHidden,
                  mobilePage === 1
                    ? slideDirection === 'forward'
                      ? styles.slideInForward
                      : styles.slideInBackward
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div ref={page1InnerRef} className={styles.page1Content}>
                  <ProfileIdentityCard
                    handleName={profile.handleName}
                    roleTitle={profile.roleTitle}
                    guildClass={profile.guildClass}
                    birthDate={profile.birthDate}
                    affiliation={profile.affiliation}
                    avatarUrl={profile.avatarUrl}
                    stamps={profile.stamps}
                  />
                  <ProfilePhilosophy
                    motto={profile.philosophy.motto}
                    description={profile.philosophy.description}
                  />
                  <ProfileAccountLinks links={accountLinks} />
                </div>
              </div>

              {/* モバイル専用: PAGE 02 (SEC.04 ＆ SEC.05 ＆ SEC.06) */}
              <div
                className={[
                  styles.mobilePage2Sheet,
                  mobilePage === 2 ? styles.mobileVisible : styles.mobileHidden,
                  mobilePage === 2
                    ? slideDirection === 'forward'
                      ? styles.slideInForward
                      : styles.slideInBackward
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div ref={page2InnerRef} className={styles.page2Content}>
                  <ProfileEnvironment items={profile.environment} secNo="04" />
                  <ProfileTopics topics={profile.topics} secNo="05" />
                  <ProfileFavoriteTracks tracks={profile.favoriteTracks} secNo="06" />
                </div>
              </div>

              {/* モバイル専用: PAGE 03 (SEC.07 */}
              <div
                className={[
                  styles.mobilePage3Sheet,
                  mobilePage === 3 ? styles.mobileVisible : styles.mobileHidden,
                  mobilePage === 3
                    ? slideDirection === 'forward'
                      ? styles.slideInForward
                      : styles.slideInBackward
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ProfileHistory
                  items={profile.history}
                  secNo="07"
                  isFillHeight={true}
                />
              </div>

              {/* PC専用: 右列 (SEC.04 ＆ SEC.05 ＆ SEC.06) */}
              <div className={styles.desktopDossierSheet}>
                <ProfileEnvironment items={profile.environment} secNo="04" />
                <ProfileTopics topics={profile.topics} secNo="05" />
                <ProfileHistory
                  items={profile.history}
                  secNo="06"
                  isFillHeight={true}
                />
              </div>
            </>
          )}
        </div>

        {/* モバイル・タブレット専用: 要素右下の査証頁めくりフッター (< 960px) */}
        <div className={styles.dossierFooter}>
          <span className={styles.dossierPageIndicator}>
            PAGE 0{mobilePage} // 0{totalPages}
          </span>
          <button
            type="button"
            className={styles.dossierPageTurnButton}
            onClick={() =>
              goToPage(
                mobilePage >= totalPages
                  ? 1
                  : ((mobilePage + 1) as 1 | 2 | 3)
              )
            }
            aria-label="次のページへめくる"
          >
            <span className={styles.turnButtonLabel}>次のページへ</span>
            <span className={styles.turnButtonArrow} aria-hidden="true">
              →
            </span>
          </button>
        </div>

        {/* PC専用 下部全幅エリア (左右見開きの下に横長に配置: 音楽・草・MRZ) */}
        <div className={styles.desktopWideAnnex}>
          {/* SEC. 07 // HEAVY ROTATION (左右分割の下に全幅で横に広く配置) */}
          <ProfileFavoriteTracks tracks={profile.favoriteTracks} secNo="07" />
          {/* GitHubの草 (Activity Telemetry) */}
          <GuildActivityCalendar username={profile.githubUsername} />
        </div>
      </div>
    </NotebookSection>
  );
};
