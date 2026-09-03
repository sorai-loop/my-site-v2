import type { ReactNode } from "react";

export type ArticleData = {
    id:string;
    title:string;
    description:ReactNode;
    aHref:string;
    imgSrc:string;
    footerText:string;
}