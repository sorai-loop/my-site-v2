export type SocialLinkItem = {
  id: string;
  label: string;
  href: string;
  iconName: string;
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'x',
    label: 'Twitter (X)',
    href: 'https://x.com/sorai_loop',
    iconName: 'x',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/sorai-loop',
    iconName: 'github',
  },
];
