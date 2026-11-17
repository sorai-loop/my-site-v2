import { useEffect, useState } from 'react';

export type ActiveSectionKey = 'works' | 'articles' | 'stacks' | 'profile' | null;

export const useSignNavigation = () => {
  const [isPastSign, setIsPastSign] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSectionKey>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 画面幅の監視
    const mq = window.matchMedia('(max-width: 1023px)');
    const updateMedia = () => setIsMobile(mq.matches);
    updateMedia();
    mq.addEventListener('change', updateMedia);

    // スクロール位置の監視: SignSection を超えて WorksSection 以降に入っているかを判定
    const checkScroll = () => {
      const signEl = document.getElementById('signSection');
      if (!signEl) return;
      const rect = signEl.getBoundingClientRect();
      // SignSection の下端が画面中央〜上部を通過したら常駐モードへ
      setIsPastSign(rect.bottom <= window.innerHeight * 0.4);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // 現在見えているセクション
    const sectionIds = ['worksSection', 'articlesSection', 'stacksSection', 'profileSection'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rawId = entry.target.id.replace('Section', '').toLowerCase();
            setActiveSection(rawId as ActiveSectionKey);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      mq.removeEventListener('change', updateMedia);
      window.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  }, []);

  return { isPastSign, activeSection, isMobile };
};
