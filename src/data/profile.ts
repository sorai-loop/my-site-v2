import type { ProfileData } from '../types/profile';

export const PROFILE_DATA: ProfileData = {
  dossierNo: 'GUILD-REG // NO. 2026-0401',
  classification: 'ADVENTURER PASSPORT & FIELD DOSSIER',
  updatedAt: '2026.11',
  handleName: 'Sorai',
  roleTitle: 'Web Front / Game Developer',
  guildClass: 'SOPHOMORE // NOVICE ENGINEER',
  birthDate: '2006.11.26',
  affiliation: 'ソフトウェア技術研究会',
  status: '今日も元気に開発中！',
  avatarUrl: '../assets/img/sorai.jpg',
  stamps: [],
  philosophy: {
    motto: 'あるんだけどさ',
    description:
      'いざ言葉にすると難しい',
  },
  history: [
    
    {
      id: 'foo',
      period: '日時いれてね！',
      title: 'えにーたいとる',
      detail:
        'てきすと！',
      badge: 'かてごりとか',
    },
  ],
  environment: [
    {
      id: 'env-os',
      category: 'MAIN OS',
      value: 'Arch Linux',
      note: 'Caelestia環境なう。快適すぎてデスクトップもHyplandにしたい。',
    },
    {
      id: 'env-server',
      category: 'HOME SERVER',
      value: 'Raspberry Pi 4B',
      note: 'サイト公開したりBot動かしたり...最近調子悪そうで心配。',
    },
  ],
  favoriteTracks: [
    {
      id: 'track-1',
      title: 'To The End',
      artist: 'KOHTA YAMAMOTO',
      note: '忘れられない最後の曲。',
    },
    {
      id: 'track-2',
      title: '裸の勇者',
      artist: 'Vaundy',
      note: 'よすぎて本編もみたいってかれこれ1年位いってる。',
    },
  ],
  topics: [
    {
      id: 'topic-svg',
      tag: 'CRAFT // めっちゃ頑張った',
      title: 'テキストエディターでSVG手書きチャレンジ',
      body: 'このサイトで使われているSVGは基本的に私が作ったものです。特にArticleのパイプたちと多用してるスタンプは流石に私天才って感じ。',
    },
  ],
  links: [
    {
      id: 'link-github',
      category: 'account',
      label: 'GitHub',
      sublabel: '@sorai-loop',
      href: 'https://github.com/sorai-loop',
      iconName: 'github',
    },
    {
      id: 'link-x',
      category: 'account',
      label: 'X (Twitter)',
      sublabel: '@sorai_loop',
      href: 'https://x.com/sorai_loop',
      iconName: 'x',
    },
    {
      id: 'link-qiita',
      category: 'account',
      label: 'Qiita',
      sublabel: 'ブログ',
      href: 'https://qiita.com/sorai',
      iconName: 'qiita',
    },
    {
      id: 'link-connpass',
      category: 'account',
      label: 'Connpass',
      sublabel: 'イベント',
      href: 'https://connpass.com/user/sorai/',
      iconName: 'connpass',
    },
  ],
  githubUsername: 'sorai-loop',
};
