import type { ProfileStampItem } from '../../types/profile';
import { resolveImage } from '../../utils/resolveImage';
import { StampGraphic } from '../ui/StampGraphic';
import styles from './ProfileIdentityCard.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfileIdentityCardProps = {
  handleName: string;
  roleTitle: string;
  guildClass: string;
  birthDate: string;
  affiliation: string;
  avatarUrl?: string | null;
  stamps: ProfileStampItem[];
  className?: string;
};

export const ProfileIdentityCard = ({
  handleName,
  roleTitle,
  guildClass,
  birthDate,
  affiliation,
  avatarUrl,
  stamps,
  className,
}: ProfileIdentityCardProps) => {
  const avatarSrc = resolveImage(avatarUrl);
  const primaryStamp = stamps[0];
  const secondaryStamps = stamps.slice(1);

  return (
    <div
      className={
        className
          ? `${styles.identityBlock} ${className}`
          : styles.identityBlock
      }
    >
      <ProfileSubHeader
        code="SEC. 01 // IDENTITY & Field"
        title="Who are you?"
      />

      <div className={styles.identityTopRow}>
        {/* 証明写真枠 */}
        <div className={styles.portraitWrapper}>
          <div className={styles.portraitInner}>
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={`${handleName} のポートレート`}
                className={styles.portraitImage}
              />
            ) : (
              <span className={styles.portraitCaption}>NO PORTRAIT</span>
            )}
          </div>
          <span className={styles.portraitCaption}>そらい // FIG.01</span>

          {primaryStamp && (
            <div className={styles.portraitStampOverlay}>
              <StampGraphic
                text={primaryStamp.text}
                type={primaryStamp.type ?? 1}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* 氏名・階級プレート */}
        <div className={styles.namePlate}>
          <span className={styles.guildClassBadge}>{guildClass}</span>
          <h3 className={styles.handleName}>{handleName}</h3>
          <p className={styles.roleTitle}>{roleTitle}</p>

          {secondaryStamps.length > 0 && (
            <div className={styles.stampRow}>
              {secondaryStamps.map((st, idx) => (
                <div key={`${st.text}-${idx}`} className={styles.inlineStamp}>
                  <StampGraphic
                    text={st.text}
                    type={st.type ?? 0}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 基本項目テーブル */}
      <dl className={styles.particularsList}>
        <div className={styles.particularItem}>
          <dt className={styles.particularLabel}>
            DATE OF BIRTH // 生年月日
          </dt>
          <dd className={styles.particularValue}>{birthDate}</dd>
        </div>
        <div className={styles.particularItem}>
          <dt className={styles.particularLabel}>
            AFFILIATION // 所属
          </dt>
          <dd className={styles.particularValue}>{affiliation}</dd>
        </div>
      </dl>
    </div>
  );
};
