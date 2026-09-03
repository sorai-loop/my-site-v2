import type { WorkData } from "../types/work";

export const WorkCord = ({title, description, imgSrc , footerText}:WorkData) =>{
    return(
        <article className="c-card">
            <h3 className="c-card__title">
                {title}
            </h3>
            <div className="c-card__pair">
                <div className="c-card__text">
                    <p>
                        {description}
                    </p>
                </div>
                <img src={imgSrc} className="c-card__img" />
            </div>
            <div className="c-card__footer">
                {footerText}
            </div>
        </article>
    );
}