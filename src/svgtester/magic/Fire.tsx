import drawstyle from './Fire.module.css';
export const Fire = () =>{
    return(
        <svg viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg">
            <path className={drawstyle.gateMain} fill="none" stroke="black"
                d="M50,40 L41.34,55 L58.66,55 Z" />
            <path className={drawstyle.gateSub} id="gate" stroke="black" stroke-dasharray="8" stroke-dashoffset="-2"
                d="M50,50 v8" />
            <use className={drawstyle.gateSub} href="#gate" transform="rotate(120,50,50)" />
            <use className={drawstyle.gateSub} href="#gate" transform="rotate(240,50,50)" />
            <g id="arrow" stroke="black" stroke-width="0.7">
                <path className={drawstyle.arrow1} d="M47 30 h6" />
                <path className={drawstyle.arrow1} d="M50 30 v6" />
                <path className={drawstyle.arrow2} fill="none"
                    d="M48 33 l2 3 l2 -3" />
            </g>
            <use href="#arrow" transform="rotate(90,50,50)" />
            <use href="#arrow" transform="rotate(180,50,50)" />
            <use href="#arrow" transform="rotate(270,50,50)" />
            <circle className={drawstyle.jin} fill="none" stroke="black" stroke-width="0.7" cx="50" cy="50" r="25" transform='rotate(270,50,50)'/>
        </svg>
    )
}