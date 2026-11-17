import { SignPostGraphic } from '../ui/SignPostGraphic';
import styles from './SignSection.module.css';

export const SignSection = () => {
  return (
    <section id="signSection" className={styles.section}>
      <div className={styles.signWrapper}>
        <SignPostGraphic
          aria-hidden="false"
          works={{ label: 'Works', href: '#worksSection' }}
          articles={{ label: 'Articles', href: '#articlesSection' }}
          stacks={{ label: 'Stacks', href: '#stacksSection' }}
          profile={{ label: 'Profile', href: '#profileSection' }}
        />
      </div>

      {/* 画面下部に広がる広大な大地 */}
      <div className={styles.groundContainer} aria-hidden="true">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className={styles.groundSvg}
        >
          {/* 地面薄め */}
          <path
            d="M0 80 Q 360 62 720 68 Q 1080 62 1440 80 L 1440 220 L 0 220 Z"
            fill="currentColor"
            fillOpacity="0.035"
          />

          {/* 奥目の線 */}
          <path
            d="M0 58 Q 260 38 520 46 Q 780 34 1060 44 T 1440 52"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.3"
          />

          {/* メインの線 */}
          <path
            d="M0 80 Q 360 62 720 68 Q 1080 62 1440 80"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
          />

          <path
            d="M40 105 Q 400 90 760 98 Q 1120 88 1400 105"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 4"
            fill="none"
            opacity="0.45"
          />

          <path
            d="M80 138 Q 480 125 860 130 Q 1200 124 1380 142"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="5 6"
            fill="none"
            opacity="0.3"
          />

          {/* 小石 */}
          <path
            d="M240 76 Q 243 73 246 76 Z M640 66.5 Q 642 64.5 644 66.5 Z M820 67 Q 822.5 65 825 67 Z M1180 74 Q 1183 71.5 1186 74 Z"
            stroke="currentColor"
            strokeWidth={0.7}
            fill="currentColor"
            fillOpacity={0.2}
          />
        </svg>
      </div>
    </section>
  );
};
