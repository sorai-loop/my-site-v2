import { useId } from 'react';
import styles from './StampGraphic.module.css';

export type StampType = 0 | 1;

export type StampGraphicProps = {
  text: string;
  type?: StampType;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const StampGraphic = ({
  text,
  type = 0,
  className,
  'aria-hidden': ariaHidden = true,
}: StampGraphicProps) => {
  const uniqueId = useId();
  const maskId = `stamp-mask-${uniqueId.replace(/[:]/g, '')}`;
  const isHakubun = type === 1;

  const shouldCompress = text.length > 7;

  return (
    <svg
      viewBox="-1 -1 52 19"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.stamp} ${className || ''}`}
      aria-hidden={ariaHidden}
    >
      <defs>
        {isHakubun && (
          <mask id={maskId} mask-type="luminance">
            <rect x="-1" y="-1" width="52" height="19" fill="#ffffff" />
            <text
              x="25"
              y="8"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#000000"
              stroke="#000000"
              strokeWidth={0.2}
              className={styles.stampText}
              textLength={shouldCompress ? 42 : undefined}
              lengthAdjust={shouldCompress ? 'spacingAndGlyphs' : undefined}
            >
              {text}
            </text>
          </mask>
        )}
      </defs>

      {isHakubun ? (
        <rect
          x="0"
          y="0"
          width="50"
          height="17"
          rx="5"
          ry="5"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={0.8}
          mask={`url(#${maskId})`}
        />
      ) : (
        <g>
          <rect
            x="0"
            y="0"
            width="50"
            height="17"
            rx="5"
            ry="5"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.8}
          />
          <text
            x="25"
            y="8"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            className={styles.stampText}
            textLength={shouldCompress ? 42 : undefined}
            lengthAdjust={shouldCompress ? 'spacingAndGlyphs' : undefined}
          >
            {text}
          </text>
        </g>
      )}
    </svg>
  );
};
