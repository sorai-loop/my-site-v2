import drawstyle from './HeroSection.module.css';

export const HeroSection = () =>{
    return(
        <>
            <h1>Sorai</h1>
            {/* <StratusGraphic /> */}
            <svg viewBox="0 -100 1000 1000" xmlns="http://www.w3.org/2000/svg">

                <text stroke="blue" className={drawstyle.mozi}>
                    This is<tspan rotate="45" dx="1,10" font-weight="bold" >a pen</tspan>Yes!!
                </text>
            </svg>
        </>
    )
}