import { useEffect, useState } from "react";
import type { QiitaArticle } from "../types/qiita";

type Props={
    article:QiitaArticle;
}

export const ArticleCard = ({article}:Props)=>{
    const [ogpImage, setOgpImage]=useState<string>(
        "https://qiita-organization-images.imgix.net/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fqiita-organization-image%2F8a300238df784c9fc4e0683bc2141b3c8c5b7b58%2Foriginal.jpg%3F1638286473?ixlib=rb-4.1.1&auto=compress%2Cformat&s=76a2b7fbba50e6e9e82bcdbcdd99eced"
    );

    useEffect(()=>{
        const fetchOGP=async()=>{
            try{
                const response =await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(article.url)}`)
                const data = await response.json();

                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, "text/html");

                const ogImageMeta = doc.querySelector('meta[property="og:image"]');

                if(ogImageMeta){
                    const imageUrl=ogImageMeta.getAttribute("content");
                    if(imageUrl){
                        setOgpImage(imageUrl);
                    }
                }
            }
            catch(error){
                console.error("OGPの取得に失敗しました", error);
            }
        };
        fetchOGP();
    }, [article.url]);

    const tagsString = article.tags.map(tag=>tag.name).join("/");

    return(
        <article className="c-card">
            <a href={article.url}>
                <h3 className="c-card__title">
                    {article.title}
                </h3>
            </a>

            <div className="c-card__pair">
                <div className="c-card__text">
                    <p>
                        投稿日：{new Date(article.created_at).toLocaleDateString("ja-JP")} | ♥ {article.likes_count}いいね
                    </p>
                </div>
                <a href={article.url}>
                    <img className="c-card__img" src={ogpImage} alt={article.title} />
                </a>
            </div>
            <div className="c-card__footer">
                {tagsString}
            </div>
        </article>
    );
}