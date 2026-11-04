import Stain from '../../assets/svg/Stain.svg?react';
import styles from './StainGraphic.module.css';

type StainGraphicProps = {
  'aria-hidden'?: boolean | 'true' | 'false';
  className?: string;
};

export const StainGraphic = ({
  'aria-hidden': ariaHidden = true,
  className,
}: StainGraphicProps) => {
  return (
    <div
      className={className ? `${styles.container} ${className}` : styles.container}
      aria-hidden={ariaHidden}
    >
      <Stain className={styles.stain} preserveAspectRatio="none" />
    </div>
  );
};
