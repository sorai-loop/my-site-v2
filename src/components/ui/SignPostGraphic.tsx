import styles from './SignPostGraphic.module.css';

export type SignPostItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type SignPostGraphicProps = {
  works?: SignPostItem;
  articles?: SignPostItem;
  stacks?: SignPostItem;
  profile?: SignPostItem;
  extra?: SignPostItem;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
};

const DEFAULT_ITEMS = {
  works: { label: 'Works', href: '#worksSection' },
  articles: { label: 'Articles', href: '#articlesSection' },
  stacks: { label: 'Stacks', href: '#stacksSection' },
  profile: { label: 'Profile', href: '#profileSection' },
};

export const SignPostGraphic = ({
  works = DEFAULT_ITEMS.works,
  articles = DEFAULT_ITEMS.articles,
  stacks = DEFAULT_ITEMS.stacks,
  profile = DEFAULT_ITEMS.profile,
  extra,
  className,
  strokeWidth = 0.5,
  'aria-hidden': ariaHidden,
}: SignPostGraphicProps) => {
  return (
    <svg
      viewBox="0 14 90 214"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.signPost} ${className || ''}`}
      role="navigation"
      aria-label="セクション目次"
      aria-hidden={ariaHidden}
    >
      <g fill="red" fillOpacity={0} stroke="currentColor" strokeWidth={strokeWidth}>
        {works && (
          <g transform="skewY(-10)">
            <a
              href={works.href}
              className={styles.plateLink}
              aria-label={works.ariaLabel || works.label}
            >
              <path d="m15 58 h55 l15 -10 l-15 -10 h-55 v20 z" />
              <path d="M15 58 l-2 -2 v-20 h55 l2 2 m-55 0 l-2 -2" />
              <text
                x="45"
                y="48"
                className={styles.plateText}
                fill="currentColor"
                fillOpacity={1}
              >
                {works.label}
              </text>
            </a>
          </g>
        )}

        {articles && (
          <g>
            <a
              href={articles.href}
              className={styles.plateLink}
              aria-label={articles.ariaLabel || articles.label}
            >
              <path d="M15 60 v20 h55 l15 -10 l-15 -10 h-55 z" />
              <path d="M15 60 l2 -2 h55 l15 10 l-2 2 m-15 -10 l2 -2" />
              <text
                x="45"
                y="70"
                className={styles.plateText}
                fill="currentColor"
                fillOpacity={1}
              >
                {articles.label}
              </text>
            </a>
          </g>
        )}

        {stacks && (
          <g transform="skewY(10)">
            <a
              href={stacks.href}
              className={styles.plateLink}
              aria-label={stacks.ariaLabel || stacks.label}
            >
              <path d="M75 103 h-55 l-15 -10 l15 -10 h55 v20 z" />
              <path d="M75 103 l2 -2 v-20 h-55 l-2 2 m55 0 l2 -2" />
              <text
                x="45"
                y="93"
                className={styles.plateText}
                fill="currentColor"
                fillOpacity={1}
              >
                {stacks.label}
              </text>
            </a>
          </g>
        )}

        {profile && (
          <g>
            <a
              href={profile.href}
              className={styles.plateLink}
              aria-label={profile.ariaLabel || profile.label}
            >
              <path d="M75 140 h-55 l-15 -10 l15 -10 h55 v20 z" />
              <path d="M75 140 l2 -2 v-20 h-55 l-2 2 m55 0 l2 -2" />
              <text
                x="45"
                y="130"
                className={styles.plateText}
                fill="currentColor"
                fillOpacity={1}
              >
                {profile.label}
              </text>
            </a>
          </g>
        )}

        {extra ? (
          <g transform="skewY(-10)">
            <a
              href={extra.href}
              className={styles.plateLink}
              aria-label={extra.ariaLabel || extra.label}
            >
              <path d="m15 178 h55 l15 -10 l-15 -10 h-55 v20 z" />
              <path d="M15 178 l-2 -2 v-20 h55 l2 2 m-55 0 l-2 -2" />
              <text
                x="45"
                y="168"
                className={styles.plateText}
                fill="currentColor"
                fillOpacity={1}
              >
                {extra.label}
              </text>
            </a>
          </g>
        ) : (
          <g transform="skewY(-10)">
            <path d="m15 178 h55 l15 -10 l-15 -10 h-55 v20 z" />
            <path d="M15 178 l-2 -2 v-20 h55 l2 2 m-55 0 l-2 -2" />
          </g>
        )}

        {/* 柱 */}
        <path
          d="M40 223 v-53 
            m0 -20 v-10 
            m0 -20 v-10 
            m0 -20 v-10 
            m0 -20 v-10 
            m0 -20 v-15
            h6 v15 
            m0 20 v10
            m0 20 v10
            m0 20 v10
            m0 20 v10
            m0 20 v53"
        />
        
        <g className={styles.groundBase}>
          <ellipse
            cx="43"
            cy="224"
            rx="24"
            ry="3.5"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="none"
          />

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

          <path
            d="M39 220 L40 222.5 L46 222.5 L47 220"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />

          <path
            d="M21 225 Q 23 223 25 225 Z M31 223.5 Q 32.5 222 34 223.5 Z M54 223.5 Q 55.5 222 57 223.5 Z M67 225 Q 69 223.5 71 225 Z"
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.6}
            fill="currentColor"
            fillOpacity="0.2"
          />
        </g>
      </g>
    </svg>
  );
};
