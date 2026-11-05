import { NimbusGrapic } from "../ui/NimbusGraphic";
import { StratusGraphic } from "../ui/StratusGraphic";
import styles from "./HeroSection.module.css";

export const HeroSection = () =>{
    return(
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Sorai</h1>
                <a href='#signSection'>VIEW_DETAILS</a>
            </div>
            <div className={styles.nimbus}>
                <NimbusGrapic/>
            </div>
            <div className={styles.stratus}>
                <StratusGraphic aria-hidden="true"/>
            </div>
        </section>
    )
}