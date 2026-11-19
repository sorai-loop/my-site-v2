import type { ProfileLinkItem } from '../../types/profile';
import { StackIcon } from '../ui/StackIcon';
import styles from './ProfileAccountLinks.module.css';
import { ProfileSubHeader } from './ProfileSubHeader';

export type ProfileAccountLinksProps = {
  links: ProfileLinkItem[];
  className?: string;
};

export const ProfileAccountLinks = ({
  links,
  className,
}: ProfileAccountLinksProps) => {
  if (links.length === 0) return null;

  return (
    <div
      className={
        className
          ? `${styles.linksContainer} ${className}`
          : styles.linksContainer
      }
    >
      <ProfileSubHeader
        code="SEC. 03 // ACCOUNTS"
        title="いろんなアカウント"
      />

      <div className={styles.accountGrid}>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.accountCard}
            aria-label={`${link.label} (${link.sublabel ?? link.href}) を開く`}
          >
            <div className={styles.accountIcon}>
              <StackIcon
                icon={link.iconName || link.label}
                shape="circle"
                aria-hidden="true"
              />
            </div>
            <div className={styles.accountMeta}>
              <span className={styles.accountLabel}>{link.label}</span>
              {link.sublabel && (
                <span className={styles.accountSublabel}>{link.sublabel}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
