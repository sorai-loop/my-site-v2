import type { StackData } from "../types/stacks";

export const StackCord = ({icon, name, description}:StackData)=>{
    return(
        <li className="p-stacks__item">
            <div className="p-stacks__head">
                {icon!==null && icon}
                <h4 className="p-stacks__name">
                    {name}
                </h4>
            </div>
            {description}
        </li>
    );
}