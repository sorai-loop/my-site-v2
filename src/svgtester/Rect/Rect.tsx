import rectstyle from './Rect.module.css';

export const Rect =() =>{
    return(
        <svg viewBox="0 0 100 100">
            <rect className={rectstyle.rect} x="1" y="1" width="50" height="50" />
        </svg>
    )
}