import { useEffect, useState } from "react";
import type { QiitaArticle } from "../types/qiita";

export const Articles = () => {
    const [article ,setArticles] = useState<QiitaArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        const fetchArticles =async () =>{
            try{
                setLoading(true);

                const response=await fetch(
                    "https://qiita.com/api/v2/users/sorai/items?page=1&per_page=4"
                );
                if(!response.ok){
                    throw new Error("Qiitaの記事取得に失敗しました．")
                }

                const data: QiitaArticle[] = await response.json();
                setArticles(data);
            }
            catch (err){
                if(err instanceof Error){
                    setError(err.message);
                }
                else{
                    setError("エラー");
                }
            }
            finally{
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return(
        <section id="articles-section" className="l-scroll__adjustment-top c-container">
            <h2 className="c-heading">Articles</h2>
            <div className="p-articles">
                {loading && <p>記事を取り込み中</p>}

                {error && <p style={{color:"red"}}>{error}</p>}

                {!loading && !error && article.map(article =>{
                    const tagsString = article.tags.map((tag) => tag.name).join("/");

                    return(
                        <article className="c-cord" key={article.id}>
                            <h3 className="c-cord__title">
                                {article.title}
                            </h3>
                            <div className="c-card__pair">
                                <div className="c-card__text">
                                    <p>
                                        投稿日：{new Date(article.created__at).toLocaleDateString("ja-JP")} <br />
                                        ♥ {article.likes_count}いいね
                                    </p>
                                </div>
                                <a href={article.url} target="_blank">
                                    <img className="c-card__img" src="https://cdn.qiita.com/assets/qiita-fb-2887e7b4aad86fc8c25dd840c86851cb.png" alt={article.title} />
                                </a>
                            </div>
                            <div className="c-cord__footer">
                                {tagsString}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
        // <section id="articles-section" className="l-scroll__adjustment-top c-container">
        //     <h2 className="c-heading">
        //         Articles
        //     </h2>
        //     <div className="p-articles">
        //         {articlesList.map(article=>(
        //             <ArticleCard
        //             key={article.id}
        //             id={article.id}
        //             title={article.title}
        //             description={article.description}
        //             aHref={article.aHref}
        //             imgSrc={article.imgSrc}
        //             footerText={article.footerText}
        //             />
        //         ))}
        //     </div>
        // </section>
    );
}