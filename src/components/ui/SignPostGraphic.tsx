import { SignGroundGraphic } from './SignGroundGraphic';
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
  /** 現在アクティブなセクションのキー ('works' | 'articles' | 'stacks' | 'profile') */
  activeKey?: 'works' | 'articles' | 'stacks' | 'profile' | string;
  withGround?: boolean;
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

type PlateMeta = {
  key: string;
  item?: SignPostItem;
  transform?: string;
  d1: string;
  d2: string;
  textY: number;
};

const POLE_PATH =
  'M40 223 v-53 m0 -20 v-10 m0 -20 v-10 m0 -20 v-10 m0 -20 v-10 m0 -20 v-15 h6 v15 m0 20 v10 m0 20 v10 m0 20 v10 m0 20 v10 m0 20 v53';

export const SignPostGraphic = ({
  works = DEFAULT_ITEMS.works,
  articles = DEFAULT_ITEMS.articles,
  stacks = DEFAULT_ITEMS.stacks,
  profile = DEFAULT_ITEMS.profile,
  extra,
  activeKey,
  withGround = true,
  className,
  strokeWidth = 0.5,
  'aria-hidden': ariaHidden,
}: SignPostGraphicProps) => {
  const plates: PlateMeta[] = [
    {
      key: 'works',
      item: works,
      transform: 'skewY(-10)',
      d1: 'm15 58 h55 l15 -10 l-15 -10 h-55 v20 z',
      d2: 'M15 58 l-2 -2 v-20 h55 l2 2 m-55 0 l-2 -2',
      textY: 48,
    },
    {
      key: 'articles',
      item: articles,
      d1: 'M15 60 v20 h55 l15 -10 l-15 -10 h-55 z',
      d2: 'M15 60 l2 -2 h55 l15 10 l-2 2 m-15 -10 l2 -2',
      textY: 70,
    },
    {
      key: 'stacks',
      item: stacks,
      transform: 'skewY(10)',
      d1: 'M75 103 h-55 l-15 -10 l15 -10 h55 v20 z',
      d2: 'M75 103 l2 -2 v-20 h-55 l-2 2 m55 0 l2 -2',
      textY: 93,
    },
    {
      key: 'profile',
      item: profile,
      d1: 'M75 140 h-55 l-15 -10 l15 -10 h55 v20 z',
      d2: 'M75 140 l2 -2 v-20 h-55 l-2 2 m55 0 l2 -2',
      textY: 130,
    },
    {
      key: 'extra',
      item: extra,
      transform: 'skewY(-10)',
      d1: 'm15 178 h55 l15 -10 l-15 -10 h-55 v20 z',
      d2: 'M15 178 l-2 -2 v-20 h55 l2 2 m-55 0 l-2 -2',
      textY: 168,
    },
  ];

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
        {plates.map(({ key, item, transform, d1, d2, textY }) => {
          if (!item && key !== 'extra') return null;

          const content = (
            <>
              <path d={d1} />
              <path d={d2} />
              {item && (
                <text
                  x="45"
                  y={textY}
                  className={styles.plateText}
                  fill="currentColor"
                  fillOpacity={1}
                >
                  {item.label}
                </text>
              )}
            </>
          );

          return (
            <g key={key} transform={transform}>
              {item ? (
                <a
                  href={item.href}
                  className={
                    activeKey === key
                      ? `${styles.plateLink} ${styles.activePlate}`
                      : styles.plateLink
                  }
                  aria-label={item.ariaLabel || item.label}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </g>
          );
        })}

        {/* 柱 */}
        <path d={POLE_PATH} />

        {/* 足元の地面パーツ (独立コンポーネント) */}
        {withGround && <SignGroundGraphic aria-hidden="true" strokeWidth={strokeWidth} />}
      </g>
    </svg>
  );
};
