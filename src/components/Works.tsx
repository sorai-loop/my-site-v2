import { worksList } from "../Data/worksData";
import { WorkCord } from "./WorkCord";

export const Works = () => {
    return(
        <section id="works-section" className="l-scroll__adjustment-top c-container">
            <h2 className="c-heading">
                Works
            </h2>
            <div className="p-works">
                {
                    worksList.map(work =>(
                        <WorkCord
                        key={work.id}
                        id={work.id}
                        title={work.title}
                        description={work.description}
                        imgSrc={work.imgSrc}
                        footerText={work.footerText}
                        />
                    ))
                }
            </div>
        </section>
    );
}