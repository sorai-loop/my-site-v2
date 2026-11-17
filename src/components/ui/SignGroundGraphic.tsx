import type { FC } from 'react';
import styles from './SignGroundGraphic.module.css';

export type SignGroundGraphicProps = {
  strokeWidth?: number;
  className?: string;
  standalone?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const SignGroundGraphic: FC<SignGroundGraphicProps> = ({
  strokeWidth = 0.5,
  className,
  standalone = false,
  'aria-hidden': ariaHidden = true,
}) => {
  const content = (
    <g
      className={className ? `${styles.groundBase} ${className}` : styles.groundBase}
      aria-hidden={ariaHidden}
    >
      {/* 影 */}
      <ellipse
        cx="43"
        cy="224"
        rx="24"
        ry="3.5"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="none"
      />

      {/* 地面の土の盛り上がり */}
      <path
        d="M12 225.5 Q 28 221 40 219.5 M46 219.5 Q 58 221 74 225.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M6 226.5 Q 25 223 43 222 Q 61 223 80 226.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="3 2"
        opacity="0.65"
      />
      <path
        d="M18 228.5 Q 43 225.5 68 228.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        opacity="0.4"
      />

      {/* 地面の切り込み */}
      <path
        d="M39 220 L40 222.5 L46 222.5 L47 220"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* 小石 */}
      <path
        d="M21 225 Q 23 223 25 225 Z M31 223.5 Q 32.5 222 34 223.5 Z M54 223.5 Q 55.5 222 57 223.5 Z M67 225 Q 69 223.5 71 225 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        fill="currentColor"
        fillOpacity="0.2"
      />
    </g>
  );

  if (standalone) {
    return (
      <svg
        viewBox="0 216 90 16"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.standaloneSvg}
        aria-hidden={ariaHidden}
      >
        {content}
      </svg>
    );
  }

  return content;
};
