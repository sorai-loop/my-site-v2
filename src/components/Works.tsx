export default function Works(){
    return(
        <section id="works-section" className="l-scroll__adjustment-top c-container">
                <h2 className="c-heading">
                    Works
                </h2>
                <div className="p-works">
                    <article className="c-card">
                        <h3 className="c-card__title">
                            Portfolio
                        </h3>
                        <div className="c-card__pair">
                            <div className="c-card__text">
                                <p>
                                    webの基礎を学ぶため制作中！
                                </p>
                            </div>
                            <img src="./img/myportfolio.png" className="c-card__img" />
                        </div>
                        <div className="c-card__footer">
                            HTML/CSS/JS
                        </div>
                    </article>
                    <article className="c-card">
                        <h3 className="c-card__title">
                            課題研究
                        </h3>
                        <div className="c-card__pair">
                            <div className="c-card__text">
                                <p>
                                    高校3年次の課題研究にて作成。<br />
                                    衝突判定であるAABBとOBBを実際に実装しベンチマークを行い比較する。
                                </p>
                            </div>
                            <img src="./img/kadaikenkyu.png" className="c-card__img" />
                        </div>
                        <div className="c-card__footer">
                            C++/SDL
                        </div>
                    </article>
                </div>
            </section>
    );
}