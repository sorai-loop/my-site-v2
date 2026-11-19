import type { ProfileTrackItem } from '../../types/profile';
import styles from './ProfileFavoriteTracks.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfileFavoriteTracksProps = {
  tracks: ProfileTrackItem[];
  secNo?: string | number;
  className?: string;
};

export const ProfileFavoriteTracks = ({
  tracks,
  secNo = '07',
  className,
}: ProfileFavoriteTracksProps) => {
  const code = `SEC. ${String(secNo).padStart(2, '0')} // HEAVY ROTATION`;

  return (
    <div
      className={
        className ? `${styles.recordBlock} ${className}` : styles.recordBlock
      }
    >
      <ProfileSubHeader
        code={code}
        title="最近ハマっている曲"
      />
      <ul className={styles.trackList}>
        {tracks.map((track) => (
          <li key={track.id} className={styles.trackCard}>
            <svg
              viewBox="0 0 24 24"
              className={styles.discIcon}
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle
                cx="12"
                cy="12"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeDasharray="3 2"
              />
              <circle
                cx="12"
                cy="12"
                r="2.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            <div className={styles.trackBody}>
              <span className={styles.trackTitle}>{track.title}</span>
              <span className={styles.trackArtist}>♪ {track.artist}</span>
              {track.note && (
                <span className={styles.trackNote}>{track.note}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
