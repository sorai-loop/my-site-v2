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
  const [isTwoPage, setIsTwoPage] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>(
    'forward'
  );

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dossierFrameRef = useRef<HTMLDivElement | null>(null);
  const spreadGridRef = useRef<HTMLDivElement | null>(null);
  const page1Ref = useRef<HTMLDivElement | null>(null);
  const page2Ref = useRef<HTMLDivElement | null>(null);
  const svhRulerRef = useRef<HTMLDivElement | null>(null);

  const totalPages: 2 | 3 = isTwoPage ? 2 : 3;
  const activePage: 1 | 2 | 3 =
    mobilePage > totalPages ? 1 : mobilePage;

  useEffect(() => {
    const frameEl = dossierFrameRef.current;
    const gridEl = spreadGridRef.current;
    const p1El = page1Ref.current;
    const p2El = page2Ref.current;
    const rulerEl = svhRulerRef.current;
    if (!frameEl || !gridEl || !p1El || !p2El) return;

    const evaluateStage = () => {
      if (window.innerWidth >= 960) {
        setIsTwoPage(false);
        return;
      }

      const h1 = p1El.scrollHeight;
      const h2 = p2El.scrollHeight;
      if (h1 <= 0 || h2 <= 0) return;

      const svh = rulerEl?.offsetHeight || window.innerHeight;
      const chromeHeight = Math.max(0, frameEl.offsetHeight - gridEl.offsetHeight);
      const twoPageTotalHeight = chromeHeight + h1 + 8 + h2;

      setIsTwoPage(twoPageTotalHeight <= svh);
    };

    evaluateStage();

    const observer = new ResizeObserver(evaluateStage);
    observer.observe(p1El);
    observer.observe(p2El);
    if (rulerEl) observer.observe(rulerEl);
    window.addEventListener('resize', evaluateStage);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', evaluateStage);
    };
  }, []);

  const goToPage = (page: 1 | 2 | 3) => {
    if (page === activePage) return;
    setSlideDirection(page > activePage ? 'forward' : 'backward');
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
        if (activePage < totalPages) {
          goToPage((activePage + 1) as 1 | 2 | 3);
        }
      } else if (deltaX > 0) {
        if (activePage > 1) {
          goToPage((activePage - 1) as 1 | 2 | 3);
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

  const isPage1BlockVisible = activePage === 1;
  const isPage2BlockVisible = isTwoPage ? activePage === 1 : activePage === 2;
  const isHistoryBlockVisible = isTwoPage ? activePage === 2 : activePage === 3;
  const slideAnimClass =
    slideDirection === 'forward' ? styles.slideInForward : styles.slideInBackward;

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
      <div ref={svhRulerRef} className={styles.svhRuler} aria-hidden="true" />

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

        {/* 見開き2カラム（PC: 1ページ見開き / モバイル・タブレット: 2ページまたは3ページ） */}
        <div
          ref={spreadGridRef}
          className={[styles.spreadGrid, isTwoPage && styles.twoPageGrid]
            .filter(Boolean)
            .join(' ')}
        >
          {/* SEC.01 - 03 */}
          <div
            ref={page1Ref}
            className={[
              styles.identitySheet,
              isPage1BlockVisible ? styles.mobileVisible : styles.mobileHidden,
              isPage1BlockVisible ? slideAnimClass : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
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

          {/* SEC.04 ＆ SEC.05 ＆ SEC.06 */}
          <div
            ref={page2Ref}
            className={[
              styles.mobilePage2Sheet,
              isPage2BlockVisible ? styles.mobileVisible : styles.mobileHidden,
              isPage2BlockVisible ? slideAnimClass : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <ProfileEnvironment items={profile.environment} secNo="04" />
            <ProfileTopics topics={profile.topics} secNo="05" />
            <ProfileFavoriteTracks tracks={profile.favoriteTracks} secNo="06" />
          </div>

          {/* SEC.07*/}
          <div
            className={[
              styles.mobilePage3Sheet,
              isHistoryBlockVisible ? styles.mobileVisible : styles.mobileHidden,
              isHistoryBlockVisible ? slideAnimClass : '',
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
        </div>

        {/* モバイル・タブレット専用: 要素右下のめくりフッター (< 960px) */}
        <div className={styles.dossierFooter}>
          <span className={styles.dossierPageIndicator}>
            PAGE 0{activePage} // 0{totalPages}
          </span>
          <button
            type="button"
            className={styles.dossierPageTurnButton}
            onClick={() =>
              goToPage(
                activePage >= totalPages
                  ? 1
                  : ((activePage + 1) as 1 | 2 | 3)
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

        {/* PC専用 下部全幅エリア */}
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
