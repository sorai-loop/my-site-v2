import './App.css';
import { Articles } from './components/Articles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Profile } from './components/Profile';
import { Sandbox } from './components/Sandbox';
import { Stack } from './components/Stack';
import { Works } from './components/Works';

function App() {
  return (
    <>
    <div className="l-frame">
            <div className="l-frame__top p-about__frame p-about__frame--bottom">
                <Header />
            </div>
            <div className="l-frame__bottom p-about__frame p-about__frame--top">

            </div>
            <div className="l-frame__side l-frame__side--left p-about__frame p-about__frame--right">

            </div>
            <div className="l-frame__side l-frame__side--right p-about__frame p-about__frame--left">
                {/*<!-- <footer>
                    <p className="copyright-text">
                        &copy; 2026 空彩來 . All rights reserved.
                    </p>
                </footer> -->*/}
            </div>
        </div>
        <main className="l-main">
            <Hero />
            <Works />
            <Articles />
            <Stack />
            <Profile />
            <Links />
            <Sandbox />
        </main>
        <div className="l-overlay p-overlay p-overlay__noise"></div>
        <div className="l-overlay p-overlay p-overlay__stain"></div>
    </>
  )
}

export default App
