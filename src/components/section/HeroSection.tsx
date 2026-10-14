import Cumulonimbus from '../../assets/svg/cumulonimbuscloud.svg?react';
import Stratus from '../../assets/svg/stratuscloud.svg?react';

export const HeroSection = () =>{
    return(
        <section>
            <h1>Sorai</h1>
            <a href='#signSection'>VIEW_DETAILS</a>
            <Stratus />
            <Cumulonimbus />
        </section>
    )
}