import { useId } from 'react';
import styles from './StampGraphic.module.css';

export type StampType = 0 | 1;

export type StampGraphicProps = {
  text: string;
  type?: StampType;
  bleed?: boolean;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const StampGraphic = ({
  text,
  type = 0,
  bleed = true,
  className,
  'aria-hidden': ariaHidden = true,
}: StampGraphicProps) => {
  const uniqueId = useId();
  const cleanId = uniqueId.replace(/[:]/g, '');
  const maskId = `stamp-mask-${cleanId}`;
  const filterId = `stamp-bleed-${cleanId}`;
  const stainFilterId = `stamp-stain-filter-${cleanId}`;
  const mottleMaskId = `stamp-mottle-mask-${cleanId}`;
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
        {bleed && (
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              // ここいじるとギザギザの細かさ変わるよ
              baseFrequency="0.07"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              // ここいじるとギザギザの歪み変わるよ
              scale="0.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        )}

        <filter id={stainFilterId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09"
            numOctaves="3"
            result="blobs"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves="2"
            result="grain"
          />
          <feComposite
            in="blobs"
            in2="grain"
            operator="arithmetic"
            k1="0"
            k2="0.75"
            k3="0.25"
            k4="0"
            result="mixed"
          />
          <feColorMatrix type="saturate" values="0" in="mixed" result="gray" />
          <feComponentTransfer in="gray">
            //ここいじるとステイン変わるよ
            <feFuncR type="linear" slope="0.0001" intercept="0.9999" />
            <feFuncG type="linear" slope="0.0001" intercept="0.9999" />
            <feFuncB type="linear" slope="0.0001" intercept="0.9999" />
          </feComponentTransfer>
        </filter>

        <mask id={mottleMaskId} mask-type="alpha">
          <rect
            x="-2"
            y="-2"
            width="56"
            height="23"
            fill="#ffffff"
            opacity={1}
            filter={`url(#${stainFilterId})`}
          />
        </mask>

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
              textLength={shouldCompress ? 40 : undefined}
              lengthAdjust={shouldCompress ? 'spacingAndGlyphs' : undefined}
            >
              {text}
            </text>
          </mask>
        )}
      </defs>

      <g
        filter={bleed ? `url(#${filterId})` : undefined}
        mask={`url(#${mottleMaskId})`}
      >
        {isHakubun ? (
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
              strokeWidth={1.3}
            />
            <rect
              x="1.5"
              y="1.5"
              width="47"
              height="14"
              rx="3.8"
              ry="3.8"
              fill="currentColor"
              mask={`url(#${maskId})`}
            />
          </g>
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
              strokeWidth={1.2}
            />
            <text
              x="25"
              y="8"
              textAnchor="middle"
              dominantBaseline="central"
              fill="currentColor"
              className={styles.stampText}
              textLength={shouldCompress ? 40 : undefined}
              lengthAdjust={shouldCompress ? 'spacingAndGlyphs' : undefined}
            >
              {text}
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};
