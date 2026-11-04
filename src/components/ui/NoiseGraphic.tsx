import Noise from '../../assets/svg/Noise.svg?react';
import styles from './NoiseGraphic.module.css';

type NoiseGraphicProps = {
  'aria-hidden'?: boolean | 'true' | 'false';
  className?: string;
};

export const NoiseGraphic = ({
  'aria-hidden': ariaHidden = true,
  className,
}: NoiseGraphicProps) => {
  return (
    <div
      className={className ? `${styles.container} ${className}` : styles.container}
      aria-hidden={ariaHidden}
    >
      <Noise className={styles.noise} preserveAspectRatio="none" />
    </div>
  );
};
