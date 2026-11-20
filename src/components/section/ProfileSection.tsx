import { useMemo, useRef, useState } from 'react';
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dossierFrameRef = useRef<HTMLDivElement | null>(null);

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

    // 水平方向スワイプ判定: 40px以上、かつ水平移動が垂直移動の1.2倍以上
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // 左スワイプ: 次頁へ
        if (mobilePage === 1) goToPage(2);
        else if (mobilePage === 2) goToPage(3);
      } else if (deltaX > 0) {
        // 右スワイプ: 前頁へ
        if (mobilePage === 3) goToPage(2);
        else if (mobilePage === 2) goToPage(1);
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

        {/* 見開き2カラム（PC: 左右並列 / モバイル: 選択されたページを表示） */}
        <div className={styles.spreadGrid}>
          {/* 左ページ: SEC.01 - 03 (身分証・設計思想・公式発信アカウント) - PC: 左列 / モバイル: PAGE 01 */}
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

          {/* モバイル専用: PAGE 02 (SEC.04 作業環境 ＆ SEC.05 小話 ＆ SEC.06 音楽) */}
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
            <ProfileEnvironment items={profile.environment} secNo="04" />
            <ProfileTopics topics={profile.topics} secNo="05" />
            <ProfileFavoriteTracks tracks={profile.favoriteTracks} secNo="06" />
          </div>

          {/* モバイル専用: PAGE 03 (SEC.07 活動履歴 - 大容量タイムライン) */}
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

          {/* PC専用: 右列 (SEC.04 作業環境 ＆ SEC.05 小話 ＆ SEC.06 活動履歴) */}
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

        {/* モバイル専用: 要素右下の査証頁めくりフッター (< 960px) */}
        <div className={styles.dossierFooter}>
          <span className={styles.dossierPageIndicator}>
            PAGE 0{mobilePage} // 03
          </span>
          <button
            type="button"
            className={styles.dossierPageTurnButton}
            onClick={() =>
              goToPage(mobilePage === 1 ? 2 : mobilePage === 2 ? 3 : 1)
            }
            aria-label={
              mobilePage === 1
                ? '次頁へめくる'
                : mobilePage === 2
                  ? '次頁（PAGE 03へめくる'
                  : 'PAGE 01へ戻る'
            }
          >
            <span className={styles.turnButtonBadge}>
              {mobilePage === 1
                ? 'PAGE 02'
                : mobilePage === 2
                  ? 'PAGE 03'
                  : 'PAGE 01'}
            </span>
            <span className={styles.turnButtonLabel}>
              {mobilePage === 1
                ? 'へ'
                : mobilePage === 2
                  ? 'へ'
                  : 'へ'}
            </span>
            <span className={styles.turnButtonArrow} aria-hidden="true">
              {mobilePage === 3 ? '↺' : '→'}
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
