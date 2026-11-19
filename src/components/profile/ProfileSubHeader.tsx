import styles from './ProfileSubHeader.module.css';

export type ProfileSubHeaderProps = {
  code: string;
  title: string;
  className?: string;
};

export const ProfileSubHeader = ({
  code,
  title,
  className,
}: ProfileSubHeaderProps) => {
  return (
    <div
      className={
        className
          ? `${styles.sheetSubHeader} ${className}`
          : styles.sheetSubHeader
      }
    >
      <span className={styles.sheetCode}>{code}</span>
      <span className={styles.sheetTitle}>{title}</span>
    </div>
  );
};
