import type { ProfileEnvironmentItem } from '../../types/profile';
import styles from './ProfileEnvironment.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfileEnvironmentProps = {
  items: ProfileEnvironmentItem[];
  secNo?: string | number;
  className?: string;
};

export const ProfileEnvironment = ({
  items,
  secNo = '05',
  className,
}: ProfileEnvironmentProps) => {
  const code = `SEC. ${String(secNo).padStart(2, '0')} // My ENVIRONMENT`;

  return (
    <div
      className={
        className ? `${styles.recordBlock} ${className}` : styles.recordBlock
      }
    >
      <ProfileSubHeader
        code={code}
        title="作業環境"
      />
      <div className={styles.envGrid}>
        {items.map((env) => (
          <div key={env.id} className={styles.envPlate}>
            <span className={styles.envCategory}>{env.category}</span>
            <span className={styles.envValue}>{env.value}</span>
            {env.note && <span className={styles.envNote}>{env.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
