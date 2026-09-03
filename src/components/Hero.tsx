export default function Hero(){
    return(
        <section id="name-section" className="l-scroll__adjustment-top c-container p-name">
            <div className="name-section-text">
                <h1 className="p-name__name">
                    sorai
                </h1>
                <p className="p-name__note">
                    空彩來<br />
                    Web/Game Engineer?
                </p>
            </div>
            <a href="#works-section">
                <span className="p-name__arrow">VIEW_DETAILS</span>
                <div className="arrow-icon"></div>
            </a>
        </section>
    );
}