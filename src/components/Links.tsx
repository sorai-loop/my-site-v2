import { linksList } from "../Data/linksData";
import { LinksCord } from "./LinksCord";

export const Links = () =>{
    return(
        <section id="links-section" className="l-scroll__adjustment-top l-scroll__adjustment-bottom c-container">
            <h2 className="c-heading">
                Links
            </h2>
            <article>
                <ul className="p-links__list">
                    {
                        linksList.map(link =>(
                            <LinksCord
                            key={link.id}
                            aHref={link.aHref}
                            label={link.label}
                            content={link.content}
                            />
                        ))
                    }
                </ul>
            </article>
        </section>
    );
}