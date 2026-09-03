export const Links = () =>{
    return(
        <section id="links-section" className="l-scroll__adjustment-top l-scroll__adjustment-bottom c-container">
            <h2 className="c-heading">
                Links
            </h2>
            <article>
                <ul className="p-links__list">
                    <li>
                        <a href="https://github.com/sorai-loop" className="p-links__url" aria-label="空彩來のGitHubアカウント">GitHub</a>
                    </li>
                    <li>
                        <a href="https://qiita.com/sorai" className="p-links__url" aria-label="空彩來のQiitaアカウント">qiita</a>
                    </li>
                    <li>
                        <a href="https://x.com/sorai_loop" className="p-links__url" aria-label="空彩來のXアカウント">X</a>
                    </li>
                    <li>
                        <a href="mailto:s2512218@st.tohtech.ac.jp" className="p-links__url" aria-label="空彩來のメアド">メール</a>
                    </li>
                </ul>
            </article>
        </section>
    );
}