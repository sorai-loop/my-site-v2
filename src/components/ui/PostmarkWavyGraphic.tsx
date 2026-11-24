import { useId, type FC, type SVGProps } from 'react';
import styles from './PostmarkWavyGraphic.module.css';

export type PostmarkWavyGraphicProps = SVGProps<SVGSVGElement> & {
  lines?: number;
  bleed?: boolean;
  stain?: boolean;
  className?: string;
};

export const PostmarkWavyGraphic: FC<PostmarkWavyGraphicProps> = ({
  lines = 4,
  bleed = true,
  stain = true,
  className,
  ...props
}) => {
  const uniqueId = useId();
  const cleanId = uniqueId.replace(/[:]/g, '');
  const filterId = `postmark-bleed-${cleanId}`;
  const stainFilterId = `postmark-stain-filter-${cleanId}`;
  const maskId = `postmark-mask-${cleanId}`;

  const wavePaths = [
    'M 3 7 Q 6.5 3.5 10 7 T 17 7 T 24 7 T 31 7 T 38 7 T 45 7 T 52 7 T 57 7',
    'M 2 21 Q 5.5 17.5 9 21 T 16 21 T 23 21 T 30 21 T 37 21 T 44 21 T 51 21 T 58 21',
    'M 2 35 Q 5.5 31.5 9 35 T 16 35 T 23 35 T 30 35 T 37 35 T 44 35 T 51 35 T 58 35',
    'M 3 49 Q 6.5 45.5 10 49 T 17 49 T 24 49 T 31 49 T 38 49 T 45 49 T 52 49 T 57 49',
  ].slice(0, lines);

  return (
    <svg
      viewBox="0 0 60 56"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.postmarkWave} ${className || ''}`}
      aria-hidden="true"
      {...props}
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
              width="70"
              height="66"
            >
              <rect
                x="-5"
                y="-5"
                width="70"
                height="66"
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
        {wavePaths.map((d, index) => (
          <path
            key={index}
            d={d}
            className={styles.waveLine}
            strokeWidth="3.5"
          />
        ))}
      </g>
    </svg>
  );
};
