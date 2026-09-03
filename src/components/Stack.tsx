import { stackFramPlatsList } from "../Data/stackFramPlatData";
import { stackLangagesList } from "../Data/stackLangageData";
import { stackToOtData } from "../Data/stackToOtData";
import { StackCord } from "./StackCord";

export const Stack = () =>{
    return(
        <section id="stack-section" className="l-scroll__adjustment-top c-container">
                <h2 className="c-heading">
                    Stack
                </h2>
                <section className="p-stacks__category">
                    <h3 className="p-stacks__title">
                        Languages
                    </h3>
                    <ul className="p-stacks__list">
                        {stackLangagesList.map(stack=>(
                            <StackCord
                            key={stack.id}
                            id={stack.id}
                            icon={stack.icon}
                            name={stack.name}
                            description={stack.description}
                            />
                        ))}
                    </ul>
                </section>
                <section className="stack-category">
                    <h3 className="p-stacks__title">
                        Frameworks & Platforms
                    </h3>
                    <ul className="p-stacks__list">
                        {stackFramPlatsList.map(stack=>(
                            <StackCord
                            key={stack.id}
                            id={stack.id}
                            icon={stack.icon}
                            name={stack.name}
                            description={stack.description}
                            />
                        ))}
                    </ul>
                </section>
                <section className="stack-category">
                    <h3 className="p-stacks__title">
                        Tools & Others
                    </h3>
                    <ul className="p-stacks__list">
                        {stackToOtData.map(stack=>(
                            <StackCord
                            key={stack.id}
                            id={stack.id}
                            icon={stack.icon}
                            name={stack.name}
                            description={stack.description}
                            />
                        ))}
                    </ul>
                </section>
            </section>
    );
}