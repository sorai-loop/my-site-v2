export type QiitaTag = {
  name: string;
};

export type QiitaArticle={
    id:string;
    title:string;
    url:string;
    likes_count:number;
    tags:QiitaTag[];
    created__at:string;
}