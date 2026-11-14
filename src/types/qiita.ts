export type QiitaTag = {
  name: string;
  versions?: string[];
};

export type QiitaUser = {
  id: string;
  name: string;
  profile_image_url?: string;
};

export type QiitaItem = {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  body: string;
  created_at: string;
  updated_at?: string;
  tags: QiitaTag[];
  user: QiitaUser;
};
