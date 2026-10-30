import { NimbusGrapic } from "../ui/NimbusGraphic";
import { StratusGraphic } from "../ui/StratusGraphic";

export const HeroSection = () =>{
    return(
        <section>
            <h1>Sorai</h1>
            <a href='#signSection'>VIEW_DETAILS</a>
            <StratusGraphic />
            <NimbusGrapic />
        </section>
    )
}