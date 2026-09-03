export default function Header(){
    return(
        <header className="p-header">
            <nav>
                <ul className="p-header__nav-list">
                    <li>
                        <a href="#works-section">Works</a>
                    </li>
                    <li>
                        <a href="#articles-section">Articles</a>
                    </li>
                    <li>
                        <a href="#stack-section">Stack</a>
                    </li>
                    <li>
                        <a href="#profile-section">Profile</a>
                    </li>
                    <li>
                        <a href="#links-section">Links</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}