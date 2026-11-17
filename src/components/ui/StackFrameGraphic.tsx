import type { FC } from 'react';
import styles from './StackIcon.module.css';

export type StackFrameGraphicProps = {
  bleed?: boolean;
  stain?: boolean;
  filterId: string;
  stainFilterId: string;
  maskId: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/**
 * StackFrameGraphic
 * 枠とにじみ・ステインフィルターを描画する
 */
export const StackFrameGraphic: FC<StackFrameGraphicProps> = ({
  bleed = true,
  stain = true,
  filterId,
  stainFilterId,
  maskId,
  'aria-hidden': ariaHidden = true,
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.frameSvg}
      aria-hidden={ariaHidden}
    >
      <defs>
        {bleed && (
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.12"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        )}
        {stain && (
          <>
            <filter
              id={stainFilterId}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
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
              <feColorMatrix
                type="saturate"
                values="0"
                in="mixed"
                result="gray"
              />
              <feComponentTransfer in="gray">
                <feFuncR type="linear" slope="0.2" intercept="0.82" />
                <feFuncG type="linear" slope="0.2" intercept="0.82" />
                <feFuncB type="linear" slope="0.2" intercept="0.82" />
              </feComponentTransfer>
            </filter>
            <mask
              id={maskId}
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="-5"
              y="-5"
              width="58"
              height="58"
            >
              <rect
                x="-5"
                y="-5"
                width="58"
                height="58"
                fill="#ffffff"
                filter={`url(#${stainFilterId})`}
              />
            </mask>
          </>
        )}
      </defs>

      <g
        filter={bleed ? `url(#${filterId})` : undefined}
        mask={stain ? `url(#${maskId})` : undefined}
      >
        {/* 外側実線枠: 中心 (24, 24)、サイズ 40x40 (外マージン 4px) */}
        <rect
          x="4"
          y="4"
          width="40"
          height="40"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* 内側点線枠: 中心 (24, 24)、サイズ 35x35 (実線枠の内側と一体感のある 1.7px 間隔の二重枠) */}
        <rect
          x="6.5"
          y="6.5"
          width="35"
          height="35"
          rx="3"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.55"
        />
      </g>
    </svg>
  );
};
