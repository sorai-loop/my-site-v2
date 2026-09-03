import type { ArticleData } from "../types/article";

export const ArticleCard = ({title, description, aHref, imgSrc, footerText}:ArticleData)=>{
    return(
        <article className="c-card">
            <h3 className="c-card__title">
                {title}
            </h3>
            <div className="c-card__pair">
                <div className="c-card__text">
                    {description}
                </div>
                <a href={aHref}>
                    <img className="c-card__img" src={imgSrc} />
                </a>
            </div>
            <div className="c-card__footer">
                {footerText}
            </div>
        </article>
    );
}