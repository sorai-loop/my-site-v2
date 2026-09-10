import { Rect } from "../svgtester/Rect/Rect";

export const Sandbox =()=>{
    return(
        <div style={{ 
            padding: '50px', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '20px',
            backgroundColor: '#f9f9f9' 
            }}>
            <h2>SVG & CSS Modules Playground</h2>
            <Rect />
        </div>
    );
};