import type { StampType } from '../components/ui/StampGraphic';

export type ProfileHistoryItem = {
  id: string;
  period: string;
  title: string;
  detail?: string;
  badge?: string;
  category?: string;
  url?: string;
};

export type ProfileEnvironmentItem = {
  id: string;
  category: string;
  value: string;
  note?: string;
};

export type ProfileTrackItem = {
  id: string;
  title: string;
  artist: string;
  note?: string;
  url?: string;
};

export type ProfileTopicItem = {
  id: string;
  tag: string;
  title: string;
  body: string;
};

export type ProfileLinkItem = {
  id: string;
  category: 'account' | 'affiliation';
  label: string;
  sublabel?: string;
  href: string;
  iconName?: string;
};

export type ProfileStampItem = {
  text: string;
  type?: StampType;
};

export type ProfileData = {
  /** ギルド報告書・旅券番号 */
  dossierNo: string;
  /** 書類種別ヘッダ */
  classification: string;
  /** 発行・更新日 */
  updatedAt: string;
  /** ハンドルネーム */
  handleName: string;
  /** 肩書き・二つ名 */
  roleTitle: string;
  /** ギルド階級・職種コード */
  guildClass: string;
  /** 生年月日 */
  birthDate: string;
  /** 所属 */
  affiliation: string;
  /** 活動拠点・状態 */
  status: string;
  /** アイコン画像パス（未指定時はデフォルトSVGポートレートを描画） */
  avatarUrl?: string | null;
  /** 証明枠に押印されるスタンプ */
  stamps: ProfileStampItem[];
  /** 哲学・信条 */
  philosophy: {
    motto: string;
    description: string;
  };
  /** 活動履歴 */
  history: ProfileHistoryItem[];
  /** メインの作業環境 */
  environment: ProfileEnvironmentItem[];
  /** 最近ハマっている曲 */
  favoriteTracks: ProfileTrackItem[];
  /** 適当なトピック・雑記 */
  topics: ProfileTopicItem[];
  /** 各種リンク（アカウント・所属コミュニティ・相互リンク） */
  links: ProfileLinkItem[];
  /** GitHubの草表示用ユーザー名 */
  githubUsername: string;
};
