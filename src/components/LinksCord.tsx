import type { links } from "../types/links";

export const LinksCord=({aHref, label, content}:links)=>{
    return(
        <li>
            <a href={aHref} className="p-links__url" aria-label={label}>{content}</a>
        </li>
    );
}