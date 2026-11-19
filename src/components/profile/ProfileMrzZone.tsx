import styles from './ProfileMrzZone.module.css';

export type ProfileMrzZoneProps = {
  handleName: string;
  className?: string;
};

export const ProfileMrzZone = ({
  handleName,
  className,
}: ProfileMrzZoneProps) => {
  return (
    <div
      className={className ? `${styles.mrzZone} ${className}` : styles.mrzZone}
      aria-hidden="true"
    >
      <div className={styles.mrzLine}>
        P&lt;GLD&lt;{handleName.toUpperCase()}
        &lt;&lt;ADVENTURER&lt;CRAFTSMAN&lt;ATELIER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </div>
      <div className={styles.mrzLine}>
        202604019GLD0000000M2611185&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
      </div>
    </div>
  );
};
