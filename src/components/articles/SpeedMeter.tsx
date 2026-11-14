import type { CSSProperties } from 'react';
import styles from './SpeedMeter.module.css';

export type SpeedMeterProps = {
  /**
   * メーターの針の角度（度単位、例: -55 〜 65）
   */
  angle: number;
  /**
   * メーターのサイズ（幅・高さ、px単位）
   * @default 64
   */
  size?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/**
 * 本棚のスクロール速度やイベントに連動して針が振れるアナログ速度計コンポーネント
 */
export const SpeedMeter = ({
  angle,
  size = 64,
  className,
  style,
  'aria-hidden': ariaHidden = true,
}: SpeedMeterProps) => {
  return (
    <div
      className={className ? `${styles.meterWrapper} ${className}` : styles.meterWrapper}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      aria-hidden={ariaHidden}
    >
      <svg
        viewBox="0 0 64 64"
        className={styles.meterSvg}
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="32"
          cy="32"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <path
          d="M 14 40 L 18 38 M 12 28 L 16 29 M 20 16 L 23 19 M 32 11 L 32 15 M 44 16 L 41 19 M 52 28 L 48 29 M 50 40 L 46 38"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="49"
          textAnchor="middle"
          fontSize="7"
          fontFamily="var(--font-code, monospace)"
          fill="currentColor"
        >
          speed.
        </text>
        <g
          className={styles.meterNeedle}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <path
            d="M 32 36 L 32 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 29.5 18 L 32 13 L 34.5 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <circle cx="32" cy="32" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
};
