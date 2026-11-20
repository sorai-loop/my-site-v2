import type { ReactNode } from 'react';
import styles from './ProfileSubHeader.module.css';

export type ProfileSubHeaderProps = {
  code: string;
  title: string;
  extra?: ReactNode;
  className?: string;
};

export const ProfileSubHeader = ({
  code,
  title,
  extra,
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
      <div className={styles.sheetTitleGroup}>
        <span className={styles.sheetTitle}>{title}</span>
        {extra && <span className={styles.sheetExtra}>{extra}</span>}
      </div>
    </div>
  );
};
