import { Rect } from "../svgtester/Rect/Rect";
import { Fire } from "../svgtester/magic/Fire";
export const Sandbox =()=>{
    return(
        <div style={{ 
            padding: '50px', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '20px',
            }}>
            <h2>SVG & CSS Modules Playground</h2>
            <Rect />
            <Fire />
        </div>
    );
};