import type {
  StackItem,
  StackTabMeta,
} from '../types/stack';

export const STACK_TABS: StackTabMeta[] = [
  {
    id: 'languages',
    indexLabel: '01',
    title: '01. Languages',
    shortTitle: 'Languages',
    verticalLabel: 'Languages',
    subtitle: '使える言語',
  },
  {
    id: 'frameworks',
    indexLabel: '02',
    title: '02. Frameworks & Platforms',
    shortTitle: 'Frameworks',
    verticalLabel: 'Frameworks',
    subtitle: '使えるフレームワーク',
  },
  {
    id: 'tools',
    indexLabel: '03',
    title: '03. Tools & Others',
    shortTitle: 'Tools & Others',
    verticalLabel: 'Tools',
    subtitle: '開発で使ってるツール',
  },
  {
    id: 'wishlist',
    indexLabel: '04',
    title: '04. Future & Wishlist',
    shortTitle: 'Future',
    verticalLabel: 'Future',
    subtitle: '今後やりたい技術！',
  },
];

export const STACKS_DATA: StackItem[] = [
  // ==========================================================================
  // 01. Languages
  // ==========================================================================
  {
    id: 'lang-typescript',
    category: 'languages',
    name: 'TypeScript',
    domainLabel: 'Web',
    icon: 'TypeScriptIcon.svg',
    stampText: 'Main',
    stampType: 1,
    description:
      'まだまだ勉強中！型をもっとうまく使えるようになりたいです。',
  },
  {
    id: 'lang-csharp',
    category: 'languages',
    name: 'C#',
    domainLabel: 'Game Engine & Desktop App',
    icon: 'CSharpLogo.svg',
    stampText: 'Main',
    stampType: 1,
    description:
      'Unityでのゲームロジック開発やWPFでのデスクトップアプリを作成できます。イベント駆動プログラミングの勉強中です。',
  },
  {
    id: 'lang-html',
    category: 'languages',
    name: 'HTML5',
    domainLabel: 'Semantics & Accessibility',
    icon: 'HtmlIcon.svg',
    stampText: 'Main',
    stampType: 0,
    description:
      'セマンティクスを意識したタグや属性の使用を心がけています。',
  },
  {
    id: 'lang-sass',
    category: 'languages',
    name: 'CSS / SCSS',
    domainLabel: 'Style & Design',
    icon: 'SassIcon.svg',
    stampText: 'Main',
    stampType: 0,
    description:
      'BEM, FLOCSSを用いたスタイルの設計、CSSModulesを用いたコンポーネントへのスタイルの作成が可能です。最近はUXを意識しながらレスポンシブにできるよう頑張っています。',
  },
  {
    id: 'lang-cpp',
    category: 'languages',
    name: 'C++',
    domainLabel: 'Game & Algorithm',
    icon: 'CppLogo.svg',
    stampText: 'Sub',
    stampType: 0,
    description:
      '基礎を徹底して学習しました。今はメインで使っていませんが、SDLライブラリを用いた2Dゲームの制作経験があります。',
  },
  {
    id: 'lang-c',
    category: 'languages',
    name: 'C',
    domainLabel: 'Foundation & Parents’ home',
    icon: 'CProgrammingLanguage.svg',
    stampText: 'Sub',
    stampType: 0,
    description:
      'マイコンへのプログラミング、ポインタ操作ができます。初めて触ったプログラミング言語ということもあり、スロットを作ったり、将棋を作ったりとなんだかんだ手に馴染んでいます。',
  },

  // ==========================================================================
  // 02. Frameworks & Platforms
  // ==========================================================================
  {
    id: 'fw-react',
    category: 'frameworks',
    name: 'React',
    domainLabel: 'Web',
    icon: 'ReactIcon.svg',
    stampText: 'Main',
    stampType: 1,
    description:
      'コンポーネント指向を頑張っています。SVG組み合わせた動的なUIコンポーネントの作成が得意です。',
  },
  {
    id: 'fw-unity',
    category: 'frameworks',
    name: 'Unity',
    domainLabel: 'Interactive & Game Development',
    icon: 'UnityIcon.svg',
    stampText: 'Main',
    stampType: 1,
    description:
      '設計に全力を注いでいます。絶賛ゲーム開発中！',
  },

  // ==========================================================================
  // 03. Tools & Others
  // ==========================================================================
  {
    id: 'tool-git',
    category: 'tools',
    name: 'Git / GitHub',
    domainLabel: 'Version Control & History',
    icon: 'GitIcon.svg',
    stampText: 'Min',
    stampType: 0,
    description:
      '基本的な操作だけでなく、GitHubActionsを用いたマイルストーンの作成やプロジェクト管理が可能です。',
  },
  {
    id: 'tool-raspberrypi',
    category: 'tools',
    name: 'Raspberry Pi',
    domainLabel: 'Home Server & IoT Edge',
    icon: 'RaspberryPiIcon.svg',
    stampText: 'Main',
    stampType: 0,
    description:
      'このサイト含め、私が作成したプロダクトの公開に使用しています。',
  },

  // ==========================================================================
  // 04. Future & Wishlist (他のタブと同様の流用レイアウト)
  // ==========================================================================
  {
    id: 'wish-Qt',
    category: 'wishlist',
    name: 'Qt',
    domainLabel: 'GUI',
    icon: 'Qt Framework.svg',
    stampText: 'Future',
    description:
      'メインの作業環境として使用しているCaelestiaがこれで作られているらしい。習得して、アドオンとか作ってみたい。',
  },
];

