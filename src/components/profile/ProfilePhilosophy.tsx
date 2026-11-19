import styles from './ProfilePhilosophy.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfilePhilosophyProps = {
  motto: string;
  description: string;
  className?: string;
};

export const ProfilePhilosophy = ({
  motto,
  description,
  className,
}: ProfilePhilosophyProps) => {
  return (
    <div
      className={
        className ? `${styles.recordBlock} ${className}` : styles.recordBlock
      }
    >
      <ProfileSubHeader
        code="SEC. 02 // PYRPOSE & PHILOSOPHY"
        title="目標・思想"
      />
      <div className={styles.philosophyBox}>
        <p className={styles.philosophyMotto}>{motto}</p>
        <p className={styles.philosophyText}>{description}</p>
      </div>
    </div>
  );
};
