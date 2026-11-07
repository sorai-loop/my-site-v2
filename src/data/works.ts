import type { WorkItem } from '../types/work';

export const WORKS_DATA: WorkItem[] = [
  {
    id: 'portfolio-v2',
    title: 'my site v2',
    period: '2026.09 - Present',
    startDate: '2026-09',
    description:
      '冒険者の手記をコンセプトとした個人ポートフォリオサイト。自作SVGと羊皮紙の質感を組み合わせ、世界観とアクセシビリティを両立した設計。',
    stacks: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'SVG'],
    imagePath: '../assets/img/my-site-v2.png',
    siteUrl: 'https://sorai-portfolio.example.com',
    githubUrl: 'https://github.com/sorai-loop/my-site-v2',
    status: 'IN_PROGRESS',
    caption: 'このさいとだよー',
    client: 'Personal Initiative',
  },
  {
    id: 'guild-quest-board',
    title: 'Guild Quest Board',
    period: '2026.04 - 2026.07',
    startDate: '2026-04',
    completedDate: '2026-07',
    description:
      'ギルドのクエスト掲示板をイメージしたタスク・プロジェクト管理Webアプリ。タグや期日ごとのフィルタリング、手帳風の進捗ログ機能を搭載。',
    stacks: ['React', 'TypeScript', 'Node.js', 'CSS Modules'],
    imagePath: null,
    githubUrl: 'https://github.com/sorai-loop',
    status: 'COMPLETED',
    caption: 'Archival blueprint documentation for Guild Quest Board.',
    client: 'Guild Mission',
  },
  {
    id: 'sky-log-api',
    title: 'Sky Log & Weather API',
    period: '2025.10 - 2025.12',
    startDate: '2025-10',
    completedDate: '2025-12',
    description:
      'オープン気象APIと連携し、各地の空模様・雲の様子を手記風に記録・視覚化するWebツール。',
    stacks: ['TypeScript', 'FastAPI', 'Python', 'SVG'],
    imagePath: null,
    githubUrl: 'https://github.com/sorai-loop',
    status: 'COMPLETED',
    caption: 'Archival blueprint documentation for Sky Log & Weather API.',
    client: 'Open Research',
  },
];
