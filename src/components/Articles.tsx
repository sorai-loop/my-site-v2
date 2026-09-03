import { articlesList } from "../Data/articlesData";
import { ArticleCard } from "./ArticleCord";

export const Articles = () => {
    return(
        <section id="articles-section" className="l-scroll__adjustment-top c-container">
            <h2 className="c-heading">
                Articles
            </h2>
            <div className="p-articles">
                {articlesList.map(article=>(
                    <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    description={article.description}
                    aHref={article.aHref}
                    imgSrc={article.imgSrc}
                    footerText={article.footerText}
                    />                    
                ))}
            </div>
        </section>
    );
}