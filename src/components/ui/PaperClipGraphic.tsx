import styles from './PaperClipGraphic.module.css';

export type PaperClipGraphicProps = {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/**
 * 紙片や書類を留める真鍮・ヴィンテージペーパークリップ金具コンポーネント。
 */
export const PaperClipGraphic = ({
  className,
  'aria-hidden': ariaHidden = true,
}: PaperClipGraphicProps) => {
  return (
    <span
      className={
        className ? `${styles.paperClip} ${className}` : styles.paperClip
      }
      aria-hidden={ariaHidden}
    >
      <span className={styles.innerLoop} />
    </span>
  );
};
