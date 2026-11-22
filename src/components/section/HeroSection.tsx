import { SOCIAL_LINKS } from '../../data/social';
import { DownArrowIcon } from '../ui/DownArrowIcon';
import { LenticularGraphic } from '../ui/LenticularGraphic';
import { NimbusGraphic } from '../ui/NimbusGraphic';
import { StackIcon } from '../ui/StackIcon';
import { StratusGraphic } from '../ui/StratusGraphic';
import styles from './HeroSection.module.css';

export const HeroSection = () => {
  return (
    <section className={styles.hero} id="heroSection">
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <div className={styles.lenticular}>
            <LenticularGraphic aria-hidden="true" />
          </div>
          <h1 className={styles.title}>Sorai</h1>
        </div>
        <a href="#signSection" className={styles.viewDetailsLink}>
          <span>VIEW_DETAILS</span>
          <DownArrowIcon aria-hidden="true" style={{ width: '1.1rem', height: 'auto' }} />
        </a>
      </div>

      {/* 右側のミニリンク */}
      <nav className={styles.socialNav} aria-label="Social Links">
        <ul className={styles.socialList}>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.id} className={styles.socialItem}>
              <a
                href={link.href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <div className={styles.socialIcon}>
                  <StackIcon
                    icon={link.iconName}
                    shape="circle"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.nimbus}>
        <NimbusGraphic aria-hidden="true" />
      </div>
      <div className={styles.stratus}>
        <StratusGraphic aria-hidden="true" />
      </div>
    </section>
  );
};