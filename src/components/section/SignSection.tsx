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
    </section>
  );
};
