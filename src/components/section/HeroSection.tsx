import Cumulonimbus from '../../assets/svg/cumulonimbuscloud.svg?react';
import Stratus from '../../assets/svg/stratuscloud.svg?react';

import styles from './HeroSection.module.css';

export const HeroSection = () =>{
    return(
        <section className={styles.section}>
            <h1>Sorai</h1>
            <a href='#signSection'>VIEW_DETAILS</a>
            <Stratus />
            <Cumulonimbus />
        </section>
    )
}